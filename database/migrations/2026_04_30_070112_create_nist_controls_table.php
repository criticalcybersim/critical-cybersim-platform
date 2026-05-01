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
        Schema::create('nist_controls', function (Blueprint $table) {
            $table->id();
            $table->string('control_id')->unique();
            $table->string('control_family');
            $table->string('control_family_code');
            $table->string('title');
            $table->text('description');
            $table->string('impact_level');
            $table->boolean('is_baseline')->default(true);
            $table->json('related_controls')->nullable();
            $table->timestamps();

            $table->index('control_id');
            $table->index('control_family_code');
            $table->index('impact_level');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nist_controls');
    }
};
