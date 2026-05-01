<?php

namespace Database\Seeders;

use App\Models\Sector;
use App\Models\SimulationModule;
use App\Models\TrainingScenario;
use Illuminate\Database\Seeder;

class ComprehensiveTrainingSeeder extends Seeder
{
    /**
     * Seed realistic training scenarios for demo purposes.
     */
    public function run(): void
    {
        // Energy Sector - Power Grid Security
        $energySector = Sector::where('slug', 'energy')->first();
        if ($energySector) {
            $powerGridModule = SimulationModule::create([
                'title' => 'Critical Power Grid Cyber Defense',
                'slug' => 'power-grid-cyber-defense',
                'description' => 'Learn to defend power grid SCADA systems against cyber attacks including malware, ransomware, and nation-state threats.',
                'sector_id' => $energySector->id,
                'difficulty_level' => 'intermediate',
                'estimated_duration_minutes' => 45,
                'attack_type' => 'malware',
                'points_reward' => 300,
                'learning_objectives' => [
                    'Identify SCADA system vulnerabilities',
                    'Implement ICS security controls',
                    'Respond to grid manipulation attempts',
                    'Apply NIST framework to energy infrastructure',
                ],
                'prerequisites' => ['Basic networking knowledge', 'Understanding of SCADA systems'],
                'is_published' => true,
                'is_featured' => true,
            ]);

            // Scenario 1: Initial Threat Detection
            TrainingScenario::create([
                'title' => 'Anomalous SCADA Traffic Detected',
                'module_id' => $powerGridModule->id,
                'order_number' => 1,
                'scenario_type' => 'detection',
                'content' => "You are a cybersecurity analyst monitoring a regional power grid's SCADA network. At 14:23 EST, your intrusion detection system flags unusual traffic patterns from an external IP address attempting to communicate with multiple RTU (Remote Terminal Units) controllers.\n\nThreat Intelligence indicates this IP has been associated with APT groups targeting critical infrastructure. The connection attempts are using non-standard protocols and appear to be probing for vulnerabilities.",
                'choices' => [
                    ['id' => 'isolate', 'title' => 'Immediately isolate affected RTUs', 'description' => 'Disconnect suspicious RTUs from network', 'impact' => 'high_security'],
                    ['id' => 'monitor', 'title' => 'Continue monitoring and gather intel', 'description' => 'Allow connection to learn attack vector', 'impact' => 'high_risk'],
                    ['id' => 'block_ip', 'title' => 'Block source IP at firewall', 'description' => 'Prevent further connection attempts', 'impact' => 'medium_security'],
                    ['id' => 'notify', 'title' => 'Notify leadership before action', 'description' => 'Escalate and await guidance', 'impact' => 'time_loss'],
                ],
                'correct_actions' => ['block_ip', 'isolate'],
                'max_score' => 100,
                'time_limit_seconds' => 180,
                'is_critical' => true,
            ]);

            // Scenario 2: Malware Analysis
            TrainingScenario::create([
                'title' => 'Suspicious File in Engineering Workstation',
                'module_id' => $powerGridModule->id,
                'order_number' => 2,
                'scenario_type' => 'analysis',
                'content' => "A engineer workstation has been flagged by antivirus software. A file named 'scada_update_v2.3.exe' was downloaded via email attachment. Initial analysis shows:\n\n- File is digitally signed but certificate is expired\n- Attempts to communicate with C2 server in Eastern Europe\n- Tries to modify PLC ladder logic files\n- Has encryption capabilities\n\nThis matches characteristics of BlackEnergy malware used in previous grid attacks.",
                'choices' => json_encode([
                    ['id' => 'quarantine', 'title' => 'Quarantine workstation immediately', 'description' => 'Isolate infected system', 'impact' => 'prevents_spread'],
                    ['id' => 'sandbox', 'title' => 'Move to sandbox for analysis', 'description' => 'Safely analyze malware behavior', 'impact' => 'intelligence_gain'],
                    ['id' => 'delete', 'title' => 'Delete file and continue monitoring', 'description' => 'Remove threat', 'impact' => 'evidence_loss'],
                    ['id' => 'restore', 'title' => 'Restore system from backup', 'description' => 'Clean slate approach', 'impact' => 'data_loss'],
                ]),
                'correct_actions' => json_encode(['quarantine', 'sandbox']),
                'max_score' => 100,
                'time_limit_seconds' => 240,
                'is_critical' => true,
            ]);

            // Scenario 3: Incident Response
            TrainingScenario::create([
                'title' => 'Load Frequency Manipulation Detected',
                'module_id' => $powerGridModule->id,
                'order_number' => 3,
                'scenario_type' => 'response',
                'content' => "URGENT: Your SCADA monitoring system shows unauthorized changes to load frequency setpoints across 3 substations. The changes are causing grid instability:\n\n- Frequency oscillating between 59.2-60.8 Hz (normal: 60 Hz)\n- Load shedding protocols triggered\n- 45,000 customers affected\n- Attack appears coordinated\n\nYou have limited time before potential cascading failure affects entire region.",
                'choices' => json_encode([
                    ['id' => 'manual_override', 'title' => 'Switch to manual control', 'description' => 'Take human control of grid management', 'impact' => 'stabilizes_grid'],
                    ['id' => 'emergency_shutdown', 'title' => 'Initiate emergency shutdown', 'description' => 'Controlled blackout to prevent damage', 'impact' => 'safe_but_disruptive'],
                    ['id' => 'trace_attack', 'title' => 'Trace attack source first', 'description' => 'Identify attacker before responding', 'impact' => 'cascading_failure_risk'],
                    ['id' => 'contact_cisa', 'title' => 'Contact CISA for guidance', 'description' => 'Get federal assistance', 'impact' => 'time_delay'],
                ]),
                'correct_actions' => json_encode(['manual_override']),
                'max_score' => 100,
                'time_limit_seconds' => 120,
                'is_critical' => true,
            ]);
        }

        // Healthcare Sector - Hospital Ransomware Response
        $healthcareSector = Sector::where('slug', 'healthcare')->first();
        if ($healthcareSector) {
            $hospitalModule = SimulationModule::create([
                'title' => 'Hospital Ransomware Incident Response',
                'slug' => 'hospital-ransomware-response',
                'description' => 'Respond to a critical ransomware attack on hospital systems affecting patient care systems, EHR, and medical devices.',
                'sector_id' => $healthcareSector->id,
                'difficulty_level' => 'advanced',
                'estimated_duration_minutes' => 60,
                'attack_type' => 'ransomware',
                'points_reward' => 350,
                'learning_objectives' => [
                    'Execute ransomware incident response procedures',
                    'Prioritize patient safety in cyber incidents',
                    'Manage healthcare system recovery',
                    'Comply with HIPAA during security incidents',
                ],
                'prerequisites' => ['Healthcare IT knowledge', 'Incident response fundamentals', 'HIPAA compliance basics'],
                'is_published' => true,
                'is_featured' => false,
            ]);

            TrainingScenario::create([
                'title' => 'Ryuk Ransomware Detected on EHR System',
                'module_id' => $hospitalModule->id,
                'order_number' => 1,
                'scenario_type' => 'critical_incident',
                'content' => "At 03:45 AM, the NOC receives alerts that the Electronic Health Records (EHR) system is encrypting files. Ransomware has spread to:\n\n- Main EHR database servers\n- 47 nursing workstations\n- Laboratory information system\n- Pharmacy management system\n\nPatient records are being encrypted. The hospital has 312 admitted patients including 12 in ICU. A ransom note demands 45 Bitcoin ($2.1M) with 48-hour deadline.\n\nER is currently receiving an ambulance with trauma patient ETA 8 minutes.",
                'choices' => json_encode([
                    ['id' => 'segment_network', 'title' => 'Emergency network segmentation', 'description' => 'Isolate infected systems immediately', 'impact' => 'contains_spread'],
                    ['id' => 'activate_downtime', 'title' => 'Activate downtime procedures', 'description' => 'Switch to paper-based patient care', 'impact' => 'maintains_patient_care'],
                    ['id' => 'contact_fbi', 'title' => 'Notify FBI immediately', 'description' => 'Get law enforcement involved', 'impact' => 'legal_requirement'],
                    ['id' => 'restore_backups', 'title' => 'Begin backup restoration', 'description' => 'Start recovery process', 'impact' => 'recovery_start'],
                ]),
                'correct_actions' => json_encode(['segment_network', 'activate_downtime', 'contact_fbi']),
                'max_score' => 100,
                'time_limit_seconds' => 180,
                'is_critical' => true,
            ]);

            TrainingScenario::create([
                'title' => 'Medical Device Network Compromise',
                'module_id' => $hospitalModule->id,
                'order_number' => 2,
                'scenario_type' => 'medical_safety',
                'content' => "While containing the ransomware, your team discovers the attack also affected the medical device network (MDN). Potentially compromised devices include:\n\n- 23 infusion pumps (some actively delivering medications)\n- 8 patient monitors in ICU\n- 2 ventilators\n- 15 defibrillators\n\nYou cannot immediately determine if devices are compromised or functioning correctly. Clinical engineering is overwhelmed.",
                'choices' => json_encode([
                    ['id' => 'emergency_checks', 'title' => 'Emergency clinical verification', 'description' => 'Manually verify critical devices', 'impact' => 'patient_safety'],
                    ['id' => 'isolate_mdn', 'title' => 'Isolate entire MDN', 'description' => 'Disconnect all medical devices', 'impact' => 'care_disruption'],
                    ['id' => 'replace_critical', 'title' => 'Replace ICU devices with backups', 'description' => 'Swap suspected compromised devices', 'impact' => 'resource_intensive'],
                    ['id' => 'continue_use', 'title' => 'Continue monitoring devices', 'description' => 'No immediate action', 'impact' => 'patient_risk'],
                ]),
                'correct_actions' => json_encode(['emergency_checks', 'replace_critical']),
                'max_score' => 100,
                'time_limit_seconds' => 150,
                'is_critical' => true,
            ]);
        }

        // Water Sector - Treatment Plant Attack
        $waterSector = Sector::where('slug', 'water')->first();
        if ($waterSector) {
            $waterModule = SimulationModule::create([
                'title' => 'Water Treatment Facility Cyber Attack',
                'slug' => 'water-treatment-cyber-attack',
                'description' => 'Defend water treatment SCADA systems against attacks attempting to manipulate chemical dosing and contaminate water supply.',
                'sector_id' => $waterSector->id,
                'difficulty_level' => 'advanced',
                'estimated_duration_minutes' => 50,
                'attack_type' => 'sabotage',
                'points_reward' => 400,
                'learning_objectives' => [
                    'Secure water treatment control systems',
                    'Detect chemical manipulation attempts',
                    'Implement ICS security for water utilities',
                    'Coordinate with EPA and public health',
                ],
                'prerequisites' => ['Water treatment process knowledge', 'SCADA security fundamentals'],
                'is_published' => true,
                'is_featured' => true,
            ]);

            TrainingScenario::create([
                'title' => 'Unauthorized Access to Chlorine Dosing Controls',
                'module_id' => $waterModule->id,
                'order_number' => 1,
                'scenario_type' => 'access_breach',
                'content' => "Security logs show unauthorized access to the water treatment plant's HMI (Human-Machine Interface) at 02:17 AM. The attacker accessed:\n\n- Chlorine dosing controls\n- pH adjustment systems\n- Flow rate controls\n\nThe facility serves 150,000 residents. Current chlorine levels have been increased to 11 ppm (safe range: 0.2-4 ppm). Water is currently in distribution system pipes heading to homes.\n\nAuthentication logs show access came from a valid operator credential that was stolen 3 weeks ago (account was not disabled).",
                'choices' => json_encode([
                    ['id' => 'emergency_shutoff', 'title' => 'Emergency chlorine shutoff', 'description' => 'Stop chemical feed immediately', 'impact' => 'prevents_harm'],
                    ['id' => 'flush_system', 'title' => 'Activate distribution flushing', 'description' => 'Flush contaminated water from pipes', 'impact' => 'removes_contamination'],
                    ['id' => 'public_alert', 'title' => 'Issue do-not-consume alert', 'description' => 'Warn public immediately', 'impact' => 'public_safety'],
                    ['id' => 'investigate_first', 'title' => 'Investigate extent before action', 'description' => 'Assess full situation', 'impact' => 'exposure_continues'],
                ]),
                'correct_actions' => json_encode(['emergency_shutoff', 'flush_system', 'public_alert']),
                'max_score' => 100,
                'time_limit_seconds' => 90,
                'is_critical' => true,
            ]);
        }

        // Financial Sector - Banking Infrastructure
        $financialSector = Sector::where('slug', 'financial-services')->first();
        if ($financialSector) {
            $bankingModule = SimulationModule::create([
                'title' => 'Banking Infrastructure DDoS Defense',
                'slug' => 'banking-ddos-defense',
                'description' => 'Defend critical banking infrastructure against sophisticated DDoS attacks targeting online banking, ATM networks, and payment processing.',
                'sector_id' => $financialSector->id,
                'difficulty_level' => 'intermediate',
                'estimated_duration_minutes' => 40,
                'attack_type' => 'ddos',
                'points_reward' => 250,
                'learning_objectives' => [
                    'Implement DDoS mitigation strategies',
                    'Maintain financial service availability',
                    'Coordinate with Treasury and FinCEN',
                    'Manage customer communications during attacks',
                ],
                'prerequisites' => ['Network security basics', 'Banking system fundamentals'],
                'is_published' => true,
                'is_featured' => false,
            ]);

            TrainingScenario::create([
                'title' => 'Massive DDoS Attack on Online Banking',
                'module_id' => $bankingModule->id,
                'order_number' => 1,
                'scenario_type' => 'availability_attack',
                'content' => "Your bank's online banking platform is under massive DDoS attack:\n\n- Traffic volume: 450 Gbps (normal: 12 Gbps)\n- Attack sources: 125,000 compromised IoT devices (botnet)\n- Customer login page completely unavailable\n- Mobile app also affected\n- ATM network showing degraded performance\n\nIt's Friday afternoon - peak banking hours. Social media complaints flooding in. Local news picking up the story. Attack has been ongoing for 18 minutes.",
                'choices' => json_encode([
                    ['id' => 'activate_cdn', 'title' => 'Activate CDN DDoS protection', 'description' => 'Route through scrubbing center', 'impact' => 'mitigates_attack'],
                    ['id' => 'rate_limiting', 'title' => 'Implement aggressive rate limiting', 'description' => 'Limit connection attempts', 'impact' => 'partial_mitigation'],
                    ['id' => 'backup_datacenter', 'title' => 'Failover to backup datacenter', 'description' => 'Switch to alternate infrastructure', 'impact' => 'restores_service'],
                    ['id' => 'wait_it_out', 'title' => 'Wait for attack to subside', 'description' => 'No action - monitor', 'impact' => 'continued_outage'],
                ]),
                'correct_actions' => json_encode(['activate_cdn', 'backup_datacenter']),
                'max_score' => 100,
                'time_limit_seconds' => 120,
                'is_critical' => false,
            ]);
        }

        // Transportation Sector - Airport Operations
        $transportSector = Sector::where('slug', 'transportation')->first();
        if ($transportSector) {
            $airportModule = SimulationModule::create([
                'title' => 'Airport Operations Cyber Defense',
                'slug' => 'airport-cyber-defense',
                'description' => 'Protect airport operations systems including air traffic management, baggage handling, and passenger information systems from cyber attacks.',
                'sector_id' => $transportSector->id,
                'difficulty_level' => 'advanced',
                'estimated_duration_minutes' => 55,
                'attack_type' => 'ransomware',
                'points_reward' => 325,
                'learning_objectives' => [
                    'Secure aviation operational technology',
                    'Protect air traffic safety systems',
                    'Manage airport cyber incidents',
                    'Coordinate with TSA and FAA',
                ],
                'prerequisites' => ['Aviation systems knowledge', 'OT security fundamentals'],
                'is_published' => true,
                'is_featured' => false,
            ]);

            TrainingScenario::create([
                'title' => 'Baggage Handling System Compromised',
                'module_id' => $airportModule->id,
                'order_number' => 1,
                'scenario_type' => 'ot_compromise',
                'content' => "The airport's automated baggage handling system has been compromised by ransomware:\n\n- 3 of 4 baggage sorting lines are down\n- Conveyor systems frozen mid-operation\n- Bag tracking system encrypted\n- 127 flights scheduled today (58,000 passengers)\n- Peak departure period starts in 2 hours\n\nManual baggage handling would take 10x longer. Several international flights cannot depart without matching passengers to checked bags (security requirement).",
                'choices' => json_encode([
                    ['id' => 'manual_processing', 'title' => 'Switch to manual baggage processing', 'description' => 'Labor-intensive but functional', 'impact' => 'maintains_operations'],
                    ['id' => 'delay_flights', 'title' => 'Delay all affected flights', 'description' => 'Buy time to restore systems', 'impact' => 'passenger_disruption'],
                    ['id' => 'pay_ransom', 'title' => 'Consider paying ransom', 'description' => 'Quick restoration possibility', 'impact' => 'funds_criminals'],
                    ['id' => 'restore_from_backup', 'title' => 'Emergency backup restoration', 'description' => 'Restore systems (4-6 hours)', 'impact' => 'extended_delays'],
                ]),
                'correct_actions' => json_encode(['manual_processing', 'restore_from_backup']),
                'max_score' => 100,
                'time_limit_seconds' => 180,
                'is_critical' => false,
            ]);
        }

        $this->command->info('Comprehensive training scenarios seeded successfully!');
    }
}
