import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Shield } from 'lucide-react';
import { Head } from '@inertiajs/react';

export default function PrivacyPolicyPage() {
    return (
        <>
            <Head title="Privacy Policy - CriticalCyberSim">
                <meta name="description" content="CriticalCyberSim Privacy Policy. Learn how we collect, use, and protect your personal information on our cybersecurity training platform." />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://criticalcybersim.com/privacy" />
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
                    <h1 className="mb-8 text-4xl font-bold text-white">Privacy Policy</h1>
                    <div className="space-y-8 text-slate-300">
                        <div>
                            <p className="text-sm text-slate-400">Last Updated: April 30, 2026</p>
                        </div>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-white">1. Introduction</h2>
                            <p>
                                CriticalCyberSim ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we
                                collect, use, disclose, and safeguard your information when you use our cybersecurity training platform.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-white">2. Information We Collect</h2>
                            <h3 className="mb-2 text-xl font-semibold text-white">2.1 Personal Information</h3>
                            <p className="mb-4">We collect information that you provide directly to us, including:</p>
                            <ul className="list-disc space-y-2 pl-6">
                                <li>Name and contact information (email address)</li>
                                <li>Account credentials</li>
                                <li>Organization affiliation</li>
                                <li>Job role and sector information</li>
                            </ul>

                            <h3 className="mb-2 mt-6 text-xl font-semibold text-white">2.2 Usage Information</h3>
                            <p className="mb-4">We automatically collect certain information about your device and usage, including:</p>
                            <ul className="list-disc space-y-2 pl-6">
                                <li>Training progress and performance data</li>
                                <li>Simulation completion rates and scores</li>
                                <li>Login activity and session data</li>
                                <li>IP address and browser information</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-white">3. How We Use Your Information</h2>
                            <p className="mb-4">We use the information we collect to:</p>
                            <ul className="list-disc space-y-2 pl-6">
                                <li>Provide, maintain, and improve our training platform</li>
                                <li>Personalize your learning experience</li>
                                <li>Track and analyze your training progress</li>
                                <li>Communicate with you about your account and updates</li>
                                <li>Ensure platform security and prevent fraud</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-white">4. Information Sharing</h2>
                            <p className="mb-4">We may share your information with:</p>
                            <ul className="list-disc space-y-2 pl-6">
                                <li>Your organization's administrators and training coordinators</li>
                                <li>Federal agencies as required by law or for national security purposes</li>
                                <li>Service providers who assist in operating our platform</li>
                                <li>Law enforcement when legally required</li>
                            </ul>
                            <p className="mt-4">We do not sell your personal information to third parties.</p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-white">5. Data Security</h2>
                            <p>
                                We implement appropriate technical and organizational measures to protect your personal information, including
                                encryption, access controls, and regular security assessments. However, no method of transmission over the internet is
                                100% secure.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-white">6. Data Retention</h2>
                            <p>
                                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy,
                                unless a longer retention period is required by law or for legitimate business purposes.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-white">7. Your Rights</h2>
                            <p className="mb-4">You have the right to:</p>
                            <ul className="list-disc space-y-2 pl-6">
                                <li>Access and review your personal information</li>
                                <li>Request correction of inaccurate data</li>
                                <li>Request deletion of your account (subject to legal requirements)</li>
                                <li>Opt-out of certain communications</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-white">8. Children's Privacy</h2>
                            <p>
                                Our platform is not intended for individuals under the age of 18. We do not knowingly collect personal information from
                                children.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-white">9. Changes to This Policy</h2>
                            <p>
                                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new
                                Privacy Policy on this page and updating the "Last Updated" date.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-white">10. Contact Us</h2>
                            <p>
                                If you have questions about this Privacy Policy, please contact your organization's cybersecurity administrator or
                                designated privacy officer.
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
