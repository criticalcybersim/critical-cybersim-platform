<?php

namespace App\Http\Controllers\Leaderboard;

use App\Http\Controllers\Controller;
use App\Services\Gamification\GamificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class LeaderboardController extends Controller
{
    public function __construct(
        protected GamificationService $gamification
    ) {}

    /**
     * Display leaderboards.
     */
    public function index(Request $request): Response
    {
        $user = Auth::user();
        $type = $request->type ?? 'global';
        $limit = 100;

        $leaderboard = $this->gamification->getLeaderboard($type, $limit, $user);
        $userRank = $this->gamification->getUserRank($user, $type);

        return Inertia::render('Leaderboard/Index', [
            'leaderboard' => $leaderboard,
            'userRank' => $userRank,
            'type' => $type,
        ]);
    }
}
