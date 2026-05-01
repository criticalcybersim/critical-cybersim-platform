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
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('trainee')->after('email');
            $table->foreignId('organization_id')->nullable()->after('role')->constrained()->nullOnDelete();
            $table->foreignId('sector_id')->nullable()->after('organization_id')->constrained()->nullOnDelete();
            $table->string('job_title')->nullable()->after('sector_id');
            $table->integer('experience_level')->default(1)->after('job_title');
            $table->integer('total_points')->default(0)->after('experience_level');
            $table->integer('current_streak')->default(0)->after('total_points');
            $table->timestamp('last_active_at')->nullable()->after('current_streak');
            $table->json('preferences')->nullable()->after('last_active_at');

            $table->index('role');
            $table->index('total_points');
            $table->index('current_streak');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['organization_id']);
            $table->dropForeign(['sector_id']);
            $table->dropColumn([
                'role',
                'organization_id',
                'sector_id',
                'job_title',
                'experience_level',
                'total_points',
                'current_streak',
                'last_active_at',
                'preferences',
            ]);
        });
    }
};
