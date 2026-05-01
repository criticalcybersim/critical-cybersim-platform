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
        Schema::create('training_scenarios', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->foreignId('module_id')->constrained('simulation_modules')->cascadeOnDelete();
            $table->integer('order_number');
            $table->string('scenario_type');
            $table->text('content');
            $table->json('choices')->nullable();
            $table->json('correct_actions')->nullable();
            $table->integer('max_score')->default(100);
            $table->integer('time_limit_seconds')->nullable();
            $table->boolean('is_critical')->default(false);
            $table->timestamps();

            $table->index('module_id');
            $table->index('order_number');
            $table->index('scenario_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('training_scenarios');
    }
};
