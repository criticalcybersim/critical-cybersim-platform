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
        Schema::create('nist_control_simulation_module', function (Blueprint $table) {
            $table->id();
            $table->foreignId('nist_control_id')->constrained()->cascadeOnDelete();
            $table->foreignId('simulation_module_id')->constrained()->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['nist_control_id', 'simulation_module_id'], 'nist_module_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nist_control_simulation_module');
    }
};
