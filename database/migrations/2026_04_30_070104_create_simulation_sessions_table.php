<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('simulation_sessions', function (Blueprint $table) {
            $table->id();
            $table->string('session_code')->unique();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('module_id')->constrained('simulation_modules')->cascadeOnDelete();
            $table->string('status');
            $table->integer('current_scenario_index')->default(0);
            $table->integer('score')->default(0);
            $table->integer('max_possible_score')->default(0);
            $table->decimal('percentage_score', 5, 2)->default(0);
            $table->integer('time_spent_seconds')->default(0);
            $table->json('decisions_made')->nullable();
            $table->json('mistakes_made')->nullable();
            $table->text('ai_feedback')->nullable();
            $table->timestamp('started_at');
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();

            $table->index('session_code');
            $table->index('user_id');
            $table->index('module_id');
            $table->index('status');
            $table->index('started_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('simulation_sessions');
    }
};
