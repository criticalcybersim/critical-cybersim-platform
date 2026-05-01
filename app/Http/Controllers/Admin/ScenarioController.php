<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SimulationModule;
use App\Models\TrainingScenario;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScenarioController extends Controller
{
    public function index(SimulationModule $module)
    {
        $module->load(['scenarios' => function ($query) {
            $query->orderBy('order_number');
        }, 'sector']);

        return Inertia::render('Admin/Scenarios/Index', [
            'module' => $module,
            'scenarios' => $module->scenarios,
        ]);
    }

    public function create(SimulationModule $module)
    {
        return Inertia::render('Admin/Scenarios/Create', [
            'module' => $module,
            'nextOrderNumber' => $module->scenarios()->max('order_number') + 1,
        ]);
    }

    public function store(Request $request, SimulationModule $module)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'scenario_type' => 'required|in:decision,technical,analysis,response',
            'content' => 'required|string',
            'order_number' => 'required|integer|min:1',
            'choices' => 'required|array|min:2',
            'choices.*.text' => 'required|string',
            'choices.*.is_correct' => 'required|boolean',
            'choices.*.feedback' => 'required|string',
            'correct_actions' => 'required|array|min:1',
            'max_score' => 'required|integer|min:1',
            'time_limit_seconds' => 'nullable|integer|min:1',
            'is_critical' => 'boolean',
        ]);

        $validated['module_id'] = $module->id;

        TrainingScenario::create($validated);

        return redirect()->route('admin.modules.scenarios.index', $module)
            ->with('success', 'Scenario created successfully!');
    }

    public function edit(SimulationModule $module, TrainingScenario $scenario)
    {
        return Inertia::render('Admin/Scenarios/Edit', [
            'module' => $module,
            'scenario' => $scenario,
        ]);
    }

    public function update(Request $request, SimulationModule $module, TrainingScenario $scenario)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'scenario_type' => 'required|in:decision,technical,analysis,response',
            'content' => 'required|string',
            'order_number' => 'required|integer|min:1',
            'choices' => 'required|array|min:2',
            'choices.*.text' => 'required|string',
            'choices.*.is_correct' => 'required|boolean',
            'choices.*.feedback' => 'required|string',
            'correct_actions' => 'required|array|min:1',
            'max_score' => 'required|integer|min:1',
            'time_limit_seconds' => 'nullable|integer|min:1',
            'is_critical' => 'boolean',
        ]);

        $scenario->update($validated);

        return redirect()->route('admin.modules.scenarios.index', $module)
            ->with('success', 'Scenario updated successfully!');
    }

    public function destroy(SimulationModule $module, TrainingScenario $scenario)
    {
        $scenario->delete();

        return redirect()->back()
            ->with('success', 'Scenario deleted successfully!');
    }

    public function reorder(Request $request, SimulationModule $module)
    {
        $validated = $request->validate([
            'scenarios' => 'required|array',
            'scenarios.*.id' => 'required|exists:training_scenarios,id',
            'scenarios.*.order_number' => 'required|integer|min:1',
        ]);

        foreach ($validated['scenarios'] as $scenarioData) {
            TrainingScenario::where('id', $scenarioData['id'])
                ->update(['order_number' => $scenarioData['order_number']]);
        }

        return redirect()->back()
            ->with('success', 'Scenarios reordered successfully!');
    }
}
