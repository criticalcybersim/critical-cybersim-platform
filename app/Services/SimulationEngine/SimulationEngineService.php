<?php

namespace App\Services\SimulationEngine;

use App\Models\SimulationModule;
use App\Models\SimulationSession;
use App\Models\TrainingScenario;
use App\Models\User;
use App\Models\UserProgress;
use App\Services\Gamification\GamificationService;
use Illuminate\Support\Str;

class SimulationEngineService
{
    public function __construct(
        protected GamificationService $gamificationService
    ) {}

    /**
     * Start a new simulation session for a user.
     */
    public function startSession(User $user, SimulationModule $module): SimulationSession
    {
        // Check if module is published
        if (! $module->is_published) {
            throw new \Exception('This simulation module is not available.');
        }

        // Create session
        $session = SimulationSession::create([
            'session_code' => 'SIM-'.strtoupper(Str::random(8)),
            'user_id' => $user->id,
            'module_id' => $module->id,
            'status' => 'in_progress',
            'current_scenario_index' => 0,
            'score' => 0,
            'max_possible_score' => $this->calculateMaxScore($module),
            'started_at' => now(),
        ]);

        // Update or create user progress
        $progress = UserProgress::firstOrCreate(
            [
                'user_id' => $user->id,
                'module_id' => $module->id,
            ],
            [
                'status' => 'in_progress',
                'attempts' => 0,
                'best_score' => 0,
                'latest_score' => 0,
            ]
        );

        $progress->update([
            'status' => 'in_progress',
            'attempts' => $progress->attempts + 1,
            'first_started_at' => $progress->first_started_at ?? now(),
            'last_attempted_at' => now(),
        ]);

        return $session;
    }

    /**
     * Process a user's decision in a scenario.
     */
    public function processDecision(SimulationSession $session, array $decision): array
    {
        $module = $session->module;
        $scenarios = $module->scenarios()->ordered()->get();
        $currentScenario = $scenarios[$session->current_scenario_index] ?? null;

        if (! $currentScenario) {
            throw new \Exception('Invalid scenario index.');
        }

        $result = [
            'is_correct' => false,
            'points_earned' => 0,
            'feedback' => '',
            'correct_answer' => null,
            'is_complete' => false,
        ];

        // Process decision based on scenario type
        if ($currentScenario->is_decision_scenario) {
            $selectedChoice = collect($currentScenario->choices)->firstWhere('id', $decision['choice_id']);

            if ($selectedChoice) {
                $result['is_correct'] = $selectedChoice['is_correct'] ?? false;
                $result['points_earned'] = $selectedChoice['points'] ?? 0;
                $result['feedback'] = $selectedChoice['feedback'] ?? '';

                // Update session score
                $session->score += $result['points_earned'];

                // Track decisions
                $decisions = $session->decisions_made ?? [];
                $decisions[] = [
                    'scenario_id' => $currentScenario->id,
                    'choice_id' => $decision['choice_id'],
                    'is_correct' => $result['is_correct'],
                    'points' => $result['points_earned'],
                    'timestamp' => now()->toIso8601String(),
                ];
                $session->decisions_made = $decisions;

                // Track mistakes
                if (! $result['is_correct']) {
                    $correctChoice = collect($currentScenario->choices)->firstWhere('is_correct', true);
                    $mistakes = $session->mistakes_made ?? [];
                    $mistakes[] = [
                        'scenario_id' => $currentScenario->id,
                        'scenario_title' => $currentScenario->title,
                        'action_taken' => $selectedChoice['title'] ?? '',
                        'correct_action' => $correctChoice['title'] ?? 'See correct answer in feedback',
                        'timestamp' => now()->toIso8601String(),
                    ];
                    $session->mistakes_made = $mistakes;
                }
            }
        } else {
            // For non-decision scenarios (briefing, assessment, debrief)
            $result['points_earned'] = $currentScenario->max_score;
            $session->score += $result['points_earned'];
        }

        // Move to next scenario
        $session->current_scenario_index++;
        $session->time_spent_seconds = now()->diffInSeconds($session->started_at);

        // Check if simulation is complete
        if ($session->current_scenario_index >= $scenarios->count()) {
            $result['is_complete'] = true;
            $this->completeSession($session);
        } else {
            $session->save();
        }

        return $result;
    }

