<?php

namespace Database\Seeders;

use App\Models\NistControl;
use Illuminate\Database\Seeder;

class NistControlSeeder extends Seeder
{
    public function run(): void
    {
        $controls = [
            // Access Control (AC)
            ['control_id' => 'AC-1', 'control_family' => 'Access Control', 'control_family_code' => 'AC', 'title' => 'Policy and Procedures', 'description' => 'Develop, document, and disseminate access control policy and procedures.', 'impact_level' => 'low', 'is_baseline' => true],
            ['control_id' => 'AC-2', 'control_family' => 'Access Control', 'control_family_code' => 'AC', 'title' => 'Account Management', 'description' => 'Manage system accounts including creation, enabling, modification, and disabling.', 'impact_level' => 'low', 'is_baseline' => true],
            ['control_id' => 'AC-3', 'control_family' => 'Access Control', 'control_family_code' => 'AC', 'title' => 'Access Enforcement', 'description' => 'Enforce approved authorizations for logical access to information and system resources.', 'impact_level' => 'low', 'is_baseline' => true],
            ['control_id' => 'AC-4', 'control_family' => 'Access Control', 'control_family_code' => 'AC', 'title' => 'Information Flow Enforcement', 'description' => 'Enforce approved authorizations for controlling the flow of information.', 'impact_level' => 'moderate', 'is_baseline' => true],
            ['control_id' => 'AC-5', 'control_family' => 'Access Control', 'control_family_code' => 'AC', 'title' => 'Separation of Duties', 'description' => 'Separate duties of individuals to prevent malevolent activity.', 'impact_level' => 'low', 'is_baseline' => true],
            ['control_id' => 'AC-6', 'control_family' => 'Access Control', 'control_family_code' => 'AC', 'title' => 'Least Privilege', 'description' => 'Employ the principle of least privilege.', 'impact_level' => 'low', 'is_baseline' => true],
            ['control_id' => 'AC-7', 'control_family' => 'Access Control', 'control_family_code' => 'AC', 'title' => 'Unsuccessful Logon Attempts', 'description' => 'Enforce a limit of consecutive invalid logon attempts.', 'impact_level' => 'low', 'is_baseline' => true],
            ['control_id' => 'AC-17', 'control_family' => 'Access Control', 'control_family_code' => 'AC', 'title' => 'Remote Access', 'description' => 'Establish and document usage restrictions for remote access.', 'impact_level' => 'low', 'is_baseline' => true],
            ['control_id' => 'AC-20', 'control_family' => 'Access Control', 'control_family_code' => 'AC', 'title' => 'Use of External Systems', 'description' => 'Establish terms and conditions for authorized use of external systems.', 'impact_level' => 'low', 'is_baseline' => true],

            // Incident Response (IR)
            ['control_id' => 'IR-1', 'control_family' => 'Incident Response', 'control_family_code' => 'IR', 'title' => 'Policy and Procedures', 'description' => 'Develop, document, and disseminate incident response policy and procedures.', 'impact_level' => 'low', 'is_baseline' => true],
            ['control_id' => 'IR-2', 'control_family' => 'Incident Response', 'control_family_code' => 'IR', 'title' => 'Incident Response Training', 'description' => 'Provide incident response training to system users.', 'impact_level' => 'low', 'is_baseline' => true],
            ['control_id' => 'IR-3', 'control_family' => 'Incident Response', 'control_family_code' => 'IR', 'title' => 'Incident Response Testing', 'description' => 'Test the incident response capability for the system.', 'impact_level' => 'moderate', 'is_baseline' => true],
            ['control_id' => 'IR-4', 'control_family' => 'Incident Response', 'control_family_code' => 'IR', 'title' => 'Incident Handling', 'description' => 'Implement an incident handling capability for security incidents.', 'impact_level' => 'low', 'is_baseline' => true],
            ['control_id' => 'IR-5', 'control_family' => 'Incident Response', 'control_family_code' => 'IR', 'title' => 'Incident Monitoring', 'description' => 'Track and document system security incidents.', 'impact_level' => 'low', 'is_baseline' => true],
            ['control_id' => 'IR-6', 'control_family' => 'Incident Response', 'control_family_code' => 'IR', 'title' => 'Incident Reporting', 'description' => 'Require personnel to report suspected security incidents.', 'impact_level' => 'low', 'is_baseline' => true],
            ['control_id' => 'IR-7', 'control_family' => 'Incident Response', 'control_family_code' => 'IR', 'title' => 'Incident Response Assistance', 'description' => 'Provide an incident response support resource.', 'impact_level' => 'low', 'is_baseline' => true],
            ['control_id' => 'IR-8', 'control_family' => 'Incident Response', 'control_family_code' => 'IR', 'title' => 'Incident Response Plan', 'description' => 'Develop and implement an incident response plan.', 'impact_level' => 'low', 'is_baseline' => true],

            // System and Information Integrity (SI)
            ['control_id' => 'SI-1', 'control_family' => 'System and Information Integrity', 'control_family_code' => 'SI', 'title' => 'Policy and Procedures', 'description' => 'Develop, document, and disseminate system and information integrity policy.', 'impact_level' => 'low', 'is_baseline' => true],
            ['control_id' => 'SI-2', 'control_family' => 'System and Information Integrity', 'control_family_code' => 'SI', 'title' => 'Flaw Remediation', 'description' => 'Identify, report, and correct system flaws.', 'impact_level' => 'low', 'is_baseline' => true],
            ['control_id' => 'SI-3', 'control_family' => 'System and Information Integrity', 'control_family_code' => 'SI', 'title' => 'Malicious Code Protection', 'description' => 'Implement malicious code protection mechanisms.', 'impact_level' => 'low', 'is_baseline' => true],
            ['control_id' => 'SI-4', 'control_family' => 'System and Information Integrity', 'control_family_code' => 'SI', 'title' => 'System Monitoring', 'description' => 'Monitor the system to detect attacks and indicators of potential attacks.', 'impact_level' => 'low', 'is_baseline' => true],
            ['control_id' => 'SI-5', 'control_family' => 'System and Information Integrity', 'control_family_code' => 'SI', 'title' => 'Security Alerts and Advisories', 'description' => 'Receive system security alerts and advisories and take appropriate actions.', 'impact_level' => 'low', 'is_baseline' => true],
            ['control_id' => 'SI-7', 'control_family' => 'System and Information Integrity', 'control_family_code' => 'SI', 'title' => 'Software and Information Integrity', 'description' => 'Employ integrity verification tools to detect unauthorized changes.', 'impact_level' => 'moderate', 'is_baseline' => true],
            ['control_id' => 'SI-12', 'control_family' => 'System and Information Integrity', 'control_family_code' => 'SI', 'title' => 'Information Management', 'description' => 'Manage and retain information within the system.', 'impact_level' => 'low', 'is_baseline' => true],

            // Risk Assessment (RA)
            ['control_id' => 'RA-1', 'control_family' => 'Risk Assessment', 'control_family_code' => 'RA', 'title' => 'Policy and Procedures', 'description' => 'Develop, document, and disseminate risk assessment policy and procedures.', 'impact_level' => 'low', 'is_baseline' => true],
            ['control_id' => 'RA-2', 'control_family' => 'Risk Assessment', 'control_family_code' => 'RA', 'title' => 'Security Categorization', 'description' => 'Categorize the system and information it processes, stores, and transmits.', 'impact_level' => 'low', 'is_baseline' => true],
            ['control_id' => 'RA-3', 'control_family' => 'Risk Assessment', 'control_family_code' => 'RA', 'title' => 'Risk Assessment', 'description' => 'Conduct risk assessments to identify threats and vulnerabilities.', 'impact_level' => 'low', 'is_baseline' => true],
            ['control_id' => 'RA-5', 'control_family' => 'Risk Assessment', 'control_family_code' => 'RA', 'title' => 'Vulnerability Monitoring and Scanning', 'description' => 'Monitor and scan for vulnerabilities in the system.', 'impact_level' => 'low', 'is_baseline' => true],
            ['control_id' => 'RA-7', 'control_family' => 'Risk Assessment', 'control_family_code' => 'RA', 'title' => 'Risk Response', 'description' => 'Respond to findings from security and privacy assessments.', 'impact_level' => 'low', 'is_baseline' => true],

            // System and Communications Protection (SC)
            ['control_id' => 'SC-1', 'control_family' => 'System and Communications Protection', 'control_family_code' => 'SC', 'title' => 'Policy and Procedures', 'description' => 'Develop, document, and disseminate system and communications protection policy.', 'impact_level' => 'low', 'is_baseline' => true],
            ['control_id' => 'SC-5', 'control_family' => 'System and Communications Protection', 'control_family_code' => 'SC', 'title' => 'Denial-of-Service Protection', 'description' => 'Protect against denial-of-service attacks.', 'impact_level' => 'moderate', 'is_baseline' => true],
            ['control_id' => 'SC-7', 'control_family' => 'System and Communications Protection', 'control_family_code' => 'SC', 'title' => 'Boundary Protection', 'description' => 'Monitor and control communications at system boundaries.', 'impact_level' => 'low', 'is_baseline' => true],
            ['control_id' => 'SC-8', 'control_family' => 'System and Communications Protection', 'control_family_code' => 'SC', 'title' => 'Transmission Confidentiality and Integrity', 'description' => 'Protect the confidentiality and integrity of transmitted information.', 'impact_level' => 'moderate', 'is_baseline' => true],
            ['control_id' => 'SC-12', 'control_family' => 'System and Communications Protection', 'control_family_code' => 'SC', 'title' => 'Cryptographic Key Management', 'description' => 'Establish and manage cryptographic keys.', 'impact_level' => 'low', 'is_baseline' => true],
            ['control_id' => 'SC-13', 'control_family' => 'System and Communications Protection', 'control_family_code' => 'SC', 'title' => 'Cryptographic Protection', 'description' => 'Implement FIPS-validated cryptography.', 'impact_level' => 'moderate', 'is_baseline' => true],
            ['control_id' => 'SC-20', 'control_family' => 'System and Communications Protection', 'control_family_code' => 'SC', 'title' => 'Secure Name/Address Resolution Service', 'description' => 'Provide authentication and integrity for name/address resolution services.', 'impact_level' => 'moderate', 'is_baseline' => true],
            ['control_id' => 'SC-28', 'control_family' => 'System and Communications Protection', 'control_family_code' => 'SC', 'title' => 'Protection of Information at Rest', 'description' => 'Protect the confidentiality and integrity of information at rest.', 'impact_level' => 'moderate', 'is_baseline' => true],
        ];

        foreach ($controls as $control) {
            NistControl::create($control);
        }

        $this->command->info('✓ Seeded '.count($controls).' NIST SP 800-53 controls');
    }
}
