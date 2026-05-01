<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            'view simulations',
            'start simulations',
            'view own progress',
            'view own analytics',
            'view leaderboard',
            'view achievements',
            'manage users',
            'manage organizations',
            'manage simulations',
            'manage sectors',
            'manage content',
            'view all analytics',
            'manage roles',
            'manage permissions',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles and assign permissions
        $traineeRole = Role::create(['name' => 'trainee']);
        $traineeRole->givePermissionTo([
            'view simulations',
            'start simulations',
            'view own progress',
            'view own analytics',
            'view leaderboard',
            'view achievements',
        ]);

        $analystRole = Role::create(['name' => 'analyst']);
        $analystRole->givePermissionTo($traineeRole->permissions);
        $analystRole->givePermissionTo('view all analytics');

        $adminRole = Role::create(['name' => 'admin']);
        $adminRole->givePermissionTo($analystRole->permissions);
        $adminRole->givePermissionTo([
            'manage users',
            'manage organizations',
            'manage simulations',
            'manage content',
        ]);

        $superAdminRole = Role::create(['name' => 'super_admin']);
        $superAdminRole->givePermissionTo(Permission::all());

        $this->command->info('✓ Seeded roles and permissions');
    }
}
