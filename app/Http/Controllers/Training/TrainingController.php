<?php

namespace App\Http\Controllers\Training;

use App\Http\Controllers\Controller;
use App\Services\AdaptiveLearning\AdaptiveLearningService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class TrainingController extends Controller
{
    public function __construct(
        protected AdaptiveLearningService $adaptiveLearning
    ) {}

    /**
     * Display personalized learning paths.
     */
    public function index(): Response
    {
        $user = Auth::user();

        $learningPath = $this->adaptiveLearning->generateLearningPath($user);
        $strengths = $this->adaptiveLearning->analyzeUserStrengths($user);
        $weaknesses = $this->adaptiveLearning->analyzeUserWeaknesses($user);
        $recommendedDifficulty = $this->adaptiveLearning->calculateNextDifficultyLevel($user);

        return Inertia::render('Training/Index', [
            'learningPath' => $learningPath,
            'strengths' => $strengths,
            'weaknesses' => $weaknesses,
            'recommendedDifficulty' => $recommendedDifficulty,
        ]);
    }
}
