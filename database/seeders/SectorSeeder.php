<?php

namespace Database\Seeders;

use App\Models\Sector;
use Illuminate\Database\Seeder;

class SectorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sectors = config('sectors.sectors');

        foreach ($sectors as $sector) {
            Sector::create($sector);
        }

        $this->command->info('✓ Seeded '.count($sectors).' critical infrastructure sectors');
    }
}
