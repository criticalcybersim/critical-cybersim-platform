<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Services\AdaptiveLearning\AdaptiveLearningService;
use App\Services\Analytics\AnalyticsService;
use App\Services\Gamification\GamificationService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(
        protected AnalyticsService $analytics,
        protected AdaptiveLearningService $adaptiveLearning,
        protected GamificationService $gamification
    ) {}

    /**
     * Display the user dashboard.
     */
    public function index(): Response
    {
        $user = Auth::user()->load([
            'simulationSessions' => fn ($q) => $q->latest()->take(5)->with('module.sector'),
            'sector',
            'organization',
        ]);

        // Load achievements separately to avoid pivot ordering issues
        $recentAchievements = $user->achievements()
            ->withPivot('earned_at')
            ->orderBy('user_achievements.earned_at', 'desc')
            ->take(5)
            ->get();

        // Get user statistics
        $stats = [
            'total_points' => $user->total_points,
            'level' => $user->level,
            'level_name' => $user->level_name,
            'level_color' => $user->level_color,
            'progress_to_next_level' => $user->progress_to_next_level,
            'current_streak' => $user->current_streak,
            'simulations_completed' => $user->progress()->where('status', 'completed')->count(),
            'average_score' => round($user->average_score, 2),
            'completion_rate' => round($user->completion_rate, 2),
        ];

        // Get recent sessions
        $recentSessions = $user->simulationSessions->map(function ($session) {
            return [
                'id' => $session->id,
                'module' => $session->module->title,
                'sector' => $session->module->sector->name,
                'status' => $session->status,
                'score' => $session->percentage_score,
                'passed' => $session->is_passed,
                'date' => $session->started_at->format('M d, Y'),
            ];
        });

        // Get recommended modules
        $recommendedModules = $this->adaptiveLearning->getRecommendedModules($user, 3);

        // Get sector overview
        $sectorCompletion = $this->analytics->getSectorCompletion($user);

        // Get leaderboard
        $leaderboard = $this->gamification->getLeaderboard('global', 10, $user);

        return Inertia::render('Dashboard/Index', [
            'stats' => $stats,
            'recentSessions' => $recentSessions,
            'recommendedModules' => $recommendedModules->values()->toArray(),
            'sectorCompletion' => $sectorCompletion,
            'recentAchievements' => $recentAchievements,
            'leaderboard' => $leaderboard->toArray(),
            'user' => $user,
        ]);
    }
}
