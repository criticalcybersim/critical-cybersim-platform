import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Shield } from 'lucide-react';
import { Head } from '@inertiajs/react';

export default function TermsOfServicePage() {
    return (
        <>
            <Head title="Terms of Service - CriticalCyberSim">
                <meta name="description" content="CriticalCyberSim Terms of Service. Read our terms and conditions for using the cybersecurity training platform." />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://criticalcybersim.com/terms" />
            </Head>

            <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
                {/* Navigation */}
                <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <Link href="/" className="flex items-center gap-2">
                                <Shield className="h-8 w-8 text-blue-500" />
                                <span className="text-xl font-bold text-white">CriticalCyberSim</span>
                            </Link>
                            <div className="flex items-center gap-4">
                                <Link href="/login">
                                    <Button variant="ghost" className="text-slate-300 hover:text-white">
                                        Sign In
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Development Banner */}
                <div className="border-b border-yellow-800/50 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 py-2">
                    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                        <p className="text-sm font-medium text-yellow-200">
                            🚧 Platform Under Development - Official Launch Coming Soon
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="mb-8 text-4xl font-bold text-white">Terms of Service</h1>
                    <div className="space-y-8 text-slate-300">
                        <div>
                            <p className="text-sm text-slate-400">Last Updated: April 30, 2026</p>
                        </div>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-white">1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using CriticalCyberSim ("the Platform"), you accept and agree to be bound by these Terms of Service.
                                If you do not agree to these terms, please do not use the Platform.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-white">2. Eligibility</h2>
                            <p className="mb-4">To use this Platform, you must:</p>
                            <ul className="list-disc space-y-2 pl-6">
                                <li>Be at least 18 years of age</li>
                                <li>Be affiliated with a U.S. government agency or critical infrastructure organization</li>
                                <li>Have proper authorization from your organization</li>
                                <li>Comply with all applicable federal, state, and local laws</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-white">3. Account Responsibilities</h2>
                            <p className="mb-4">You are responsible for:</p>
                            <ul className="list-disc space-y-2 pl-6">
                                <li>Maintaining the confidentiality of your account credentials</li>
                                <li>All activities that occur under your account</li>
                                <li>Notifying us immediately of any unauthorized access</li>
                                <li>Providing accurate and current information</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-white">4. Acceptable Use</h2>
                            <p className="mb-4">You agree NOT to:</p>
                            <ul className="list-disc space-y-2 pl-6">
                                <li>Use the Platform for any illegal or unauthorized purpose</li>
                                <li>Attempt to gain unauthorized access to any systems or networks</li>
                                <li>Share sensitive simulation information with unauthorized individuals</li>
                                <li>Interfere with or disrupt the Platform's operation</li>
                                <li>Reverse engineer or attempt to extract source code</li>
                                <li>Use automated systems to access the Platform without permission</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-white">5. Intellectual Property</h2>
                            <p>
                                All content, materials, and simulations provided through the Platform are protected by copyright, trademark, and other
                                intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without express
                                written permission.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-white">6. Training Content</h2>
                            <p className="mb-4">The Platform provides:</p>
                            <ul className="list-disc space-y-2 pl-6">
                                <li>Educational cybersecurity simulations based on real-world scenarios</li>
                                <li>Training materials aligned with federal cybersecurity frameworks</li>
                                <li>Performance tracking and analytics</li>
                            </ul>
                            <p className="mt-4">
                                Training content is for educational purposes only and should not be considered as official guidance or policy.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-white">7. Data Usage</h2>
                            <p>
                                By using the Platform, you consent to the collection and use of your training data, performance metrics, and activity
                                logs as described in our Privacy Policy. This data may be shared with your organization's administrators and relevant
                                federal agencies.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-white">8. Disclaimer of Warranties</h2>
                            <p>
                                THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT GUARANTEE THAT THE
                                PLATFORM WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-white">9. Limitation of Liability</h2>
                            <p>
                                TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
                                PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE PLATFORM.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-white">10. Security and Compliance</h2>
                            <p className="mb-4">The Platform is designed to comply with:</p>
                            <ul className="list-disc space-y-2 pl-6">
                                <li>NIST SP 800-53 Rev.5 security controls</li>
                                <li>Federal cybersecurity requirements</li>
                                <li>Zero Trust Architecture principles</li>
                                <li>CISA critical infrastructure guidelines</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-white">11. Termination</h2>
                            <p>
                                We reserve the right to suspend or terminate your access to the Platform at any time for violation of these Terms or for
                                any other reason at our discretion.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-white">12. Governing Law</h2>
                            <p>
                                These Terms shall be governed by and construed in accordance with the laws of the United States and the applicable state
                                laws, without regard to conflict of law provisions.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-white">13. Changes to Terms</h2>
                            <p>
                                We reserve the right to modify these Terms at any time. We will notify users of material changes through the Platform or
                                via email. Continued use of the Platform after changes constitutes acceptance of the modified Terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-white">14. Contact Information</h2>
                            <p>
                                For questions about these Terms of Service, please contact your organization's cybersecurity administrator or designated
                                compliance officer.
                            </p>
                        </section>
                    </div>

                    <div className="mt-12 border-t border-slate-800 pt-8">
                        <Link href="/">
                            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                                Back to Home
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <footer className="border-t border-slate-800 py-12">
                    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                        <p className="text-sm text-slate-500">© {new Date().getFullYear()} CriticalCyberSim. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
