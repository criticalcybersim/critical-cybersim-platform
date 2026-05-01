<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Organization;
use App\Models\SimulationModule;
use App\Models\SimulationSession;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    /**
     * Display admin dashboard.
     */
    public function index(): Response
    {
        // Overview statistics
        $stats = [
            'total_users' => User::count(),
            'active_users_30d' => User::where('last_active_at', '>=', now()->subDays(30))->count(),
            'total_organizations' => Organization::count(),
            'total_modules' => SimulationModule::count(),
            'published_modules' => SimulationModule::published()->count(),
            'total_sessions' => SimulationSession::count(),
            'completed_sessions' => SimulationSession::where('status', 'completed')->count(),
            'average_score' => round(SimulationSession::where('status', 'completed')->avg('percentage_score'), 2),
        ];

        // Recent registrations
        $recentUsers = User::with(['organization', 'sector'])
            ->latest('created_at')
            ->take(5)
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'organization' => $user->organization?->name,
                    'sector' => $user->sector?->name,
                    'created_at' => $user->created_at->format('M d, Y'),
                ];
            });

        // Popular modules
        $popularModules = SimulationModule::withCount('sessions')
            ->orderByDesc('sessions_count')
            ->take(5)
            ->get()
            ->map(function ($module) {
                return [
                    'title' => $module->title,
                    'sessions' => $module->sessions_count,
                ];
            });

        // Activity over time (last 7 days)
        $activityData = DB::table('simulation_sessions')
            ->selectRaw('DATE(started_at) as date, COUNT(*) as count')
            ->where('started_at', '>=', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(function ($item) {
                return [
                    'date' => $item->date,
                    'count' => $item->count,
                ];
            });

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentUsers' => $recentUsers,
            'popularModules' => $popularModules,
            'activityData' => $activityData,
        ]);
    }
}
