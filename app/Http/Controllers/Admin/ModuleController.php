<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Sector;
use App\Models\SimulationModule;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ModuleController extends Controller
{
    public function index()
    {
        $modules = SimulationModule::with(['sector'])
            ->withCount(['scenarios', 'sessions'])
            ->latest()
            ->paginate(15);

        return Inertia::render('Admin/Modules/Index', [
            'modules' => $modules,
        ]);
    }

    public function create()
    {
        $sectors = Sector::orderBy('name')->get();

        return Inertia::render('Admin/Modules/Create', [
            'sectors' => $sectors,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'learning_objectives' => 'required|string',
            'sector_id' => 'required|exists:sectors,id',
            'difficulty_level' => 'required|in:Beginner,Intermediate,Advanced,Expert',
            'estimated_duration_minutes' => 'required|integer|min:1',
            'points_reward' => 'required|integer|min:0',
            'attack_type' => 'required|string',
            'nist_controls' => 'nullable|array',
            'prerequisites' => 'nullable|array',
            'is_published' => 'boolean',
            'is_featured' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        // Ensure unique slug
        $originalSlug = $validated['slug'];
        $count = 1;
        while (SimulationModule::where('slug', $validated['slug'])->exists()) {
            $validated['slug'] = $originalSlug.'-'.$count;
            $count++;
        }

        SimulationModule::create($validated);

        return redirect()->route('admin.modules.index')
            ->with('success', 'Training module created successfully!');
    }

    public function edit(SimulationModule $module)
    {
        $sectors = Sector::orderBy('name')->get();

        $module->load(['sector', 'scenarios']);

        return Inertia::render('Admin/Modules/Edit', [
            'module' => $module,
            'sectors' => $sectors,
        ]);
    }

    public function update(Request $request, SimulationModule $module)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'learning_objectives' => 'required|string',
            'sector_id' => 'required|exists:sectors,id',
            'difficulty_level' => 'required|in:Beginner,Intermediate,Advanced,Expert',
            'estimated_duration_minutes' => 'required|integer|min:1',
            'points_reward' => 'required|integer|min:0',
            'attack_type' => 'required|string',
            'nist_controls' => 'nullable|array',
            'prerequisites' => 'nullable|array',
            'is_published' => 'boolean',
            'is_featured' => 'boolean',
        ]);

        // Only update slug if title changed
        if ($validated['title'] !== $module->title) {
            $validated['slug'] = Str::slug($validated['title']);

            // Ensure unique slug
            $originalSlug = $validated['slug'];
            $count = 1;
            while (SimulationModule::where('slug', $validated['slug'])->where('id', '!=', $module->id)->exists()) {
                $validated['slug'] = $originalSlug.'-'.$count;
                $count++;
            }
        }

        $module->update($validated);

        return redirect()->route('admin.modules.index')
            ->with('success', 'Training module updated successfully!');
    }

    public function destroy(SimulationModule $module)
    {
        $module->delete();

        return redirect()->route('admin.modules.index')
            ->with('success', 'Training module deleted successfully!');
    }

    public function toggle(SimulationModule $module)
    {
        $module->update([
            'is_published' => ! $module->is_published,
        ]);

        $status = $module->is_published ? 'published' : 'unpublished';

        return redirect()->back()
            ->with('success', "Module {$status} successfully!");
    }
}