    /**
     * Complete a simulation session.
     */
    public function completeSession(SimulationSession $session): array
    {
        $session->status = 'completed';
        $session->completed_at = now();
        $session->time_spent_seconds = now()->diffInSeconds($session->started_at);

        // Calculate percentage score
        if ($session->max_possible_score > 0) {
            $session->percentage_score = ($session->score / $session->max_possible_score) * 100;
        }

        $session->save();

        // Update user progress
        $progress = UserProgress::where('user_id', $session->user_id)
            ->where('module_id', $session->module_id)
            ->first();

        if ($progress) {
            $progress->status = 'completed';
            $progress->latest_score = $session->percentage_score;
            $progress->best_score = max($progress->best_score, $session->percentage_score);
            $progress->completion_percentage = 100;
            $progress->completed_at = now();

            // Calculate points earned (only if passing)
            if ($session->is_passed) {
                $points = $this->calculatePointsEarned($session);
                $progress->points_earned = max($progress->points_earned, $points);

                // Award points and check achievements
                $this->gamificationService->awardPoints(
                    $session->user,
                    $points,
                    "Completed {$session->module->title}"
                );

                $newAchievements = $this->gamificationService->checkAndAwardAchievements($session->user);
            }

            $progress->save();
        }

        // Update module statistics
        $module = $session->module;
        $module->increment('completion_count');
        $module->average_score = $module->sessions()
            ->where('status', 'completed')
            ->avg('percentage_score');
        $module->save();

        // Generate AI feedback
        $session->ai_feedback = $this->generateAIFeedback($session);
        $session->save();

        return [
            'session' => $session->fresh(['module', 'user']),
            'new_achievements' => $newAchievements ?? [],
            'level_up' => false, // TODO: Check if user leveled up
        ];
    }

    /**
     * Abandon a session.
     */
    public function abandonSession(SimulationSession $session): void
    {
        $session->update([
            'status' => 'abandoned',
            'time_spent_seconds' => now()->diffInSeconds($session->started_at),
        ]);
    }

    /**
     * Calculate maximum possible score for a module.
     */
    protected function calculateMaxScore(SimulationModule $module): int
    {
        return $module->scenarios()->sum('max_score');
    }

    /**
     * Calculate points earned based on performance.
     */
    protected function calculatePointsEarned(SimulationSession $session): int
    {
        $basePoints = $session->module->points_reward;
        $scoreMultiplier = $session->percentage_score / 100;

        // Time bonus
        $timeBonus = 0;
        $estimatedTime = $session->module->estimated_duration_minutes * 60;
        $actualTime = $session->time_spent_seconds;

        if ($actualTime < ($estimatedTime * config('cybersim.time_bonus_threshold', 0.8))) {
            $timeBonus = config('cybersim.time_bonus_points', 50);
        }

        // Perfect score bonus
        $perfectBonus = 0;
        if ($session->percentage_score >= 100) {
            $perfectBonus = 100;
        }

        return (int) (($basePoints * $scoreMultiplier) + $timeBonus + $perfectBonus);
    }

    /**
     * Generate AI-powered feedback for the session.
     */
    protected function generateAIFeedback(SimulationSession $session): string
    {
        // Simplified feedback - in production, this would use AI/ML
        $feedback = [];

        $feedback[] = '**Performance Summary**';
        $feedback[] = "You scored {$session->percentage_score}% on this simulation.";

        if ($session->percentage_score >= 90) {
            $feedback[] = "\n**Excellent Work!** You demonstrated strong understanding of incident response procedures and made sound decisions under pressure.";
        } elseif ($session->percentage_score >= 70) {
            $feedback[] = "\n**Good Job!** You passed the simulation. Review your mistakes to improve further.";
        } else {
            $feedback[] = "\n**Needs Improvement** Review the learning objectives and try again to strengthen your skills.";
        }

        // Mistakes analysis
        $mistakesCount = count($session->mistakes_made ?? []);
        if ($mistakesCount > 0) {
            $feedback[] = "\n**Areas for Improvement:**";
            $feedback[] = "You made {$mistakesCount} incorrect decisions. Review these scenarios:";

            foreach (($session->mistakes_made ?? []) as $mistake) {
                $feedback[] = "- {$mistake['scenario_title']}";
            }
        }

        // Time analysis
        $estimatedMinutes = $session->module->estimated_duration_minutes;
        $actualMinutes = ceil($session->time_spent_seconds / 60);

        if ($actualMinutes < $estimatedMinutes) {
            $feedback[] = "\n**Speed:** You completed this simulation faster than expected. Great efficiency!";
        }

        $feedback[] = "\n**Next Steps:**";
        $feedback[] = "Continue practicing with more simulations in the {$session->module->sector->name} sector to build expertise.";

        return implode("\n", $feedback);
    }

    /**
     * Get recommended next scenario for adaptive learning.
     */
    public function getNextScenario(SimulationSession $session): ?TrainingScenario
    {
        $scenarios = $session->module->scenarios()->ordered()->get();
        $nextIndex = $session->current_scenario_index;

        return $scenarios[$nextIndex] ?? null;
    }
}
