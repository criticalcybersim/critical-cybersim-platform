<?php

namespace App\Http\Controllers\Simulation;

use App\Http\Controllers\Controller;
use App\Models\SimulationModule;
use App\Models\SimulationSession;
use App\Services\SimulationEngine\SimulationEngineService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class SimulationController extends Controller
{
    public function __construct(
        protected SimulationEngineService $simulationEngine
    ) {}

    /**
     * Display all available simulation modules.
     */
    public function index(Request $request): Response
    {
        $query = SimulationModule::with('sector')
            ->published()
            ->withCount('scenarios');

        // Filter by sector
        if ($request->sector) {
            $query->where('sector_id', $request->sector);
        }

        // Filter by difficulty
        if ($request->difficulty) {
            $query->byDifficulty($request->difficulty);
        }

        // Sort
        $sort = $request->sort ?? 'created_at';
        $order = $request->order ?? 'desc';
        $query->orderBy($sort, $order);

        $modules = $query->paginate(12);

        return Inertia::render('Simulations/Index', [
            'modules' => $modules,
            'filters' => $request->only(['sector', 'difficulty', 'sort', 'order']),
        ]);
    }

    /**
     * Display a specific simulation module.
     */
    public function show(SimulationModule $module): Response
    {
        $module->load(['sector', 'scenarios', 'nistControls']);

        $user = Auth::user();
        $userProgress = $user->progress()->where('module_id', $module->id)->first();

        return Inertia::render('Simulations/Show', [
            'module' => $module,
            'userProgress' => $userProgress,
        ]);
    }

    /**
     * Start a new simulation session.
     */
    public function start(SimulationModule $module)
    {
        $session = $this->simulationEngine->startSession(Auth::user(), $module);

        return redirect()->route('sessions.show', $session);
    }

    /**
     * Display an active simulation session.
     */
    public function session(SimulationSession $session): Response
    {
        // Ensure session belongs to authenticated user
        if ($session->user_id !== Auth::id()) {
            abort(403);
        }

        $session->load(['module.sector']);

        // Get current scenario
        $scenarios = $session->module->scenarios()->ordered()->get();
        $currentScenario = $scenarios[$session->current_scenario_index] ?? null;

        // Transform scenario data for frontend
        if ($currentScenario) {
            $currentScenario = [
                'id' => $currentScenario->id,
                'title' => $currentScenario->title,
                'description' => $currentScenario->scenario_type,
                'context' => $currentScenario->content,
                'options' => collect($currentScenario->choices ?? [])->map(function ($choice) {
                    return [
                        'key' => $choice['id'] ?? '',
                        'text' => $choice['description'] ?? $choice['title'] ?? '',
                        'title' => $choice['title'] ?? '',
                    ];
                })->toArray(),
            ];
        }

        // Append to session object
        $session->current_scenario = $currentScenario;
        $session->total_scenarios = $scenarios->count();

        return Inertia::render('Simulations/Session', [
            'session' => $session,
            'feedback' => session('feedback'),
        ]);
    }

    /**
     * Submit a decision for the current scenario.
     */
    public function submitAction(Request $request, SimulationSession $session)
    {
        // Ensure session belongs to authenticated user
        if ($session->user_id !== Auth::id()) {
            abort(403);
        }

        $validator = Validator::make($request->all(), [
            'scenario_id' => 'required|exists:training_scenarios,id',
            'action_taken' => 'required|string',
            'time_taken' => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        // Build decision array for the service
        $decision = [
            'scenario_id' => $request->scenario_id,
            'choice_id' => $request->action_taken,
            'time_taken' => $request->time_taken,
        ];

        $result = $this->simulationEngine->processDecision($session, $decision);

        // If session is complete, redirect to results
        if ($result['is_complete']) {
            return redirect()->route('sessions.results', $session)
                ->with('success', 'Training session completed!');
        }

        // Otherwise, redirect back to session page with feedback
        return redirect()->route('sessions.show', $session)
            ->with('feedback', [
                'is_correct' => $result['is_correct'],
                'points_earned' => $result['points_earned'],
                'feedback' => $result['feedback'],
            ]);
    }

    /**
     * Complete the simulation session.
     */
    public function complete(SimulationSession $session)
    {
        // Ensure session belongs to authenticated user
        if ($session->user_id !== Auth::id()) {
            abort(403);
        }

        $summary = $this->simulationEngine->completeSession($session);

        return redirect()->route('simulations.results', $session);
    }

    /**
     * Display simulation results.
     */
    public function results(SimulationSession $session): Response
    {
        // Ensure session belongs to authenticated user
        if ($session->user_id !== Auth::id()) {
            abort(403);
        }

        $session->load(['module.sector']);

        return Inertia::render('Simulations/Results', [
            'session' => $session,
        ]);
    }
}
