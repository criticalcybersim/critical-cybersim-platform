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
        Schema::create('user_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('module_id')->constrained('simulation_modules')->cascadeOnDelete();
            $table->string('status');
            $table->integer('attempts')->default(0);
            $table->integer('best_score')->default(0);
            $table->integer('latest_score')->default(0);
            $table->decimal('completion_percentage', 5, 2)->default(0);
            $table->integer('points_earned')->default(0);
            $table->timestamp('first_started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamp('last_attempted_at')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'module_id']);
            $table->index('status');
            $table->index('user_id');
            $table->index('module_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_progress');
    }
};
