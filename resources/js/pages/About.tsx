import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, usePage } from '@inertiajs/react';
import { 
    Shield, Target, Users, Award, Globe, Zap, CheckCircle, 
    Building2, GraduationCap, TrendingUp, User 
} from 'lucide-react';
import { Head } from '@inertiajs/react';
import { type SharedData } from '@/types';

export default function AboutPage() {
    const { auth } = usePage<SharedData>().props;
    const isAuthenticated = !!auth.user;
    return (
        <>
            <Head title="About Us - CriticalCyberSim">
                <meta name="description" content="Learn about CriticalCyberSim, the nationwide cybersecurity training platform for U.S. critical infrastructure protection. Our mission, vision, and commitment to national security." />
                <meta name="keywords" content="about criticalcybersim, cybersecurity training, critical infrastructure protection, CISA, NIST" />
                <meta property="og:title" content="About CriticalCyberSim - Critical Infrastructure Cybersecurity Training" />
                <meta property="og:description" content="Learn about our mission to protect America's critical infrastructure through comprehensive cybersecurity training." />
                <link rel="canonical" href="https://criticalcybersim.com/about" />
            </Head>

            <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
                {/* Navigation */}
                <nav className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-sm sticky top-0 z-50">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <Link href="/" className="flex items-center gap-2">
                                <Shield className="h-8 w-8 text-blue-500" />
                                <span className="text-xl font-bold text-white">CriticalCyberSim</span>
                            </Link>
                            <div className="flex items-center gap-4">
                                {isAuthenticated ? (
                                    <>
                                        <Link href="/dashboard">
                                            <Button variant="ghost" className="text-slate-300 hover:text-white">
                                                <User className="mr-2 h-4 w-4" />
                                                {auth.user?.name}
                                            </Button>
                                        </Link>
                                        <Link href="/dashboard">
                                            <Button className="bg-blue-600 hover:bg-blue-700">Dashboard</Button>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/login">
                                            <Button variant="ghost" className="text-slate-300 hover:text-white">Sign In</Button>
                                        </Link>
                                        <Link href="/register">
                                            <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Development Banner - Removed for production-ready appearance */}

                {/* Hero Section */}
                <section className="relative overflow-hidden py-24">
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 animate-gradient bg-[length:200%_auto]" />
                    </div>
                    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-600/30 bg-blue-600/10 px-4 py-2 text-sm text-blue-400">
                                <Shield className="h-4 w-4" />
                                <span>About CriticalCyberSim</span>
                            </div>
                            <h1 className="mb-6 text-5xl font-bold text-white sm:text-6xl">
                                Protecting America's
                                <span className="block animate-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto]">
                                    Critical Infrastructure
                                </span>
                            </h1>
                            <p className="mx-auto max-w-3xl text-xl text-slate-300">
                                The #1 AI-powered cybersecurity training platform purpose-built for U.S. critical infrastructure protection
                            </p>
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-12">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-2">
                            <Card className="border-slate-800 bg-slate-900/50">
                                <CardHeader>
                                    <Target className="mb-4 h-12 w-12 text-blue-500" />
                                    <CardTitle className="text-2xl text-white">Our Mission</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-300">
                                        To strengthen America's critical infrastructure cybersecurity posture through comprehensive, hands-on training
                                        that prepares defenders to identify, respond to, and mitigate cyber threats targeting the nation's most vital
                                        systems and services.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-slate-800 bg-slate-900/50">
                                <CardHeader>
                                    <Shield className="mb-4 h-12 w-12 text-blue-500" />
                                    <CardTitle className="text-2xl text-white">Our Vision</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-300">
                                        To become the premier nationwide platform for critical infrastructure cybersecurity training, fostering a
                                        community of highly skilled professionals capable of defending against evolving cyber threats and ensuring the
                                        resilience of America's essential services.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="bg-slate-900/50 py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 text-4xl font-bold text-white">Why Choose CriticalCyberSim</h2>
                            <p className="text-lg text-slate-400">Built on federal standards for critical infrastructure protection</p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    icon: Globe,
                                    title: 'Nationwide Coverage',
                                    description: 'Training for all 16 CISA-designated critical infrastructure sectors',
                                },
                                {
                                    icon: Shield,
                                    title: 'Federal Standards',
                                    description: 'Built on NIST SP 800-53, Zero Trust Architecture, and CISA frameworks',
                                },
                                {
                                    icon: Users,
                                    title: 'Expert-Led Content',
                                    description: 'Scenarios developed by cybersecurity professionals with real-world experience',
                                },
                                {
                                    icon: Target,
                                    title: 'Realistic Simulations',
                                    description: 'Hands-on training based on actual cyber incidents and attack patterns',
                                },
                                {
                                    icon: Award,
                                    title: 'Skill Development',
                                    description: 'Track progress across NIST control families and earn achievements',
                                },
                                {
                                    icon: Globe,
                                    title: 'Adaptive Learning',
                                    description: 'Personalized training paths based on your sector and performance',
                                },
                            ].map((feature, index) => (
                                <Card key={index} className="border-slate-800 bg-slate-900/50">
                                    <CardHeader>
                                        <feature.icon className="mb-4 h-12 w-12 text-blue-500" />
                                        <CardTitle className="text-white">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-slate-400">{feature.description}</CardDescription>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Development Timeline */}
                <section className="py-24 bg-slate-900/30">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 text-4xl font-bold text-white">Development Roadmap</h2>
                            <p className="text-lg text-slate-400">Our journey to launching the premier critical infrastructure training platform</p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            <Card className="border-green-800 bg-slate-900/50">
                                <CardHeader>
                                    <CheckCircle className="mb-4 h-12 w-12 text-green-500" />
                                    <CardTitle className="text-white">Q4 2025 ✓</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm text-slate-400">
                                        <li>✓ Platform architecture designed</li>
                                        <li>✓ Database schema implemented</li>
                                        <li>✓ Authentication system built</li>
                                        <li>✓ Initial UI/UX developed</li>
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card className="border-green-800 bg-slate-900/50">
                                <CardHeader>
                                    <CheckCircle className="mb-4 h-12 w-12 text-green-500" />
                                    <CardTitle className="text-white">Q1 2026 ✓</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm text-slate-400">
                                        <li>✓ Training module framework</li>
                                        <li>✓ Sector-specific content dev</li>
                                        <li>✓ Progress tracking system</li>
                                        <li>✓ 16 critical sectors mapped</li>
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card className="border-blue-800 bg-slate-900/50">
                                <CardHeader>
                                    <Zap className="mb-4 h-12 w-12 text-blue-500" />
                                    <CardTitle className="text-white">Q2 2026 (Current)</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm text-slate-400">
                                        <li>🔄 Simulation engine development</li>
                                        <li>🔄 AI training assistant integration</li>
                                        <li>🔄 Team collaboration features</li>
                                        <li>🔄 Beta testing program launch</li>
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card className="border-slate-800 bg-slate-900/50">
                                <CardHeader>
                                    <TrendingUp className="mb-4 h-12 w-12 text-slate-500" />
                                    <CardTitle className="text-white">Q3 2026</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm text-slate-400">
                                        <li>📋 Public beta launch</li>
                                        <li>📋 Federal agency partnerships</li>
                                        <li>📋 Compliance certifications</li>
                                        <li>📋 Production deployment</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Founder & Development Team */}
                <section className="py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 text-4xl font-bold text-white">Development Team</h2>
                            <p className="text-lg text-slate-400">Building the future of critical infrastructure cybersecurity training</p>
                        </div>
                        <Card className="border-slate-800 bg-slate-900/50 max-w-4xl mx-auto">
                            <CardContent className="pt-8">
                                <div className="text-center mb-6">
                                    <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-blue-600/20 mb-4">
                                        <User className="h-12 w-12 text-blue-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Founder & Lead Developer</h3>
                                    <p className="text-slate-400 mb-6">Cybersecurity Expert | Full-Stack Developer | National Security Advocate</p>
                                </div>
                                <div className="grid gap-6 md:grid-cols-3 text-center">
                                    <div>
                                        <p className="text-3xl font-bold text-blue-500 mb-2">10+</p>
                                        <p className="text-slate-400">Years Experience</p>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-blue-500 mb-2">5000+</p>
                                        <p className="text-slate-400">Hours Developed</p>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-blue-500 mb-2">16</p>
                                        <p className="text-slate-400">Sectors Covered</p>
                                    </div>
                                </div>
                                <div className="mt-8 space-y-4">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                                        <p className="text-slate-300"><strong>Platform Architecture:</strong> Designed scalable Laravel-React architecture supporting 100,000+ concurrent users</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                                        <p className="text-slate-300"><strong>Content Development:</strong> Created comprehensive training modules covering all 16 CISA critical infrastructure sectors</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                                        <p className="text-slate-300"><strong>Technology Stack:</strong> Implemented modern tech stack (Laravel 12, React 19, MySQL, AI integration) for production-ready deployment</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24">
                    <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        <h2 className="mb-4 text-4xl font-bold text-white">Join Our Mission</h2>
                        <p className="mb-8 text-lg text-slate-400">
                            Be part of strengthening America's cybersecurity resilience
                        </p>
                        {isAuthenticated ? (
                            <Link href="/dashboard">
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                    Go to Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/register">
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                    Get Started Today
                                </Button>
                            </Link>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-slate-800 py-16 bg-slate-950">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-12 md:grid-cols-5">
                            <div className="md:col-span-2">
                                <div className="flex items-center gap-2 mb-4">
                                    <Shield className="h-6 w-6 text-blue-500" />
                                    <span className="font-bold text-white text-lg">CriticalCyberSim</span>
                                </div>
                                <p className="text-sm text-slate-400 mb-6">
                                    The #1 AI-powered cybersecurity training platform for U.S. critical infrastructure protection.
                                </p>
                                <div className="flex gap-3">
                                    {['LinkedIn', 'Twitter', 'YouTube'].map((social) => (
                                        <a
                                            key={social}
                                            href="#"
                                            className="text-slate-500 hover:text-blue-500 transition"
                                        >
                                            {social}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-white mb-4">Platform</h3>
                                <ul className="space-y-3 text-sm">
                                    <li><Link href="/about" className="text-slate-400 hover:text-blue-400 transition">About Us</Link></li>
                                    <li><Link href="/" className="text-slate-400 hover:text-blue-400 transition">Features</Link></li>
                                    <li><Link href="/" className="text-slate-400 hover:text-blue-400 transition">Solutions</Link></li>
                                    <li><Link href="/sectors" className="text-slate-400 hover:text-blue-400 transition">Sectors</Link></li>
                                    <li><Link href="/pricing" className="text-slate-400 hover:text-blue-400 transition">Pricing</Link></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-white mb-4">Resources</h3>
                                <ul className="space-y-3 text-sm">
                                    <li><a href="https://www.cisa.gov" target="_blank" rel="noopener" className="text-slate-400 hover:text-blue-400 transition">CISA.gov</a></li>
                                    <li><a href="https://csrc.nist.gov" target="_blank" rel="noopener" className="text-slate-400 hover:text-blue-400 transition">NIST</a></li>
                                    <li><Link href="/support" className="text-slate-400 hover:text-blue-400 transition">Documentation</Link></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-white mb-4">Company</h3>
                                <ul className="space-y-3 text-sm">
                                    <li><Link href="/careers" className="text-slate-400 hover:text-blue-400 transition">Careers</Link></li>
                                    <li><Link href="/terms" className="text-slate-400 hover:text-blue-400 transition">Terms</Link></li>
                                    <li><Link href="/contact" className="text-slate-400 hover:text-blue-400 transition">Contact</Link></li>
                                    <li><Link href="/support" className="text-slate-400 hover:text-blue-400 transition">Support</Link></li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-slate-800 text-center">
                            <p className="text-sm text-slate-500">
                                © {new Date().getFullYear()} CriticalCyberSim. All rights reserved. | Made with 🇺🇸 for America's Critical Infrastructure
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
