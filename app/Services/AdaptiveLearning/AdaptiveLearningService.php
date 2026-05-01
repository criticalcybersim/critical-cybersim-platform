<?php

namespace App\Services\AdaptiveLearning;

use App\Models\SimulationModule;
use App\Models\User;
use Illuminate\Support\Collection;

class AdaptiveLearningService
{
    /**
     * Get recommended modules for a user based on their progress and performance.
     */
    public function getRecommendedModules(User $user, int $limit = 3): Collection
    {
        $completedModuleIds = $user->progress()
            ->where('status', 'completed')
            ->pluck('module_id')
            ->toArray();

        $inProgressModuleIds = $user->progress()
            ->where('status', 'in_progress')
            ->pluck('module_id')
            ->toArray();

        // Priority 1: Continue in-progress modules
        $inProgress = SimulationModule::whereIn('id', $inProgressModuleIds)
            ->published()
            ->with('sector')
            ->get();

        // Priority 2: Modules in user's sector
        $sectorModules = SimulationModule::where('sector_id', $user->sector_id)
            ->whereNotIn('id', array_merge($completedModuleIds, $inProgressModuleIds))
            ->published()
            ->with('sector')
            ->take($limit)
            ->get();

        // Priority 3: Popular modules not completed
        $popularModules = SimulationModule::whereNotIn('id', array_merge($completedModuleIds, $inProgressModuleIds))
            ->published()
            ->popular()
            ->with('sector')
            ->take($limit)
            ->get();

        // Priority 4: Recommended based on weaknesses
        $weaknessModules = $this->getModulesForWeaknesses($user, $completedModuleIds, $inProgressModuleIds, $limit);

        // Merge and deduplicate
        $recommended = $inProgress
            ->concat($sectorModules)
            ->concat($weaknessModules)
            ->concat($popularModules)
            ->unique('id')
            ->take($limit);

        return $recommended;
    }

    /**
     * Analyze user's strengths based on completed modules.
     */
    public function analyzeUserStrengths(User $user): array
    {
        $completedProgress = $user->progress()
            ->where('status', 'completed')
            ->with('module.sector')
            ->get();

        if ($completedProgress->isEmpty()) {
            return [
                'top_sectors' => collect(),
                'top_controls' => collect(),
                'average_score' => 0,
                'completion_rate' => 0,
            ];
        }

        // Group by sector
        $sectorScores = $completedProgress->groupBy('module.sector_id')
            ->map(function ($group) {
                return [
                    'sector' => $group->first()->module->sector,
                    'avg_score' => $group->avg('best_score'),
                    'count' => $group->count(),
                ];
            })
            ->sortByDesc('avg_score')
            ->take(3)
            ->values();

        return [
            'top_sectors' => $sectorScores,
            'average_score' => $completedProgress->avg('best_score'),
            'completion_rate' => $user->completion_rate,
            'total_completed' => $completedProgress->count(),
        ];
    }

    /**
     * Analyze user's weaknesses to recommend targeted modules.
     */
    public function analyzeUserWeaknesses(User $user): array
    {
        $sessions = $user->simulationSessions()
            ->where('status', 'completed')
            ->with('module.sector')
            ->get();

        if ($sessions->isEmpty()) {
            return [
                'weak_sectors' => collect(),
                'weak_controls' => collect(),
                'common_mistakes' => collect(),
            ];
        }

        // Find sectors with low scores
        $sectorScores = $sessions->groupBy('module.sector_id')
            ->map(function ($group) {
                return [
                    'sector' => $group->first()->module->sector,
                    'avg_score' => $group->avg('percentage_score'),
                    'count' => $group->count(),
                ];
            })
            ->filter(fn ($item) => $item['avg_score'] < 70)
            ->sortBy('avg_score')
            ->take(3)
            ->values();

        // Analyze common mistakes
        $allMistakes = $sessions->pluck('mistakes_made')
            ->flatten(1)
            ->filter();

        $commonMistakes = $allMistakes->groupBy('scenario_title')
            ->map(function ($group, $title) {
                return [
                    'scenario' => $title,
                    'frequency' => $group->count(),
                ];
            })
            ->sortByDesc('frequency')
            ->take(5)
            ->values();

        return [
            'weak_sectors' => $sectorScores,
            'common_mistakes' => $commonMistakes,
        ];
    }

    /**
     * Calculate next difficulty level for user.
     */
    public function calculateNextDifficultyLevel(User $user): string
    {
        $avgScore = $user->average_score;
        $completedCount = $user->progress()->where('status', 'completed')->count();

        if ($completedCount === 0) {
            return 'beginner';
        }

        if ($avgScore >= 85 && $completedCount >= 10) {
            return 'expert';
        }

        if ($avgScore >= 75 && $completedCount >= 5) {
            return 'advanced';
        }

        if ($avgScore >= 65 && $completedCount >= 2) {
            return 'intermediate';
        }

        return 'beginner';
    }

    /**
     * Generate personalized learning path.
     */
    public function generateLearningPath(User $user): array
    {
        $recommendedDifficulty = $this->calculateNextDifficultyLevel($user);
        $weaknesses = $this->analyzeUserWeaknesses($user);

        // Focus on weak sectors first
        $weakSectorIds = $weaknesses['weak_sectors']->pluck('sector.id')->toArray();

        $learningPath = [];

        // Phase 1: Address weaknesses
        if (! empty($weakSectorIds)) {
            $weaknessModules = SimulationModule::whereIn('sector_id', $weakSectorIds)
                ->where('difficulty_level', $recommendedDifficulty)
                ->published()
                ->take(3)
                ->get();

            $learningPath[] = [
                'phase' => 'Strengthen Weak Areas',
                'modules' => $weaknessModules,
            ];
        }

        // Phase 2: Recommended next steps
        $recommended = $this->getRecommendedModules($user, 5);

        $learningPath[] = [
            'phase' => 'Recommended Training',
            'modules' => $recommended,
        ];

        return $learningPath;
    }

    /**
     * Get modules to address user weaknesses.
     */
    protected function getModulesForWeaknesses(User $user, array $completedIds, array $inProgressIds, int $limit): Collection
    {
        $weaknesses = $this->analyzeUserWeaknesses($user);
        $weakSectorIds = $weaknesses['weak_sectors']->pluck('sector.id')->toArray();

        if (empty($weakSectorIds)) {
            return collect();
        }

        return SimulationModule::whereIn('sector_id', $weakSectorIds)
            ->whereNotIn('id', array_merge($completedIds, $inProgressIds))
            ->published()
            ->with('sector')
            ->take($limit)
            ->get();
    }
}
