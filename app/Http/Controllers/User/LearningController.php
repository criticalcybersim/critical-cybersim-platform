<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use App\Models\SimulationModule;
use App\Models\SimulationSession;
use App\Models\UserProgress;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LearningController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $progress = UserProgress::with(['module.sector'])
            ->where('user_id', $user->id)
            ->get();

        $availableModules = SimulationModule::with('sector')
            ->where('is_published', true)
            ->whereDoesntHave('userProgress', function ($query) use ($user) {
                $query->where('user_id', $user->id)
                    ->where('completion_status', 'completed');
            })
            ->withCount('scenarios')
            ->get();

        $recentSessions = SimulationSession::with('module')
            ->where('user_id', $user->id)
            ->latest()
            ->limit(5)
            ->get();

        $achievements = Achievement::where('user_id', $user->id)
            ->latest()
            ->limit(6)
            ->get();

        $stats = [
            'total_modules' => UserProgress::where('user_id', $user->id)->count(),
            'completed_modules' => UserProgress::where('user_id', $user->id)
                ->where('completion_status', 'completed')
                ->count(),
            'in_progress_modules' => UserProgress::where('user_id', $user->id)
                ->where('completion_status', 'in_progress')
                ->count(),
            'total_points' => UserProgress::where('user_id', $user->id)->sum('points_earned'),
            'total_sessions' => SimulationSession::where('user_id', $user->id)->count(),
            'completed_sessions' => SimulationSession::where('user_id', $user->id)
                ->where('status', 'completed')
                ->count(),
            'average_score' => SimulationSession::where('user_id', $user->id)
                ->where('status', 'completed')
                ->avg('score') ?? 0,
            'total_time_spent' => SimulationSession::where('user_id', $user->id)
                ->sum('time_spent_seconds'),
            'achievements_count' => Achievement::where('user_id', $user->id)->count(),
        ];

        return Inertia::render('User/Learning/Dashboard', [
            'progress' => $progress,
            'availableModules' => $availableModules,
            'recentSessions' => $recentSessions,
            'achievements' => $achievements,
            'stats' => $stats,
        ]);
    }

    public function progress()
    {
        $user = Auth::user();

        $allProgress = UserProgress::with(['module.sector'])
            ->where('user_id', $user->id)
            ->orderBy('updated_at', 'desc')
            ->get();

        return Inertia::render('User/Learning/Progress', [
            'progress' => $allProgress,
        ]);
    }

    public function history()
    {
        $user = Auth::user();

        $sessions = SimulationSession::with('module.sector')
            ->where('user_id', $user->id)
            ->latest()
            ->paginate(15);

        return Inertia::render('User/Learning/History', [
            'sessions' => $sessions,
        ]);
    }
}
