<?php

namespace Database\Seeders;

use App\Models\NistControl;
use App\Models\Sector;
use App\Models\SimulationModule;
use App\Models\TrainingScenario;
use Illuminate\Database\Seeder;

class SimulationModuleSeeder extends Seeder
{
    public function run(): void
    {
        // Module 1: Colonial Pipeline Ransomware Response
        $energySector = Sector::where('slug', 'energy')->first();
        $colonialPipeline = SimulationModule::create([
            'title' => 'Colonial Pipeline Ransomware Response Simulation',
            'slug' => 'colonial-pipeline-ransomware-response',
            'description' => 'Experience a realistic simulation of the 2021 Colonial Pipeline ransomware attack. Learn incident response, business continuity, and recovery strategies for critical energy infrastructure.',
            'learning_objectives' => [
                'Identify indicators of ransomware compromise in OT environments',
                'Execute proper incident response procedures for critical infrastructure',
                'Make strategic decisions under pressure',
                'Coordinate with federal agencies (CISA, FBI, DOE)',
                'Balance operational continuity with cybersecurity containment',
            ],
            'sector_id' => $energySector->id,
            'difficulty_level' => 'advanced',
            'estimated_duration_minutes' => 90,
            'points_reward' => 500,
            'attack_type' => 'ransomware',
            'is_published' => true,
            'is_featured' => true,
        ]);

        // Attach NIST controls to Colonial Pipeline module
        $colonialPipeline->nistControls()->attach([
            NistControl::where('control_id', 'IR-4')->first()->id,
            NistControl::where('control_id', 'IR-6')->first()->id,
            NistControl::where('control_id', 'IR-8')->first()->id,
            NistControl::where('control_id', 'SI-4')->first()->id,
            NistControl::where('control_id', 'AC-2')->first()->id,
        ]);

        // Scenarios for Colonial Pipeline
        TrainingScenario::create([
            'title' => 'Initial Alert and Discovery',
            'module_id' => $colonialPipeline->id,
            'order_number' => 1,
            'scenario_type' => 'briefing',
            'content' => "**Friday, May 7, 2021 - 5:47 AM EDT**\n\nYou are the Chief Information Security Officer at Colonial Pipeline, the largest fuel pipeline in the United States, transporting 2.5 million barrels per day.\n\nYour security team has just detected unusual encrypted files appearing on IT systems. File names are being changed to include '.darkside' extensions. Several employees report seeing ransom notes on their workstations.\n\nInitial investigation reveals:\n- Multiple systems across corporate IT network showing encryption activity\n- VPN access logs show suspicious login from legacy account\n- Ransomware appears to be DarkSide variant\n- **Critical Question:** Has the ransomware reached OT/SCADA systems controlling the pipeline?\n\nYou must act quickly. The pipeline operations team is asking if they should continue operations.",
            'max_score' => 100,
        ]);

        TrainingScenario::create([
            'title' => 'Immediate Response Decision',
            'module_id' => $colonialPipeline->id,
            'order_number' => 2,
            'scenario_type' => 'decision',
            'content' => "**Immediate Action Required**\n\nYour incident response team has confirmed ransomware in IT systems. The Operations Technology (OT) network controlling pipeline operations appears unaffected so far, but you don't have complete visibility.\n\nWhat is your immediate response?",
            'choices' => [
                [
                    'id' => 'A',
                    'title' => 'Shut Down the Entire Pipeline Immediately',
                    'description' => 'Halt all pipeline operations as a precautionary measure while investigating. This prevents potential ransomware spread to OT systems.',
                    'points' => 100,
                    'is_correct' => true,
                    'feedback' => 'Correct decision. Colonial Pipeline executives made this difficult choice, prioritizing safety and preventing potential ransomware spread to operational systems. This was the right call despite massive economic impact.',
                ],
                [
                    'id' => 'B',
                    'title' => 'Continue Operations, Isolate IT Systems',
                    'description' => 'Keep the pipeline running while containing the ransomware to IT systems only. Segment networks and monitor OT closely.',
                    'points' => 40,
                    'is_correct' => false,
                    'feedback' => 'Too risky. Without complete visibility into ransomware spread and potential lateral movement to OT systems, continuing operations could result in catastrophic safety incidents or loss of control over pipeline operations.',
                ],
                [
                    'id' => 'C',
                    'title' => 'Pay the Ransom Immediately',
                    'description' => 'Negotiate with attackers and pay ransom to get decryption keys quickly and restore operations.',
                    'points' => 0,
                    'is_correct' => false,
                    'feedback' => 'Premature decision. You must first assess scope, notify authorities, and execute containment. Paying ransom funds criminal enterprises, may not guarantee decryption, and should only be considered after exhausting other options.',
                ],
                [
                    'id' => 'D',
                    'title' => 'Wait for More Information',
                    'description' => 'Gather more intelligence before making operational decisions. Continue monitoring while investigating.',
                    'points' => 20,
                    'is_correct' => false,
                    'feedback' => 'Too slow. In a ransomware incident affecting critical infrastructure, delayed response allows further spread and increases risk. Decisive action is needed when operations could be compromised.',
                ],
            ],
            'correct_actions' => ['A'],
            'max_score' => 100,
            'is_critical' => true,
        ]);

        TrainingScenario::create([
            'title' => 'Federal Notification and Coordination',
            'module_id' => $colonialPipeline->id,
            'order_number' => 3,
            'scenario_type' => 'assessment',
            'content' => "You've shut down the pipeline. Now you must notify federal authorities as required for critical infrastructure incidents.\n\n**Which agencies must be notified immediately?** (Select all that apply)",
            'choices' => [
                ['id' => 'CISA', 'label' => 'CISA (Cybersecurity and Infrastructure Security Agency)', 'correct' => true],
                ['id' => 'FBI', 'label' => 'FBI (Federal Bureau of Investigation)', 'correct' => true],
                ['id' => 'DOE', 'label' => 'DOE (Department of Energy)', 'correct' => true],
                ['id' => 'DHS', 'label' => 'DHS (Department of Homeland Security)', 'correct' => true],
                ['id' => 'SEC', 'label' => 'SEC (Securities and Exchange Commission)', 'correct' => false],
                ['id' => 'CDC', 'label' => 'CDC (Centers for Disease Control)', 'correct' => false],
            ],
            'max_score' => 100,
        ]);

        // Module 2: Healthcare Ransomware Attack
        $healthcareSector = Sector::where('slug', 'healthcare')->first();
        $hospitalEHR = SimulationModule::create([
            'title' => 'Hospital EHR Ransomware Attack Simulation',
            'slug' => 'hospital-ehr-ransomware-attack',
            'description' => 'Navigate a ransomware attack on a hospital\'s Electronic Health Records system. Balance patient safety, HIPAA compliance, incident response, and operational continuity during an active cyberattack.',
            'learning_objectives' => [
                'Execute healthcare-specific incident response procedures',
                'Protect patient safety during cyber incidents',
                'Maintain HIPAA compliance during breach response',
                'Coordinate with HHS, FBI, and state health departments',
                'Manage crisis communications with patients and media',
            ],
            'sector_id' => $healthcareSector->id,
            'difficulty_level' => 'advanced',
            'estimated_duration_minutes' => 75,
            'points_reward' => 450,
            'attack_type' => 'ransomware',
            'is_published' => true,
            'is_featured' => true,
        ]);

        $hospitalEHR->nistControls()->attach([
            NistControl::where('control_id', 'IR-4')->first()->id,
            NistControl::where('control_id', 'SI-4')->first()->id,
            NistControl::where('control_id', 'AC-2')->first()->id,
            NistControl::where('control_id', 'SC-8')->first()->id,
        ]);

        TrainingScenario::create([
            'title' => 'Emergency Department Crisis',
            'module_id' => $hospitalEHR->id,
            'order_number' => 1,
            'scenario_type' => 'briefing',
            'content' => "**3:42 AM - Emergency Department**\n\nYou are the CISO of Metro General Hospital, a 450-bed facility. Your EHR system (Epic) has been encrypted by ransomware. Nurses in the Emergency Department report they cannot access patient records.\n\nCurrent situation:\n- 23 patients in ED, 3 in critical condition\n- EHR system completely offline\n- Lab systems showing encryption\n- Radiology PACS system status unknown\n- Ransomware note demands $14 million in Bitcoin\n- Backup systems were also encrypted\n\n**Patient lives are at risk without medical records.**",
            'max_score' => 100,
        ]);

        // Module 3: Financial Services Banking Breach
        $financialSector = Sector::where('slug', 'financial-services')->first();
        $bankingBreach = SimulationModule::create([
            'title' => 'Banking Core System Breach Response',
            'slug' => 'banking-core-system-breach',
            'description' => 'Respond to an APT breach of a major bank\'s core banking system. Investigate the intrusion, contain the threat, protect customer data, and coordinate with federal regulators while maintaining customer trust.',
            'learning_objectives' => [
                'Detect and analyze Advanced Persistent Threat (APT) activity',
                'Execute financial sector incident response requirements',
                'Coordinate with OCC, FDIC, and Federal Reserve',
                'Protect customer financial data and prevent fraud',
                'Manage regulatory reporting and customer notifications',
            ],
            'sector_id' => $financialSector->id,
            'difficulty_level' => 'expert',
            'estimated_duration_minutes' => 120,
            'points_reward' => 600,
            'attack_type' => 'apt',
            'is_published' => true,
            'is_featured' => true,
        ]);

        $bankingBreach->nistControls()->attach([
            NistControl::where('control_id', 'IR-4')->first()->id,
            NistControl::where('control_id', 'IR-5')->first()->id,
            NistControl::where('control_id', 'SI-4')->first()->id,
            NistControl::where('control_id', 'AC-2')->first()->id,
            NistControl::where('control_id', 'AC-6')->first()->id,
            NistControl::where('control_id', 'RA-5')->first()->id,
        ]);

        TrainingScenario::create([
            'title' => 'Suspicious Activity Detected',
            'module_id' => $bankingBreach->id,
            'order_number' => 1,
            'scenario_type' => 'briefing',
            'content' => "**Tuesday, 2:15 PM EST**\n\nYour SOC analyst escalates unusual activity in your bank's core banking system:\n\n- Unauthorized database queries accessing customer account data\n- Lateral movement from compromised domain admin account\n- Data exfiltration to suspicious cloud storage service\n- Evidence of access dating back 6 months\n- Attackers appear to have access to wire transfer systems\n\n**This is a sophisticated Advanced Persistent Threat.**\n\nYour bank serves 15 million customers with $450 billion in assets.",
            'max_score' => 100,
        ]);

        $this->command->info('✓ Seeded 3 simulation modules with scenarios');
    }
}
