<?php

namespace Tests\Feature\User;

use App\Models\SimulationModule;
use App\Models\User;
use App\Models\UserProgress;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LearningDashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_access_learning_dashboard(): void
    {
        $response = $this->get('/learning');

        $response->assertRedirect('/login');
    }

    public function test_authenticated_user_can_access_learning_dashboard(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/learning');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('User/Learning/Dashboard'));
    }

    public function test_learning_dashboard_shows_user_stats(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/learning');

        $response->assertStatus(200);
        $response->assertInertia(
            fn ($page) => $page
                ->has('stats')
                ->has('progress')
                ->has('availableModules')
                ->has('recentSessions')
                ->has('achievements')
        );
    }
}
