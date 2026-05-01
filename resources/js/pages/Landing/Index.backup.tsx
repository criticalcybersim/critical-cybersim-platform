import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, usePage } from '@inertiajs/react';
import { 
    Award, BookOpen, Globe, Monitor, Shield, Target, TrendingUp, Users, User,
    Zap, Lock, Brain, Network, AlertTriangle, CheckCircle, BarChart, Code,
    Cpu, CloudCog, Briefcase, GraduationCap, Timer, Activity
} from 'lucide-react';
import { Head } from '@inertiajs/react';
import { type SharedData } from '@/types';

interface Sector {
    id: number;
    name: string;
    slug: string;
    icon: string;
    color: string;
    simulation_modules_count: number;
}

interface FeaturedModule {
    id: number;
    title: string;
    description: string;
    difficulty_level: string;
    sector: Sector;
}

interface Stats {
    total_users: number;
    total_simulations: number;
    total_sectors: number;
    total_completions: number;
}

interface Props {
    sectors: Sector[];
    featuredModules: FeaturedModule[];
    stats: Stats;
}

export default function LandingPage({ sectors, stats }: Props) {
    const { auth } = usePage<SharedData>().props;
    const isAuthenticated = !!auth.user;

    return (
        <>
            <Head title="CriticalCyberSim - Nationwide Cybersecurity Training Platform">
                <meta name="description" content="Nationwide cybersecurity training and simulation platform for U.S. critical infrastructure protection. Train with realistic scenarios based on NIST SP 800-53 and Zero Trust Architecture." />
                <meta name="keywords" content="cybersecurity training, critical infrastructure, NIST, CISA, cyber defense, simulation, zero trust, ransomware" />
                <meta property="og:title" content="CriticalCyberSim - Critical Infrastructure Cybersecurity Training" />
                <meta property="og:description" content="Nationwide cybersecurity training platform for U.S. critical infrastructure protection with realistic simulations." />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="CriticalCyberSim - Critical Infrastructure Cybersecurity Training" />
                <meta name="twitter:description" content="Nationwide cybersecurity training platform for U.S. critical infrastructure protection." />
                <link rel="canonical" href="https://criticalcybersim.com" />
            </Head>

            <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
                {/* Navigation */}
                <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Shield className="h-8 w-8 text-blue-500" />
                                <span className="text-xl font-bold text-white">CriticalCyberSim</span>
                            </div>
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
                                            <Button variant="ghost" className="text-slate-300 hover:text-white">
                                                Sign In
                                            </Button>
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

                {/* Development Banner */}
                <div className="border-b border-yellow-800/50 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 py-2">
                    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                        <p className="text-sm font-medium text-yellow-200">
                            🚧 Platform Under Development - Official Launch Coming Soon
                        </p>
                    </div>
                </div>

                {/* Hero Section */}
                <section className="relative overflow-hidden py-24">
                    {/* Animated background */}
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-pulse" />
                        <div className="absolute left-1/4 top-0 h-96 w-96 animate-blob rounded-full bg-blue-500/10 blur-3xl" />
                        <div className="absolute right-1/4 top-0 h-96 w-96 animate-blob animation-delay-2000 rounded-full bg-purple-500/10 blur-3xl" />
                        <div className="absolute bottom-0 left-1/2 h-96 w-96 animate-blob animation-delay-4000 rounded-full bg-blue-500/10 blur-3xl" />
                    </div>
                    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="mb-6 animate-fade-in-up text-5xl font-bold tracking-tight text-white sm:text-7xl">
                                Protect America's
                                <span className="block animate-gradient bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto]">
                                    Critical Infrastructure
                                </span>
                            </h1>
                            <p className="mx-auto mb-8 max-w-2xl animate-fade-in-up text-lg text-slate-300 animation-delay-200">
                                Nationwide cybersecurity training and simulation platform for U.S. critical infrastructure protection. Train with
                                realistic scenarios based on NIST SP 800-53 and Zero Trust Architecture.
                            </p>
                            <div className="flex animate-fade-in-up items-center justify-center gap-4 animation-delay-400">
                                {isAuthenticated ? (
                                    <>
                                        <Link href="/dashboard">
                                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                                Go to Dashboard
                                            </Button>
                                        </Link>
                                        <Link href="/sectors">
                                            <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                                                Browse Sectors
                                            </Button>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/register">
                                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                                Start Training
                                            </Button>
                                        </Link>
                                        <Link href="/login">
                                            <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                                                Sign In
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="border-y border-slate-800 bg-slate-900/50 py-12">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                            <div className="text-center">
                                <div className="mb-2 text-4xl font-bold text-blue-500">{stats.total_users.toLocaleString()}</div>
                                <div className="text-sm text-slate-400">Active Users</div>
                            </div>
                            <div className="text-center">
                                <div className="mb-2 text-4xl font-bold text-blue-500">{stats.total_simulations}</div>
                                <div className="text-sm text-slate-400">Simulations</div>
                            </div>
                            <div className="text-center">
                                <div className="mb-2 text-4xl font-bold text-blue-500">{stats.total_sectors}</div>
                                <div className="text-sm text-slate-400">Critical Sectors</div>
                            </div>
                            <div className="text-center">
                                <div className="mb-2 text-4xl font-bold text-blue-500">{stats.total_completions.toLocaleString()}</div>
                                <div className="text-sm text-slate-400">Sessions Completed</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 text-4xl font-bold text-white">Platform Features</h2>
                            <p className="text-lg text-slate-400">Comprehensive training for critical infrastructure cybersecurity</p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {[
                                {
                                    icon: Monitor,
                                    title: 'Realistic Simulations',
                                    description: 'Hands-on training with real-world cybersecurity scenarios',
                                },
                                {
                                    icon: Target,
                                    title: 'Adaptive Learning',
                                    description: 'Personalized paths based on your performance and sector',
                                },
                                {
                                    icon: TrendingUp,
                                    title: 'Progress Analytics',
                                    description: 'Track your skills across NIST control families',
                                },
                                {
                                    icon: Award,
                                    title: 'Gamification',
                                    description: 'Earn points, achievements, and climb the leaderboard',
                                },
                            ].map((feature, index) => (
                                <Card 
                                    key={index} 
                                    className="group animate-fade-in-up border-slate-800 bg-slate-900/50 transition-all hover:scale-105 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-500/20" 
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
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

                {/* Critical Infrastructure Sectors */}
                <section className="bg-slate-900/50 py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 text-4xl font-bold text-white">16 Critical Infrastructure Sectors</h2>
                            <p className="text-lg text-slate-400">CISA-designated sectors essential to national security and public safety</p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
                            {sectors.slice(0, 8).map((sector, index) => (
                                <Link key={sector.id} href="/login">
                                    <Card 
                                        className="group animate-fade-in-up border-slate-800 bg-slate-900/50 transition-all hover:scale-105 hover:border-blue-600 hover:bg-slate-800 hover:shadow-lg" 
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <CardHeader>
                                            <div className="mb-2 flex items-center justify-between">
                                                <Globe className="h-8 w-8" style={{ color: sector.color }} />
                                                <span className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-400">
                                                    {sector.simulation_modules_count} modules
                                                </span>
                                            </div>
                                            <CardTitle className="text-base text-white">{sector.name}</CardTitle>
                                        </CardHeader>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                        <div className="mt-8 text-center">
                            <Link href="/login">
                                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                                    View All Sectors
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Federal Compliance */}
                <section className="py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-12">
                            <div className="grid gap-12 lg:grid-cols-2">
                                <div>
                                    <h2 className="mb-4 text-3xl font-bold text-white">Federal Compliance & Standards</h2>
                                    <p className="mb-6 text-slate-400">
                                        Built on federal cybersecurity frameworks and compliance requirements for critical infrastructure protection.
                                    </p>
                                    <ul className="space-y-3">
                                        {[
                                            'NIST SP 800-53 Rev.5 Security Controls',
                                            'OMB M-22-09 Zero Trust Architecture',
                                            'Executive Order 14028 (Cybersecurity)',
                                            'CISA Critical Infrastructure Framework',
                                        ].map((item, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
                                                <span className="text-slate-300">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="grid grid-cols-2 gap-6">
                                        {[
                                            { label: 'NIST', sublabel: 'SP 800-53' },
                                            { label: 'CISA', sublabel: 'Framework' },
                                            { label: 'Zero Trust', sublabel: 'OMB M-22-09' },
                                            { label: 'EO 14028', sublabel: 'Compliance' },
                                        ].map((badge, index) => (
                                            <div key={index} className="rounded-lg border border-slate-700 bg-slate-800/50 p-6 text-center">
                                                <div className="text-xl font-bold text-blue-400">{badge.label}</div>
                                                <div className="text-sm text-slate-400">{badge.sublabel}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="border-t border-slate-800 py-24">
                    <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        <h2 className="mb-4 text-4xl font-bold text-white">Ready to Strengthen National Cybersecurity?</h2>
                        <p className="mb-8 text-lg text-slate-400">
                            Join federal agencies and critical infrastructure organizations in securing America's most vital systems.
                        </p>
                        {isAuthenticated ? (
                            <Link href="/dashboard">
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                    Go to Your Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/register">
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                    Start Your Training Journey
                                </Button>
                            </Link>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-slate-800 py-12">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-8 md:grid-cols-3">
                            <div>
                                <div className="mb-4 flex items-center gap-2">
                                    <Shield className="h-6 w-6 text-blue-500" />
                                    <span className="font-bold text-white">CriticalCyberSim</span>
                                </div>
                                <p className="text-sm text-slate-400">
                                    Nationwide cybersecurity training for U.S. critical infrastructure protection.
                                </p>
                            </div>
                            <div>
                                <h3 className="mb-4 font-semibold text-white">Platform</h3>
                                <ul className="space-y-2 text-sm text-slate-400">
                                    <li>
                                        <Link href="/about" className="hover:text-blue-400">
                                            About Us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/privacy" className="hover:text-blue-400">
                                            Privacy Policy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/terms" className="hover:text-blue-400">
                                            Terms of Service
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-4 font-semibold text-white">Resources</h3>
                                <ul className="space-y-2 text-sm text-slate-400">
                                    <li>
                                        <a href="https://www.cisa.gov" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                                            CISA.gov
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://csrc.nist.gov" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                                            NIST Resources
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.whitehouse.gov/briefing-room/presidential-actions/2021/05/12/executive-order-on-improving-the-nations-cybersecurity/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                                            EO 14028
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-4 font-semibold text-white">Contact</h3>
                                <p className="text-sm text-slate-400">
                                    For questions or support, contact your organization's cybersecurity administrator.
                                </p>
                            </div>
                        </div>
                        <div className="mt-8 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
                            <p>© {new Date().getFullYear()} CriticalCyberSim. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
