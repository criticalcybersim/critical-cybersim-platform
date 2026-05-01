<?php

namespace App\Http\Controllers;

use App\Models\Sector;
use App\Models\SimulationModule;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class LandingController extends Controller
{
    /**
     * Display the landing page.
     */
    public function index(): Response
    {
        $sectors = Sector::active()
            ->withCount(['simulationModules' => function ($query) {
                $query->published();
            }])
            ->orderBy('name')
            ->get();

        $featuredModules = SimulationModule::published()
            ->featured()
            ->with('sector')
            ->take(3)
            ->get();

        $stats = [
            'total_users' => User::count(),
            'total_simulations' => SimulationModule::published()->count(),
            'total_sectors' => Sector::active()->count(),
            'total_completions' => \DB::table('simulation_sessions')->where('status', 'completed')->count(),
        ];

        return Inertia::render('Landing/Index', [
            'sectors' => $sectors,
            'featuredModules' => $featuredModules,
            'stats' => $stats,
        ]);
    }
}
