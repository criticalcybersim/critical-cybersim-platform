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
        Schema::create('simulation_modules', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->text('learning_objectives');
            $table->foreignId('sector_id')->constrained()->cascadeOnDelete();
            $table->string('difficulty_level');
            $table->integer('estimated_duration_minutes')->default(60);
            $table->integer('points_reward')->default(100);
            $table->string('attack_type');
            $table->json('nist_controls')->nullable();
            $table->json('prerequisites')->nullable();
            $table->boolean('is_published')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->integer('completion_count')->default(0);
            $table->decimal('average_score', 5, 2)->default(0);
            $table->string('thumbnail_path')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('slug');
            $table->index('sector_id');
            $table->index('difficulty_level');
            $table->index('is_published');
            $table->index('is_featured');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('simulation_modules');
    }
};
