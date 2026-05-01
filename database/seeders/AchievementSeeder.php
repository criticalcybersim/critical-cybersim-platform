<?php

namespace Database\Seeders;

use App\Models\Achievement;
use Illuminate\Database\Seeder;

class AchievementSeeder extends Seeder
{
    public function run(): void
    {
        $achievements = [
            // Completion Achievements
            [
                'name' => 'First Steps',
                'slug' => 'first-steps',
                'description' => 'Complete your first simulation module',
                'icon' => 'footprints',
                'badge_color' => '#10B981',
                'category' => 'completion',
                'rarity' => 'common',
                'points_value' => 50,
            ],
            [
                'name' => 'Perfect Score',
                'slug' => 'perfect-score',
                'description' => 'Score 100% on any simulation module',
                'icon' => 'trophy',
                'badge_color' => '#F59E0B',
                'category' => 'accuracy',
                'rarity' => 'rare',
                'points_value' => 150,
            ],
            [
                'name' => 'Hat Trick',
                'slug' => 'hat-trick',
                'description' => 'Complete 3 simulation modules',
                'icon' => 'target',
                'badge_color' => '#3B82F6',
                'category' => 'completion',
                'rarity' => 'common',
                'points_value' => 100,
            ],
            [
                'name' => 'Dedicated Learner',
                'slug' => 'dedicated-learner',
                'description' => 'Complete 10 simulation modules',
                'icon' => 'book-open',
                'badge_color' => '#8B5CF6',
                'category' => 'completion',
                'rarity' => 'rare',
                'points_value' => 300,
            ],
            [
                'name' => 'Master Defender',
                'slug' => 'master-defender',
                'description' => 'Complete all modules in any sector',
                'icon' => 'shield',
                'badge_color' => '#EF4444',
                'category' => 'completion',
                'rarity' => 'epic',
                'points_value' => 500,
            ],

            // Streak Achievements
            [
                'name' => 'Week Warrior',
                'slug' => 'week-warrior',
                'description' => 'Maintain a 7-day learning streak',
                'icon' => 'flame',
                'badge_color' => '#F97316',
                'category' => 'streak',
                'rarity' => 'common',
                'points_value' => 100,
            ],
            [
                'name' => 'Month Master',
                'slug' => 'month-master',
                'description' => 'Maintain a 30-day learning streak',
                'icon' => 'calendar',
                'badge_color' => '#F59E0B',
                'category' => 'streak',
                'rarity' => 'epic',
                'points_value' => 400,
            ],
            [
                'name' => 'Unstoppable',
                'slug' => 'unstoppable',
                'description' => 'Maintain a 90-day learning streak',
                'icon' => 'zap',
                'badge_color' => '#EF4444',
                'category' => 'streak',
                'rarity' => 'legendary',
                'points_value' => 1000,
            ],

            // Speed Achievements
            [
                'name' => 'Speed Runner',
                'slug' => 'speed-runner',
                'description' => 'Complete a simulation in under 50% of estimated time',
                'icon' => 'gauge',
                'badge_color' => '#06B6D4',
                'category' => 'speed',
                'rarity' => 'rare',
                'points_value' => 200,
            ],
            [
                'name' => 'Lightning Fast',
                'slug' => 'lightning-fast',
                'description' => 'Complete 5 simulations under estimated time',
                'icon' => 'bolt',
                'badge_color' => '#FDE047',
                'category' => 'speed',
                'rarity' => 'epic',
                'points_value' => 350,
            ],

            // Sector-Specific Achievements
            [
                'name' => 'Energy Guardian',
                'slug' => 'energy-guardian',
                'description' => 'Complete all Energy Sector modules',
                'icon' => 'zap',
                'badge_color' => '#F59E0B',
                'category' => 'sector',
                'rarity' => 'epic',
                'points_value' => 500,
            ],
            [
                'name' => 'Healthcare Hero',
                'slug' => 'healthcare-hero',
                'description' => 'Complete all Healthcare Sector modules',
                'icon' => 'heart-pulse',
                'badge_color' => '#EF4444',
                'category' => 'sector',
                'rarity' => 'epic',
                'points_value' => 500,
            ],
            [
                'name' => 'Finance Defender',
                'slug' => 'finance-defender',
                'description' => 'Complete all Financial Services modules',
                'icon' => 'landmark',
                'badge_color' => '#10B981',
                'category' => 'sector',
                'rarity' => 'epic',
                'points_value' => 500,
            ],

            // Framework Achievements
            [
                'name' => 'NIST Champion',
                'slug' => 'nist-champion',
                'description' => 'Practice all 5 major NIST control families',
                'icon' => 'award',
                'badge_color' => '#6366F1',
                'category' => 'framework',
                'rarity' => 'epic',
                'points_value' => 400,
            ],
            [
                'name' => 'Zero Trust Master',
                'slug' => 'zero-trust-master',
                'description' => 'Complete 10 modules featuring Zero Trust principles',
                'icon' => 'lock',
                'badge_color' => '#8B5CF6',
                'category' => 'framework',
                'rarity' => 'epic',
                'points_value' => 450,
            ],

            // Accuracy Achievements
            [
                'name' => 'Sharpshooter',
                'slug' => 'sharpshooter',
                'description' => 'Achieve 90%+ average score across 5 modules',
                'icon' => 'crosshair',
                'badge_color' => '#EF4444',
                'category' => 'accuracy',
                'rarity' => 'rare',
                'points_value' => 250,
            ],
            [
                'name' => 'Elite Analyst',
                'slug' => 'elite-analyst',
                'description' => 'Score 95%+ on an Expert difficulty module',
                'icon' => 'brain',
                'badge_color' => '#F59E0B',
                'category' => 'accuracy',
                'rarity' => 'legendary',
                'points_value' => 600,
            ],

            // Improvement Achievements
            [
                'name' => 'Rising Star',
                'slug' => 'rising-star',
                'description' => 'Improve score by 20+ points on module retry',
                'icon' => 'trending-up',
                'badge_color' => '#10B981',
                'category' => 'improvement',
                'rarity' => 'common',
                'points_value' => 75,
            ],
            [
                'name' => 'Comeback King',
                'slug' => 'comeback-king',
                'description' => 'Pass a module after failing it twice',
                'icon' => 'rotate-ccw',
                'badge_color' => '#F59E0B',
                'category' => 'improvement',
                'rarity' => 'rare',
                'points_value' => 200,
            ],

            // Special Achievements
            [
                'name' => 'Critical Infrastructure Guardian',
                'slug' => 'critical-infrastructure-guardian',
                'description' => 'Complete at least one module in all 16 CISA sectors',
                'icon' => 'shield-check',
                'badge_color' => '#DC2626',
                'category' => 'special',
                'rarity' => 'legendary',
                'points_value' => 2000,
            ],
        ];

        foreach ($achievements as $achievement) {
            Achievement::create($achievement);
        }

        $this->command->info('✓ Seeded '.count($achievements).' achievements');
    }
}
