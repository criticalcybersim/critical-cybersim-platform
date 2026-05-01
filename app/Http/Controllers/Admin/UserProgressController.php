<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SimulationModule;
use App\Models\SimulationSession;
use App\Models\User;
use App\Models\UserProgress;
use Inertia\Inertia;

class UserProgressController extends Controller
{
    public function index()
    {
        $users = User::withCount(['sessions', 'achievements'])
            ->with(['progress' => function ($query) {
                $query->with('module');
            }])
            ->where('role', '!=', 'admin')
            ->latest()
            ->paginate(15);

        return Inertia::render('Admin/UserProgress/Index', [
            'users' => $users,
        ]);
    }

    public function show(User $user)
    {
        $progress = UserProgress::with(['module'])
            ->where('user_id', $user->id)
            ->get();

        $sessions = SimulationSession::with(['module'])
            ->where('user_id', $user->id)
            ->latest()
            ->paginate(10);

        $stats = [
            'total_sessions' => SimulationSession::where('user_id', $user->id)->count(),
            'completed_sessions' => SimulationSession::where('user_id', $user->id)
                ->where('status', 'completed')
                ->count(),
            'total_points' => UserProgress::where('user_id', $user->id)->sum('points_earned'),
            'average_score' => SimulationSession::where('user_id', $user->id)
                ->where('status', 'completed')
                ->avg('score'),
            'modules_completed' => UserProgress::where('user_id', $user->id)
                ->where('completion_status', 'completed')
                ->count(),
            'total_time_spent' => SimulationSession::where('user_id', $user->id)
                ->sum('time_spent_seconds'),
        ];

        return Inertia::render('Admin/UserProgress/Show', [
            'user' => $user,
            'progress' => $progress,
            'sessions' => $sessions,
            'stats' => $stats,
        ]);
    }

    public function analytics()
    {
        $modulePerformance = SimulationModule::withCount('sessions')
            ->withAvg('sessions', 'score')
            ->with('sector')
            ->orderByDesc('sessions_count')
            ->limit(10)
            ->get();

        $recentActivity = SimulationSession::with(['user', 'module'])
            ->latest()
            ->limit(20)
            ->get();

        $stats = [
            'total_users' => User::where('role', '!=', 'admin')->count(),
            'active_users_7d' => User::whereHas('sessions', function ($query) {
                $query->where('created_at', '>=', now()->subDays(7));
            })->count(),
            'total_modules' => SimulationModule::count(),
            'published_modules' => SimulationModule::where('is_published', true)->count(),
            'total_sessions' => SimulationSession::count(),
            'completed_sessions' => SimulationSession::where('status', 'completed')->count(),
            'average_completion_rate' => SimulationSession::where('status', 'completed')->count() /
                max(SimulationSession::count(), 1) * 100,
            'average_score' => SimulationSession::where('status', 'completed')->avg('score'),
        ];

        return Inertia::render('Admin/UserProgress/Analytics', [
            'modulePerformance' => $modulePerformance,
            'recentActivity' => $recentActivity,
            'stats' => $stats,
        ]);
    }
}
