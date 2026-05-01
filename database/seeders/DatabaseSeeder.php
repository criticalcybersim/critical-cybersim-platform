<?php

namespace Database\Seeders;

use App\Models\Organization;
use App\Models\Sector;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->command->info('🚀 Seeding CriticalCyberSim Platform...');
        $this->command->newLine();

        // Seed foundational data
        $this->call([
            RolePermissionSeeder::class,
            SectorSeeder::class,
            NistControlSeeder::class,
            SimulationModuleSeeder::class,
            AchievementSeeder::class,
        ]);

        $this->command->newLine();
        $this->command->info('Creating sample organization and users...');

        // Create sample organization
        $energySector = Sector::where('slug', 'energy')->first();
        $sampleOrg = Organization::create([
            'name' => 'U.S. Department of Energy',
            'slug' => 'us-doe',
            'type' => 'federal',
            'primary_sector_id' => $energySector->id,
            'size' => 'enterprise',
            'country' => 'US',
            'state' => 'DC',
            'description' => 'Sample federal organization for demo purposes',
            'is_active' => true,
        ]);

        // Create Super Admin user
        $superAdmin = User::create([
            'name' => 'Shahbaz Ali Syed',
            'email' => 'admin@criticalcybersim.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'role' => 'super_admin',
            'organization_id' => $sampleOrg->id,
            'sector_id' => $energySector->id,
            'job_title' => 'Founder & CEO',
            'experience_level' => 5,
            'total_points' => 50000,
            'current_streak' => 30,
            'last_active_at' => now(),
        ]);
        $superAdmin->assignRole('super_admin');

        // Create sample trainee user
        $trainee = User::create([
            'name' => 'Demo Trainee',
            'email' => 'trainee@example.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'role' => 'trainee',
            'organization_id' => $sampleOrg->id,
            'sector_id' => $energySector->id,
            'job_title' => 'Cybersecurity Analyst',
            'experience_level' => 2,
            'total_points' => 1250,
            'current_streak' => 5,
            'last_active_at' => now(),
        ]);
        $trainee->assignRole('trainee');

        $this->command->newLine();
        $this->command->info('✅ Database seeded successfully!');
        $this->command->newLine();
        $this->command->info('Login Credentials:');
        $this->command->info('  Super Admin: admin@criticalcybersim.com / password');
        $this->command->info('  Trainee: trainee@example.com / password');
        $this->command->newLine();
    }
}
