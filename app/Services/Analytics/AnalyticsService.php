<?php

namespace App\Services\Analytics;

use App\Models\Organization;
use App\Models\Sector;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class AnalyticsService
{
    /**
     * Get user analytics dashboard data.
     */
    public function getUserAnalytics(User $user, string $period = '30d'): array
    {
        $dateFrom = $this->getDateFromPeriod($period);

        return [
            'overview' => $this->getUserOverview($user),
            'progress_over_time' => $this->getProgressOverTime($user, $dateFrom),
            'skills_by_control_family' => $this->getSkillsByControlFamily($user),
            'sector_completion' => $this->getSectorCompletion($user),
            'recent_sessions' => $this->getRecentSessions($user, 10),
            'achievements_earned' => $this->getRecentAchievements($user, 5),
            'strengths_and_weaknesses' => $this->getStrengthsAndWeaknesses($user),
        ];
    }

    /**
     * Get user overview statistics.
     */
    public function getUserOverview(User $user): array
    {
        return [
            'total_points' => $user->total_points,
            'level' => $user->level,
            'level_name' => $user->level_name,
            'level_color' => $user->level_color,
            'progress_to_next_level' => $user->progress_to_next_level,
            'current_streak' => $user->current_streak,
            'total_simulations_completed' => $user->progress()->where('status', 'completed')->count(),
            'average_score' => round($user->average_score, 2),
            'completion_rate' => round($user->completion_rate, 2),
            'total_time_spent' => $user->simulationSessions()->sum('time_spent_seconds'),
            'achievements_earned' => $user->achievements()->count(),
        ];
    }

    /**
     * Get progress over time for charts.
     */
    public function getProgressOverTime(User $user, \DateTime $fromDate): array
    {
        $sessions = $user->simulationSessions()
            ->where('status', 'completed')
            ->where('completed_at', '>=', $fromDate)
            ->orderBy('completed_at')
            ->select('completed_at', 'percentage_score', 'module_id')
            ->with('module:id,title')
            ->get();

        return $sessions->map(function ($session) {
            return [
                'date' => $session->completed_at->format('Y-m-d'),
                'score' => $session->percentage_score,
                'module' => $session->module->title,
            ];
        })->toArray();
    }

    /**
     * Get skills breakdown by NIST control family.
     */
    public function getSkillsByControlFamily(User $user): array
    {
        // Get all completed modules with NIST controls
        $completedModules = $user->progress()
            ->where('status', 'completed')
            ->with('module.nistControls')
            ->get();

        $controlFamilies = config('nist.control_families');
        $familyScores = [];

        foreach ($controlFamilies as $code => $family) {
            $modulesWithFamily = $completedModules->filter(function ($progress) use ($code) {
                return $progress->module->nistControls
                    ->where('control_family_code', $code)
                    ->isNotEmpty();
            });

            if ($modulesWithFamily->isNotEmpty()) {
                $familyScores[] = [
                    'family' => $family['name'],
                    'code' => $code,
                    'score' => round($modulesWithFamily->avg('best_score'), 2),
                    'count' => $modulesWithFamily->count(),
                    'color' => $family['color'],
                ];
            }
        }

        return $familyScores;
    }

    /**
     * Get sector completion percentages.
     */
    public function getSectorCompletion(User $user): array
    {
        $sectors = Sector::active()
            ->with(['simulationModules' => function ($query) {
                $query->published();
            }])
            ->get();

        $completion = [];

        foreach ($sectors as $sector) {
            $totalModules = $sector->simulationModules->count();

            if ($totalModules === 0) {
                continue;
            }

            $completedModules = $user->progress()
                ->where('status', 'completed')
                ->whereHas('module', function ($query) use ($sector) {
                    $query->where('sector_id', $sector->id);
                })
                ->count();

            $percentage = ($completedModules / $totalModules) * 100;

            $completion[] = [
                'sector' => $sector->name,
                'completed' => $completedModules,
                'total' => $totalModules,
                'percentage' => round($percentage, 2),
                'color' => $sector->color,
            ];
        }

        return $completion;
    }

    /**
     * Get recent simulation sessions.
     */
    public function getRecentSessions(User $user, int $limit = 10): array
    {
        return $user->simulationSessions()
            ->with('module.sector')
            ->latest('started_at')
            ->take($limit)
            ->get()
            ->map(function ($session) {
                return [
                    'id' => $session->id,
                    'module' => $session->module->title,
                    'sector' => $session->module->sector->name,
                    'status' => $session->status,
                    'score' => $session->percentage_score,
                    'passed' => $session->is_passed,
                    'duration' => $session->duration_formatted,
                    'date' => $session->started_at->format('M d, Y'),
                ];
            })
            ->toArray();
    }

    /**
     * Get recently earned achievements.
     */
    public function getRecentAchievements(User $user, int $limit = 5): array
    {
        return $user->achievements()
            ->withPivot('earned_at')
            ->orderByPivot('earned_at', 'desc')
            ->take($limit)
            ->get()
            ->map(function ($achievement) {
                return [
                    'name' => $achievement->name,
                    'description' => $achievement->description,
                    'icon' => $achievement->icon,
                    'rarity' => $achievement->rarity,
                    'color' => $achievement->badge_color,
                    'earned_at' => $achievement->pivot->earned_at->format('M d, Y'),
                ];
            })
            ->toArray();
    }

    /**
     * Get strengths and weaknesses analysis.
     */
    public function getStrengthsAndWeaknesses(User $user): array
    {
        $sessions = $user->simulationSessions()
            ->where('status', 'completed')
            ->with('module')
            ->get();

        if ($sessions->isEmpty()) {
            return [
                'strengths' => [],
                'weaknesses' => [],
            ];
        }

        // Group by difficulty level
        $byDifficulty = $sessions->groupBy('module.difficulty_level');

        $strengths = [];
        $weaknesses = [];

        foreach ($byDifficulty as $difficulty => $group) {
            $avgScore = $group->avg('percentage_score');

            if ($avgScore >= 80) {
                $strengths[] = [
                    'area' => ucfirst($difficulty).' level simulations',
                    'score' => round($avgScore, 2),
                ];
            } elseif ($avgScore < 65) {
                $weaknesses[] = [
                    'area' => ucfirst($difficulty).' level simulations',
                    'score' => round($avgScore, 2),
                    'recommendation' => 'Review learning materials and retry',
                ];
            }
        }

        return [
            'strengths' => $strengths,
            'weaknesses' => $weaknesses,
        ];
    }

    /**
     * Get organization analytics.
     */
    public function getOrganizationAnalytics(Organization $organization): array
    {
        $users = $organization->users;

        return [
            'total_users' => $users->count(),
            'active_users' => $users->filter(fn ($u) => $u->last_active_at && $u->last_active_at->isAfter(now()->subDays(7)))->count(),
            'total_completions' => DB::table('user_progress')
                ->whereIn('user_id', $users->pluck('id'))
                ->where('status', 'completed')
                ->count(),
            'average_score' => round(DB::table('simulation_sessions')
                ->whereIn('user_id', $users->pluck('id'))
                ->where('status', 'completed')
                ->avg('percentage_score'), 2),
            'top_performers' => $this->getTopPerformers($organization, 5),
            'popular_modules' => $this->getPopularModules($organization, 5),
        ];
    }

    /**
     * Get top performers in organization.
     */
    protected function getTopPerformers(Organization $organization, int $limit): array
    {
        return $organization->users()
            ->orderBy('total_points', 'desc')
            ->take($limit)
            ->get(['id', 'name', 'total_points', 'current_streak'])
            ->map(function ($user) {
                return [
                    'name' => $user->name,
                    'points' => $user->total_points,
                    'streak' => $user->current_streak,
                    'level' => $user->level_name,
                ];
            })
            ->toArray();
    }

    /**
     * Get popular modules in organization.
     */
    protected function getPopularModules(Organization $organization, int $limit): array
    {
        $userIds = $organization->users->pluck('id');

        return DB::table('simulation_sessions')
            ->join('simulation_modules', 'simulation_sessions.module_id', '=', 'simulation_modules.id')
            ->whereIn('simulation_sessions.user_id', $userIds)
            ->select('simulation_modules.title', DB::raw('COUNT(*) as attempts'))
            ->groupBy('simulation_modules.id', 'simulation_modules.title')
            ->orderByDesc('attempts')
            ->take($limit)
            ->get()
            ->map(fn ($item) => ['title' => $item->title, 'attempts' => $item->attempts])
            ->toArray();
    }

    /**
     * Convert period string to date.
     */
    protected function getDateFromPeriod(string $period): \DateTime
    {
        return match ($period) {
            '7d' => now()->subDays(7),
            '30d' => now()->subDays(30),
            '90d' => now()->subDays(90),
            'all' => now()->subYears(10),
            default => now()->subDays(30),
        };
    }
}
