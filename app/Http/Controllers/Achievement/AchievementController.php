<?php

namespace App\Http\Controllers\Achievement;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AchievementController extends Controller
{
    /**
     * Display all achievements.
     */
    public function index(): Response
    {
        $user = Auth::user();

        $allAchievements = Achievement::orderBy('category')
            ->orderBy('points_value')
            ->get()
            ->map(function ($achievement) use ($user) {
                $earned = $user->achievements->contains($achievement->id);
                $earnedAt = null;

                if ($earned) {
                    $userAchievement = $user->achievements->find($achievement->id);
                    $earnedAt = $userAchievement?->pivot->earned_at?->format('M d, Y');
                }

                return [
                    'id' => $achievement->id,
                    'name' => $achievement->name,
                    'description' => $achievement->description,
                    'icon' => $achievement->icon,
                    'category' => $achievement->category,
                    'rarity' => $achievement->rarity,
                    'points' => $achievement->points_value,
                    'badge_color' => $achievement->badge_color,
                    'earned' => $earned,
                    'earned_at' => $earnedAt,
                ];
            });

        $stats = [
            'total_achievements' => Achievement::count(),
            'earned_achievements' => $user->achievements->count(),
            'total_achievement_points' => $user->achievements->sum('pivot.points_value'),
        ];

        return Inertia::render('Achievements/Index', [
            'achievements' => $allAchievements,
            'stats' => $stats,
        ]);
    }
}
