<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ErrorPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_404_page_is_rendered(): void
    {
        $response = $this->get('/non-existent-page-that-does-not-exist');

        $response->assertStatus(404);
    }
}
