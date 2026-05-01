<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Platform Information
    |--------------------------------------------------------------------------
    |
    | Core platform identification and branding information.
    |
    */

    'platform_name' => env('PLATFORM_NAME', 'CriticalCyberSim'),
    'company_name' => 'CriticalCyberSim LLC',
    'founder' => 'Shahbaz Ali Syed',
    'website' => 'https://criticalcybersim.com',
    'github' => 'https://github.com/criticalcybersim/critical-cybersim-platform',
    'location' => 'Wyoming, United States',

    /*
    |--------------------------------------------------------------------------
    | User Experience Levels
    |--------------------------------------------------------------------------
    |
    | Define the progression system for user levels based on points earned.
    | Each level has a name and point threshold range.
    |
    */

    'levels' => [
        1 => [
            'name' => 'Novice',
            'min_points' => 0,
            'max_points' => 999,
            'color' => 'slate',
            'icon' => 'shield',
        ],
        2 => [
            'name' => 'Practitioner',
            'min_points' => 1000,
            'max_points' => 4999,
            'color' => 'emerald',
            'icon' => 'shield-check',
        ],
        3 => [
            'name' => 'Analyst',
            'min_points' => 5000,
            'max_points' => 14999,
            'color' => 'blue',
            'icon' => 'radar',
        ],
        4 => [
            'name' => 'Expert',
            'min_points' => 15000,
            'max_points' => 49999,
            'color' => 'purple',
            'icon' => 'badge',
        ],
        5 => [
            'name' => 'Master',
            'min_points' => 50000,
            'max_points' => 149999,
            'color' => 'orange',
            'icon' => 'crown',
        ],
        6 => [
            'name' => 'Elite Defender',
            'min_points' => 150000,
            'max_points' => PHP_INT_MAX,
            'color' => 'red',
            'icon' => 'flame',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Difficulty Settings
    |--------------------------------------------------------------------------
    |
    | Configuration for simulation difficulty levels including colors,
    | time multipliers, and point rewards.
    |
    */

    'difficulty_levels' => [
        'beginner' => [
            'name' => 'Beginner',
            'color' => 'emerald',
            'time_multiplier' => 1.5,
            'point_multiplier' => 1.0,
            'description' => 'Introduction to basic concepts',
        ],
        'intermediate' => [
            'name' => 'Intermediate',
            'color' => 'blue',
            'time_multiplier' => 1.0,
            'point_multiplier' => 1.25,
            'description' => 'Practical application of skills',
        ],
        'advanced' => [
            'name' => 'Advanced',
            'color' => 'orange',
            'time_multiplier' => 0.75,
            'point_multiplier' => 1.5,
            'description' => 'Complex scenarios requiring expertise',
        ],
        'expert' => [
            'name' => 'Expert',
            'color' => 'red',
            'time_multiplier' => 0.5,
            'point_multiplier' => 2.0,
            'description' => 'Elite-level critical thinking required',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Scoring Configuration
    |--------------------------------------------------------------------------
    |
    | Settings for simulation scoring, passing thresholds, and performance
    | evaluation criteria.
    |
    */

    'passing_score' => 70, // Minimum percentage to pass a simulation
    'perfect_score' => 100,
    'excellence_threshold' => 90, // Score above this is considered excellent
    'time_bonus_threshold' => 0.8, // Complete in less than 80% of time for bonus
    'time_bonus_points' => 50, // Bonus points for speed completion

    /*
    |--------------------------------------------------------------------------
    | Gamification Settings
    |--------------------------------------------------------------------------
    |
    | Configuration for gamification features including streaks, achievements,
    | and leaderboard settings.
    |
    */

    'streak_reset_hours' => 48, // Hours of inactivity before streak resets
    'daily_login_points' => 10,
    'streak_milestone_days' => [7, 30, 90, 180, 365], // Days for streak achievements
    'leaderboard_display_count' => 10,

    /*
    |--------------------------------------------------------------------------
    | Framework and Compliance
    |--------------------------------------------------------------------------
    |
    | Federal cybersecurity framework versions and compliance standards
    | that the platform aligns with.
    |
    */

    'nist_framework_version' => 'SP 800-53 Rev.5',
    'nist_nice_framework' => 'NICE Framework 1.0',
    'zero_trust_mandate' => 'OMB M-22-09',
    'executive_order' => 'EO 14028',
    'cisa_sectors_count' => 16,

    /*
    |--------------------------------------------------------------------------
    | Attack Types
    |--------------------------------------------------------------------------
    |
    | Predefined attack types used in simulations with metadata.
    |
    */

    'attack_types' => [
        'ransomware' => [
            'name' => 'Ransomware Attack',
            'icon' => 'lock-keyhole',
            'color' => 'red',
        ],
        'phishing' => [
            'name' => 'Phishing Campaign',
            'icon' => 'fish',
            'color' => 'orange',
        ],
        'ics_attack' => [
            'name' => 'ICS/SCADA Attack',
            'icon' => 'factory',
            'color' => 'purple',
        ],
        'zero_day' => [
            'name' => 'Zero-Day Exploit',
            'icon' => 'bug',
            'color' => 'red',
        ],
        'ddos' => [
            'name' => 'DDoS Attack',
            'icon' => 'network',
            'color' => 'orange',
        ],
        'insider_threat' => [
            'name' => 'Insider Threat',
            'icon' => 'user-x',
            'color' => 'amber',
        ],
        'supply_chain' => [
            'name' => 'Supply Chain Compromise',
            'icon' => 'package',
            'color' => 'red',
        ],
        'data_breach' => [
            'name' => 'Data Breach',
            'icon' => 'database',
            'color' => 'red',
        ],
        'malware' => [
            'name' => 'Malware Infection',
            'icon' => 'virus',
            'color' => 'orange',
        ],
        'apt' => [
            'name' => 'Advanced Persistent Threat',
            'icon' => 'skull',
            'color' => 'red',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Scenario Types
    |--------------------------------------------------------------------------
    |
    | Types of scenarios that can be included in simulation modules.
    |
    */

    'scenario_types' => [
        'briefing' => 'Situation Briefing',
        'simulation' => 'Active Simulation',
        'assessment' => 'Knowledge Assessment',
        'decision' => 'Decision Point',
        'debrief' => 'Debrief and Review',
    ],

    /*
    |--------------------------------------------------------------------------
    | Organization Types
    |--------------------------------------------------------------------------
    |
    | Valid organization types for user registration and filtering.
    |
    */

    'organization_types' => [
        'federal' => 'Federal Government',
        'state' => 'State Government',
        'local' => 'Local Government',
        'private' => 'Private Sector',
        'critical_infrastructure' => 'Critical Infrastructure Operator',
        'education' => 'Educational Institution',
        'non_profit' => 'Non-Profit Organization',
    ],

    /*
    |--------------------------------------------------------------------------
    | Organization Sizes
    |--------------------------------------------------------------------------
    */

    'organization_sizes' => [
        'small' => '1-50 employees',
        'medium' => '51-250 employees',
        'large' => '251-1000 employees',
        'enterprise' => '1000+ employees',
    ],

    /*
    |--------------------------------------------------------------------------
    | User Roles
    |--------------------------------------------------------------------------
    |
    | Platform roles with their capabilities and access levels.
    |
    */

    'roles' => [
        'trainee' => [
            'name' => 'Trainee',
            'description' => 'Standard user with access to training modules',
        ],
        'analyst' => [
            'name' => 'Analyst',
            'description' => 'Advanced user with analytics access',
        ],
        'admin' => [
            'name' => 'Administrator',
            'description' => 'Organization administrator',
        ],
        'super_admin' => [
            'name' => 'Super Administrator',
            'description' => 'Platform-wide administrator',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Feature Flags
    |--------------------------------------------------------------------------
    |
    | Enable or disable platform features.
    |
    */

    'features' => [
        'ai_feedback' => env('FEATURE_AI_FEEDBACK', true),
        'adaptive_learning' => env('FEATURE_ADAPTIVE_LEARNING', true),
        'leaderboard' => env('FEATURE_LEADERBOARD', true),
        'achievements' => env('FEATURE_ACHIEVEMENTS', true),
        'team_mode' => env('FEATURE_TEAM_MODE', false),
        'live_exercises' => env('FEATURE_LIVE_EXERCISES', false),
    ],

    /*
    |--------------------------------------------------------------------------
    | Pagination
    |--------------------------------------------------------------------------
    */

    'pagination' => [
        'simulations_per_page' => 12,
        'sessions_per_page' => 10,
        'leaderboard_per_page' => 25,
        'users_per_page' => 20,
    ],

];
