<?php

namespace App\Http\Controllers\Sector;

use App\Http\Controllers\Controller;
use App\Models\Sector;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class SectorController extends Controller
{
    /**
     * Display all sectors.
     */
    public function index(): Response
    {
        $sectors = Sector::active()
            ->withCount(['simulationModules' => function ($query) {
                $query->published();
            }])
            ->orderBy('name')
            ->get();

        return Inertia::render('Sectors/Index', [
            'sectors' => $sectors,
        ]);
    }

    /**
     * Display a specific sector with modules.
     */
    public function show(Sector $sector): Response
    {
        $sector->load([
            'simulationModules' => function ($query) {
                $query->published()->with('scenarios');
            },
        ]);

        $user = Auth::user();

        // Calculate user's progress in this sector (only if authenticated)
        $totalModules = $sector->simulationModules->count();
        $completedModules = 0;
        
        if ($user) {
            $completedModules = $user->progress()
                ->where('status', 'completed')
                ->whereHas('module', function ($query) use ($sector) {
                    $query->where('sector_id', $sector->id);
                })
                ->count();
        }

        $progressPercentage = $totalModules > 0
            ? round(($completedModules / $totalModules) * 100, 2)
            : 0;

        return Inertia::render('Sectors/Show', [
            'sector' => $sector,
            'progress' => [
                'completed' => $completedModules,
                'total' => $totalModules,
                'percentage' => $progressPercentage,
            ],
        ]);
    }
}
