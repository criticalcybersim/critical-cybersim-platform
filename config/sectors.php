<?php

return [

    /*
    |--------------------------------------------------------------------------
    | CISA Critical Infrastructure Sectors
    |--------------------------------------------------------------------------
    |
    | Official CISA-designated critical infrastructure sectors with metadata
    | for the CriticalCyberSim platform. These will be seeded into the
    | database during initial setup.
    |
    | Reference: https://www.cisa.gov/topics/critical-infrastructure-security-and-resilience/critical-infrastructure-sectors
    |
    */

    'sectors' => [
        [
            'name' => 'Energy',
            'slug' => 'energy',
            'cisa_designation' => 'Energy Sector',
            'icon' => 'zap',
            'color' => '#F59E0B',
            'threat_level' => 'critical',
            'description' => 'Electric grid, oil and gas infrastructure, renewable energy systems',
            'key_threats' => [
                'ICS/SCADA attacks',
                'Ransomware targeting operational technology',
                'Physical and cyber convergence attacks',
                'Supply chain vulnerabilities',
            ],
            'regulatory_frameworks' => [
                'NIST SP 800-53',
                'NERC CIP',
                'TSA Pipeline Security',
            ],
            'sort_order' => 1,
        ],
        [
            'name' => 'Healthcare',
            'slug' => 'healthcare',
            'cisa_designation' => 'Healthcare and Public Health Sector',
            'icon' => 'heart-pulse',
            'color' => '#EF4444',
            'threat_level' => 'critical',
            'description' => 'Hospitals, healthcare providers, public health systems, medical devices',
            'key_threats' => [
                'Ransomware attacks on patient care systems',
                'EHR data breaches',
                'Medical device vulnerabilities',
                'COVID-19 related cyber threats',
            ],
            'regulatory_frameworks' => [
                'HIPAA',
                'NIST SP 800-53',
                'FDA Medical Device Security',
            ],
            'sort_order' => 2,
        ],
        [
            'name' => 'Financial Services',
            'slug' => 'financial-services',
            'cisa_designation' => 'Financial Services Sector',
            'icon' => 'landmark',
            'color' => '#10B981',
            'threat_level' => 'critical',
            'description' => 'Banking, securities, insurance, payment systems',
            'key_threats' => [
                'Wire fraud and BEC attacks',
                'ATM and card skimming',
                'DDoS attacks on online services',
                'Cryptocurrency theft',
            ],
            'regulatory_frameworks' => [
                'GLBA',
                'PCI DSS',
                'FFIEC',
                'NIST Cybersecurity Framework',
            ],
            'sort_order' => 3,
        ],
        [
            'name' => 'Transportation',
            'slug' => 'transportation',
            'cisa_designation' => 'Transportation Systems Sector',
            'icon' => 'truck',
            'color' => '#3B82F6',
            'threat_level' => 'high',
            'description' => 'Aviation, rail, maritime, mass transit, highway systems',
            'key_threats' => [
                'GPS spoofing and jamming',
                'Traffic management system attacks',
                'Supply chain disruptions',
                'Autonomous vehicle vulnerabilities',
            ],
            'regulatory_frameworks' => [
                'TSA Security Directives',
                'FAA Cybersecurity',
                'Maritime Transportation Security Act',
            ],
            'sort_order' => 4,
        ],
        [
            'name' => 'Water Systems',
            'slug' => 'water-systems',
            'cisa_designation' => 'Water and Wastewater Systems Sector',
            'icon' => 'droplets',
            'color' => '#06B6D4',
            'threat_level' => 'high',
            'description' => 'Drinking water systems, wastewater treatment facilities',
            'key_threats' => [
                'SCADA system compromises',
                'Chemical process manipulation',
                'Remote access vulnerabilities',
                'Legacy system weaknesses',
            ],
            'regulatory_frameworks' => [
                'Safe Drinking Water Act',
                'America\'s Water Infrastructure Act',
                'NIST SP 800-82',
            ],
            'sort_order' => 5,
        ],
        [
            'name' => 'Communications',
            'slug' => 'communications',
            'cisa_designation' => 'Communications Sector',
            'icon' => 'radio',
            'color' => '#8B5CF6',
            'threat_level' => 'high',
            'description' => 'Telecommunications, internet service providers, satellite communications',
            'key_threats' => [
                'BGP hijacking',
                'SS7 protocol vulnerabilities',
                'DDoS attacks on infrastructure',
                '5G security challenges',
            ],
            'regulatory_frameworks' => [
                'FCC Network Security',
                'CSRIC Best Practices',
                'NIST Cybersecurity Framework',
            ],
            'sort_order' => 6,
        ],
        [
            'name' => 'Government Facilities',
            'slug' => 'government',
            'cisa_designation' => 'Government Facilities Sector',
            'icon' => 'building-2',
            'color' => '#6366F1',
            'threat_level' => 'critical',
            'description' => 'Federal, state, local government buildings and operations',
            'key_threats' => [
                'Nation-state APT campaigns',
                'Insider threats',
                'Physical security convergence',
                'Election infrastructure attacks',
            ],
            'regulatory_frameworks' => [
                'FISMA',
                'FedRAMP',
                'NIST SP 800-53',
                'EO 14028',
            ],
            'sort_order' => 7,
        ],
        [
            'name' => 'Emergency Services',
            'slug' => 'emergency-services',
            'cisa_designation' => 'Emergency Services Sector',
            'icon' => 'siren',
            'color' => '#F97316',
            'threat_level' => 'critical',
            'description' => '911 systems, first responders, emergency management',
            'key_threats' => [
                'CAD system disruptions',
                'Radio system interference',
                'Ransomware on dispatch systems',
                'Swatting and false emergency calls',
            ],
            'regulatory_frameworks' => [
                'NIST Cybersecurity Framework',
                'DHS CISA Guidelines',
            ],
            'sort_order' => 8,
        ],
        [
            'name' => 'Defense Industrial Base',
            'slug' => 'defense',
            'cisa_designation' => 'Defense Industrial Base Sector',
            'icon' => 'shield',
            'color' => '#84CC16',
            'threat_level' => 'critical',
            'description' => 'Defense contractors, weapons systems, military technology',
            'key_threats' => [
                'IP theft and espionage',
                'Supply chain compromises',
                'APT targeting defense secrets',
                'Contractor network breaches',
            ],
            'regulatory_frameworks' => [
                'CMMC',
                'DFARS',
                'NIST SP 800-171',
                'ITAR',
            ],
            'sort_order' => 9,
        ],
        [
            'name' => 'Chemical',
            'slug' => 'chemical',
            'cisa_designation' => 'Chemical Sector',
            'icon' => 'flask-conical',
            'color' => '#EC4899',
            'threat_level' => 'high',
            'description' => 'Chemical manufacturing, distribution, and storage facilities',
            'key_threats' => [
                'Process control system attacks',
                'Safety system manipulation',
                'Toxic release scenarios',
                'Supply chain targeting',
            ],
            'regulatory_frameworks' => [
                'CFATS',
                'NIST SP 800-82',
                'Chemical Facility Anti-Terrorism Standards',
            ],
            'sort_order' => 10,
        ],
        [
            'name' => 'Food and Agriculture',
            'slug' => 'food-agriculture',
            'cisa_designation' => 'Food and Agriculture Sector',
            'icon' => 'wheat',
            'color' => '#A3E635',
            'threat_level' => 'high',
            'description' => 'Food production, processing, distribution, and agriculture',
            'key_threats' => [
                'Supply chain disruptions',
                'Food processing system attacks',
                'Agricultural IoT vulnerabilities',
                'Contamination threats',
            ],
            'regulatory_frameworks' => [
                'FDA FSMA',
                'USDA Security Guidelines',
                'NIST Cybersecurity Framework',
            ],
            'sort_order' => 11,
        ],
        [
            'name' => 'Critical Manufacturing',
            'slug' => 'manufacturing',
            'cisa_designation' => 'Critical Manufacturing Sector',
            'icon' => 'factory',
            'color' => '#FB923C',
            'threat_level' => 'high',
            'description' => 'Primary metals, machinery, electrical equipment, transportation manufacturing',
            'key_threats' => [
                'Industrial control system attacks',
                'IP theft from production systems',
                'Ransomware on manufacturing lines',
                'Supply chain compromises',
            ],
            'regulatory_frameworks' => [
                'NIST SP 800-82',
                'ISA/IEC 62443',
                'NIST Cybersecurity Framework',
            ],
            'sort_order' => 12,
        ],
        [
            'name' => 'Nuclear',
            'slug' => 'nuclear',
            'cisa_designation' => 'Nuclear Reactors, Materials, and Waste Sector',
            'icon' => 'atom',
            'color' => '#FDE047',
            'threat_level' => 'critical',
            'description' => 'Nuclear power plants, nuclear materials, radioactive waste',
            'key_threats' => [
                'Safety system cyber attacks',
                'Stuxnet-style attacks',
                'Nuclear material tracking compromise',
                'Insider threats',
            ],
            'regulatory_frameworks' => [
                'NRC Cybersecurity',
                'NIST SP 800-82',
                '10 CFR 73.54',
            ],
            'sort_order' => 13,
        ],
        [
            'name' => 'Dams',
            'slug' => 'dams',
            'cisa_designation' => 'Dams Sector',
            'icon' => 'waves',
            'color' => '#67E8F9',
            'threat_level' => 'high',
            'description' => 'Dam infrastructure for water retention, hydroelectric power, flood control',
            'key_threats' => [
                'SCADA system compromises',
                'Flood gate manipulation',
                'Hydroelectric disruption',
                'Physical-cyber convergence',
            ],
            'regulatory_frameworks' => [
                'Dam Safety Act',
                'NIST SP 800-82',
                'FERC Cybersecurity',
            ],
            'sort_order' => 14,
        ],
        [
            'name' => 'Information Technology',
            'slug' => 'it-infrastructure',
            'cisa_designation' => 'Information Technology Sector',
            'icon' => 'server',
            'color' => '#A78BFA',
            'threat_level' => 'critical',
            'description' => 'Cloud services, data centers, software vendors, IT service providers',
            'key_threats' => [
                'Supply chain attacks (SolarWinds-style)',
                'Cloud infrastructure breaches',
                'Zero-day vulnerabilities',
                'Managed service provider compromises',
            ],
            'regulatory_frameworks' => [
                'FedRAMP',
                'ISO 27001',
                'SOC 2',
                'NIST SP 800-53',
            ],
            'sort_order' => 15,
        ],
        [
            'name' => 'Commercial Facilities',
            'slug' => 'commercial-facilities',
            'cisa_designation' => 'Commercial Facilities Sector',
            'icon' => 'store',
            'color' => '#34D399',
            'threat_level' => 'medium',
            'description' => 'Entertainment venues, sports stadiums, shopping centers, lodging',
            'key_threats' => [
                'POS system breaches',
                'Physical security system hacks',
                'Payment card theft',
                'Public safety system compromise',
            ],
            'regulatory_frameworks' => [
                'PCI DSS',
                'NIST Cybersecurity Framework',
            ],
            'sort_order' => 16,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Threat Level Colors
    |--------------------------------------------------------------------------
    */

    'threat_levels' => [
        'critical' => [
            'color' => 'red',
            'badge' => 'Critical',
            'description' => 'Highest priority for national security',
        ],
        'high' => [
            'color' => 'orange',
            'badge' => 'High',
            'description' => 'Significant threats requiring attention',
        ],
        'medium' => [
            'color' => 'yellow',
            'badge' => 'Medium',
            'description' => 'Moderate threat level',
        ],
        'low' => [
            'color' => 'green',
            'badge' => 'Low',
            'description' => 'Lower priority threats',
        ],
    ],

];
