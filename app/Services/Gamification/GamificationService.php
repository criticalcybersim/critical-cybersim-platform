<?php

namespace App\Services\Gamification;

use App\Models\Achievement;
use App\Models\Organization;
use App\Models\User;
use App\Models\UserAchievement;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

class GamificationService
{
    /**
     * Award points to a user.
     */
    public function awardPoints(User $user, int $points, string $reason): void
    {
        $user->increment('total_points', $points);
        $user->last_active_at = now();
        $user->save();

        // Log activity
        activity()
            ->performedOn($user)
            ->causedBy($user)
            ->withProperties(['points' => $points, 'reason' => $reason])
            ->log('Points awarded');
    }

    /**
     * Check and award achievements based on user activity.
     */
    public function checkAndAwardAchievements(User $user): array
    {
        $newAchievements = [];
        $achievements = Achievement::active()->get();

        foreach ($achievements as $achievement) {
            // Skip if already earned
            if ($achievement->isEarnedBy($user)) {
                continue;
            }

            // Check if criteria is met
            if ($this->checkAchievementCriteria($user, $achievement)) {
                $this->awardAchievement($user, $achievement);
                $newAchievements[] = $achievement;
            }
        }

        return $newAchievements;
    }

    /**
     * Award an achievement to a user.
     */
    public function awardAchievement(User $user, Achievement $achievement): void
    {
        UserAchievement::create([
            'user_id' => $user->id,
            'achievement_id' => $achievement->id,
            'earned_at' => now(),
        ]);

        // Award points
        $this->awardPoints($user, $achievement->points_value, "Earned achievement: {$achievement->name}");

        // Log activity
        activity()
            ->performedOn($user)
            ->causedBy($user)
            ->withProperties(['achievement' => $achievement->name])
            ->log('Achievement earned');
    }

    /**
     * Check if achievement criteria is met.
     */
    protected function checkAchievementCriteria(User $user, Achievement $achievement): bool
    {
        return match ($achievement->slug) {
            'first-steps' => $user->progress()->where('status', 'completed')->count() >= 1,
            'perfect-score' => $user->simulationSessions()->where('percentage_score', 100)->exists(),
            'hat-trick' => $user->progress()->where('status', 'completed')->count() >= 3,
            'dedicated-learner' => $user->progress()->where('status', 'completed')->count() >= 10,
            'week-warrior' => $user->current_streak >= 7,
            'month-master' => $user->current_streak >= 30,
            'unstoppable' => $user->current_streak >= 90,
            'sharpshooter' => $this->checkAverageScore($user, 90, 5),
            default => false,
        };
    }

    /**
     * Check average score achievement.
     */
    protected function checkAverageScore(User $user, float $minScore, int $minModules): bool
    {
        $sessions = $user->simulationSessions()
            ->where('status', 'completed')
            ->latest()
            ->take($minModules)
            ->get();

        if ($sessions->count() < $minModules) {
            return false;
        }

        return $sessions->avg('percentage_score') >= $minScore;
    }

    /**
     * Update user's learning streak.
     */
    public function updateStreak(User $user): int
    {
        $lastActive = $user->last_active_at;
        $now = now();

        if (! $lastActive) {
            $user->current_streak = 1;
        } else {
            $hoursSinceActive = $now->diffInHours($lastActive);
            $resetHours = config('cybersim.streak_reset_hours', 48);

            if ($hoursSinceActive >= $resetHours) {
                // Streak broken
                $user->current_streak = 1;
            } elseif ($now->isToday() && $lastActive->isToday()) {
                // Same day, don't increment
            } elseif ($now->isYesterday()) {
                // Continued streak
                $user->current_streak++;
            } else {
                // New streak
                $user->current_streak = 1;
            }
        }

        $user->last_active_at = $now;
        $user->save();

        return $user->current_streak;
    }

    /**
     * Get leaderboard rankings.
     */
    public function getLeaderboard(string $type = 'global', int $limit = 100, ?User $contextUser = null): Collection
    {
        $cacheKey = "leaderboard_{$type}";
        if ($type === 'organization' && $contextUser?->organization_id) {
            $cacheKey .= "_org_{$contextUser->organization_id}";
        } elseif ($type === 'sector' && $contextUser?->sector_id) {
            $cacheKey .= "_sector_{$contextUser->sector_id}";
        }

        return Cache::remember($cacheKey, 300, function () use ($type, $limit, $contextUser) {
            $query = User::select([
                'id',
                'name',
                'organization_id',
                'sector_id',
                'total_points',
                'current_streak',
            ])
                ->with(['organization:id,name', 'sector:id,name'])
                ->orderBy('total_points', 'desc');

            // Apply filters based on type
            if ($type === 'organization' && $contextUser?->organization_id) {
                $query->where('organization_id', $contextUser->organization_id);
            } elseif ($type === 'sector' && $contextUser?->sector_id) {
                $query->where('sector_id', $contextUser->sector_id);
            }

            return $query->limit($limit)->get()->map(function ($user, $index) {
                return [
                    'rank' => $index + 1,
                    'name' => $user->name,
                    'points' => $user->total_points,
                    'streak' => $user->current_streak,
                    'level' => $user->level,
                    'level_name' => $user->level_name,
                    'simulations_completed' => $user->progress()->where('status', 'completed')->count(),
                    'organization' => $user->organization?->name,
                    'sector' => $user->sector?->name,
                ];
            });
        });
    }

    /**
     * Get user's rank in leaderboard.
     */
    public function getUserRank(User $user, string $type = 'global'): array
    {
        $query = User::where('total_points', '>', $user->total_points);

        // Apply filters based on type
        if ($type === 'organization' && $user->organization_id) {
            $query->where('organization_id', $user->organization_id);
        } elseif ($type === 'sector' && $user->sector_id) {
            $query->where('sector_id', $user->sector_id);
        }

        $rank = $query->count() + 1;

        // Get total users for percentile
        $totalQuery = User::query();
        if ($type === 'organization' && $user->organization_id) {
            $totalQuery->where('organization_id', $user->organization_id);
        } elseif ($type === 'sector' && $user->sector_id) {
            $totalQuery->where('sector_id', $user->sector_id);
        }
        $totalUsers = $totalQuery->count();

        $percentile = $totalUsers > 0 ? round((($totalUsers - $rank + 1) / $totalUsers) * 100, 1) : 0;

        return [
            'rank' => $rank,
            'total_users' => $totalUsers,
            'percentile' => $percentile,
        ];
    }

    /**
     * Get user's organization rank.
     */
    public function getUserOrganizationRank(User $user): ?int
    {
        if (! $user->organization_id) {
            return null;
        }

        $rank = User::where('organization_id', $user->organization_id)
            ->where('total_points', '>', $user->total_points)
            ->count() + 1;

        return $rank;
    }
}
