<?php

namespace App\Http\Controllers\Analytics;

use App\Http\Controllers\Controller;
use App\Services\Analytics\AnalyticsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AnalyticsController extends Controller
{
    public function __construct(
        protected AnalyticsService $analytics
    ) {}

    /**
     * Display user analytics dashboard.
     */
    public function index(Request $request): Response
    {
        $user = Auth::user();
        $period = $request->period ?? '30d';

        $data = $this->analytics->getUserAnalytics($user, $period);

        return Inertia::render('Analytics/Index', [
            'analytics' => $data,
            'period' => $period,
        ]);
    }
}
