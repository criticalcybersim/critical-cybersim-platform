<?php

return [

    /*
    |--------------------------------------------------------------------------
    | NIST SP 800-53 Control Families
    |--------------------------------------------------------------------------
    |
    | Control families from NIST Special Publication 800-53 Revision 5.
    | These are used to categorize and map simulation modules to specific
    | security controls.
    |
    | Reference: https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final
    |
    */

    'control_families' => [
        'AC' => [
            'name' => 'Access Control',
            'description' => 'Controls to limit information system access to authorized users, processes, or devices',
            'color' => '#3B82F6',
            'icon' => 'lock',
        ],
        'AT' => [
            'name' => 'Awareness and Training',
            'description' => 'Controls to ensure personnel are trained on cybersecurity responsibilities',
            'color' => '#8B5CF6',
            'icon' => 'graduation-cap',
        ],
        'AU' => [
            'name' => 'Audit and Accountability',
            'description' => 'Controls to create, protect, and retain audit records',
            'color' => '#06B6D4',
            'icon' => 'file-text',
        ],
        'CA' => [
            'name' => 'Assessment, Authorization, and Monitoring',
            'description' => 'Controls for security assessment and authorization',
            'color' => '#10B981',
            'icon' => 'clipboard-check',
        ],
        'CM' => [
            'name' => 'Configuration Management',
            'description' => 'Controls to establish and maintain baseline configurations',
            'color' => '#F59E0B',
            'icon' => 'settings',
        ],
        'CP' => [
            'name' => 'Contingency Planning',
            'description' => 'Controls for incident response and business continuity',
            'color' => '#EF4444',
            'icon' => 'life-buoy',
        ],
        'IA' => [
            'name' => 'Identification and Authentication',
            'description' => 'Controls to identify and authenticate users and devices',
            'color' => '#6366F1',
            'icon' => 'user-check',
        ],
        'IR' => [
            'name' => 'Incident Response',
            'description' => 'Controls for detecting, reporting, and responding to cybersecurity incidents',
            'color' => '#EC4899',
            'icon' => 'alert-triangle',
        ],
        'MA' => [
            'name' => 'Maintenance',
            'description' => 'Controls for system maintenance and tools',
            'color' => '#84CC16',
            'icon' => 'wrench',
        ],
        'MP' => [
            'name' => 'Media Protection',
            'description' => 'Controls for protecting digital and non-digital media',
            'color' => '#14B8A6',
            'icon' => 'hard-drive',
        ],
        'PE' => [
            'name' => 'Physical and Environmental Protection',
            'description' => 'Controls for physical access and environmental controls',
            'color' => '#F97316',
            'icon' => 'building',
        ],
        'PL' => [
            'name' => 'Planning',
            'description' => 'Controls for security and privacy planning',
            'color' => '#A78BFA',
            'icon' => 'map',
        ],
        'PM' => [
            'name' => 'Program Management',
            'description' => 'Controls for organization-wide information security program',
            'color' => '#FB923C',
            'icon' => 'briefcase',
        ],
        'PS' => [
            'name' => 'Personnel Security',
            'description' => 'Controls for personnel screening and termination',
            'color' => '#34D399',
            'icon' => 'users',
        ],
        'PT' => [
            'name' => 'Personally Identifiable Information Processing',
            'description' => 'Controls for processing PII',
            'color' => '#FDE047',
            'icon' => 'user-shield',
        ],
        'RA' => [
            'name' => 'Risk Assessment',
            'description' => 'Controls for assessing and managing organizational risk',
            'color' => '#DC2626',
            'icon' => 'activity',
        ],
        'SA' => [
            'name' => 'System and Services Acquisition',
            'description' => 'Controls for acquiring systems and services securely',
            'color' => '#7C3AED',
            'icon' => 'shopping-cart',
        ],
        'SC' => [
            'name' => 'System and Communications Protection',
            'description' => 'Controls to monitor and control communications',
            'color' => '#059669',
            'icon' => 'shield-check',
        ],
        'SI' => [
            'name' => 'System and Information Integrity',
            'description' => 'Controls for identifying and handling information system flaws',
            'color' => '#DC2626',
            'icon' => 'shield-alert',
        ],
        'SR' => [
            'name' => 'Supply Chain Risk Management',
            'description' => 'Controls for managing supply chain risks',
            'color' => '#EA580C',
            'icon' => 'truck',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Impact Levels
    |--------------------------------------------------------------------------
    |
    | NIST defines three impact levels for security controls based on the
    | potential impact of security breaches.
    |
    */

    'impact_levels' => [
        'low' => [
            'name' => 'Low',
            'description' => 'Limited adverse effect on operations, assets, or individuals',
            'color' => 'emerald',
        ],
        'moderate' => [
            'name' => 'Moderate',
            'description' => 'Serious adverse effect on operations, assets, or individuals',
            'color' => 'orange',
        ],
        'high' => [
            'name' => 'High',
            'description' => 'Severe or catastrophic adverse effect',
            'color' => 'red',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Zero Trust Architecture Principles (NIST SP 800-207)
    |--------------------------------------------------------------------------
    |
    | Core tenets of Zero Trust Architecture from NIST SP 800-207.
    |
    */

    'zero_trust_tenets' => [
        'verify_explicitly' => 'Always authenticate and authorize based on all available data points',
        'least_privilege' => 'Limit user access with Just-In-Time and Just-Enough-Access',
        'assume_breach' => 'Minimize blast radius and segment access',
        'inspect_encrypt' => 'Encrypt all communications and inspect all traffic',
        'verify_devices' => 'Use device health and compliance as a condition of access',
        'continuous_monitoring' => 'Continuously monitor and measure security posture',
        'dynamic_policy' => 'Use dynamic policies based on real-time assessment',
    ],

    /*
    |--------------------------------------------------------------------------
    | NIST Cybersecurity Framework Functions
    |--------------------------------------------------------------------------
    |
    | The five core functions of the NIST Cybersecurity Framework.
    |
    */

    'csf_functions' => [
        'identify' => [
            'name' => 'Identify',
            'description' => 'Develop organizational understanding to manage cybersecurity risk',
            'icon' => 'search',
            'color' => 'blue',
        ],
        'protect' => [
            'name' => 'Protect',
            'description' => 'Develop and implement safeguards to ensure delivery of services',
            'icon' => 'shield',
            'color' => 'green',
        ],
        'detect' => [
            'name' => 'Detect',
            'description' => 'Develop and implement activities to identify cybersecurity events',
            'icon' => 'radar',
            'color' => 'yellow',
        ],
        'respond' => [
            'name' => 'Respond',
            'description' => 'Develop and implement activities to take action on detected events',
            'icon' => 'alert-circle',
            'color' => 'orange',
        ],
        'recover' => [
            'name' => 'Recover',
            'description' => 'Develop and implement activities to restore capabilities',
            'icon' => 'refresh-cw',
            'color' => 'purple',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | NICE Framework Work Roles
    |--------------------------------------------------------------------------
    |
    | Subset of NIST NICE Framework work roles relevant to training.
    |
    */

    'nice_work_roles' => [
        'SP-DEF-001' => 'Cyber Defense Analyst',
        'SP-DEF-002' => 'Cyber Defense Incident Responder',
        'SP-DEF-003' => 'Cyber Defense Infrastructure Support Specialist',
        'OM-DTA-001' => 'Data Analyst',
        'OM-DTA-002' => 'Database Administrator',
        'PR-CDA-001' => 'Cyber Operator',
        'PR-INF-001' => 'Cyber Intel Planner',
        'AN-ASA-001' => 'Threat/Warning Analyst',
        'OV-MGT-001' => 'Information Systems Security Manager',
        'OV-MGT-002' => 'Communications Security Manager',
    ],

];
