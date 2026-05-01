<?php

use App\Http\Controllers\Achievement\AchievementController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\ModuleController as AdminModuleController;
use App\Http\Controllers\Admin\ScenarioController as AdminScenarioController;
use App\Http\Controllers\Admin\UserProgressController;
use App\Http\Controllers\User\LearningController;
use App\Http\Controllers\Analytics\AnalyticsController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\Leaderboard\LeaderboardController;
use App\Http\Controllers\Sector\SectorController;
use App\Http\Controllers\Simulation\SimulationController;
use App\Http\Controllers\Training\TrainingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', [LandingController::class, 'index'])->name('home');
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');
Route::get('/careers', function () {
    return Inertia::render('Careers');
})->name('careers');
Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');
Route::get('/support', function () {
    return Inertia::render('Support');
})->name('support');
Route::get('/pricing', function () {
    return Inertia::render('Pricing');
})->name('pricing');
Route::get('/privacy', function () {
    return Inertia::render('Privacy');
})->name('privacy');
Route::get('/terms', function () {
    return Inertia::render('Terms');
})->name('terms');

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/

require __DIR__.'/auth.php';

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Sectors
    Route::get('/sectors', [SectorController::class, 'index'])->name('sectors.index');
    Route::get('/sectors/{sector:slug}', [SectorController::class, 'show'])->name('sectors.show');

    // Simulations
    Route::prefix('simulations')->name('simulations.')->group(function () {
        Route::get('/', [SimulationController::class, 'index'])->name('index');
        Route::get('/{module:slug}', [SimulationController::class, 'show'])->name('show');
        Route::post('/{module:slug}/start', [SimulationController::class, 'start'])->name('start');
    });

    // Simulation Sessions
    Route::prefix('sessions')->name('sessions.')->group(function () {
        Route::get('/{session}', [SimulationController::class, 'session'])->name('show');
        Route::post('/{session}/action', [SimulationController::class, 'submitAction'])->name('action');
        Route::post('/{session}/complete', [SimulationController::class, 'complete'])->name('complete');
        Route::get('/{session}/results', [SimulationController::class, 'results'])->name('results');
    });

    // Training & Learning Paths
    Route::get('/learning-paths', [TrainingController::class, 'index'])->name('learning-paths');

    // User Learning Dashboard
    Route::prefix('learning')->name('learning.')->group(function () {
        Route::get('/', [LearningController::class, 'index'])->name('dashboard');
        Route::get('/progress', [LearningController::class, 'progress'])->name('progress');
        Route::get('/history', [LearningController::class, 'history'])->name('history');
    });

    // Analytics
    Route::get('/analytics', [AnalyticsController::class, 'index'])->name('analytics');

    // Achievements
    Route::get('/achievements', [AchievementController::class, 'index'])->name('achievements');

    // Leaderboard
    Route::get('/leaderboard', [LeaderboardController::class, 'index'])->name('leaderboard');

    // Settings
    require __DIR__.'/settings.php';
});

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

// Redirect /admin to /admin/dashboard
Route::redirect('/admin', '/admin/dashboard');

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    // Module Management
    Route::resource('modules', AdminModuleController::class)->except(['show']);
    Route::post('/modules/{module}/toggle', [AdminModuleController::class, 'toggle'])->name('modules.toggle');

    // Scenario Management (nested under modules)
    Route::prefix('modules/{module}/scenarios')->name('modules.scenarios.')->group(function () {
        Route::get('/', [AdminScenarioController::class, 'index'])->name('index');
        Route::get('/create', [AdminScenarioController::class, 'create'])->name('create');
        Route::post('/', [AdminScenarioController::class, 'store'])->name('store');
        Route::get('/{scenario}/edit', [AdminScenarioController::class, 'edit'])->name('edit');
        Route::put('/{scenario}', [AdminScenarioController::class, 'update'])->name('update');
        Route::delete('/{scenario}', [AdminScenarioController::class, 'destroy'])->name('destroy');
        Route::post('/reorder', [AdminScenarioController::class, 'reorder'])->name('reorder');
    });

    // User Progress Tracking
    Route::prefix('users')->name('users.')->group(function () {
        Route::get('/progress', [UserProgressController::class, 'index'])->name('progress');
        Route::get('/progress/{user}', [UserProgressController::class, 'show'])->name('progress.show');
        Route::get('/analytics', [UserProgressController::class, 'analytics'])->name('analytics');
    });
});
