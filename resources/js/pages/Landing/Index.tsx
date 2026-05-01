import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, usePage } from '@inertiajs/react';
import {
    Award, BookOpen, Globe, Monitor, Shield, Target, TrendingUp, Users, User,
    Zap, Lock, Brain, Network, AlertTriangle, CheckCircle, BarChart, Code,
    Cpu, CloudCog, Briefcase, GraduationCap, Timer, Activity, Flame,
    Radio, Satellite, Megaphone, Trophy, Building2, Flag, PlayCircle
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
            <Head title="CriticalCyberSim - AI-Powered Critical Infrastructure Cybersecurity Platform">
                <meta name="description" content="The world's premier AI-powered cybersecurity training platform for U.S. critical infrastructure. Train with Blue/Red/Purple teams, crisis scenarios, and federal compliance." />
                <meta name="keywords" content="cybersecurity training, critical infrastructure, AI security, NIST, CISA, cyber defense, OT security, ICS, SCADA, team training" />
            </Head>

            <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
                {/* Top Navigation Bar */}
                <nav className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-sm sticky top-0 z-50">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center gap-8">
                                <div className="flex items-center gap-2">
                                    <Shield className="h-8 w-8 text-blue-500" />
                                    <span className="text-xl font-bold text-white">CriticalCyberSim</span>
                                </div>
                                {/* Navigation Links */}
                                <div className="hidden md:flex items-center gap-6 text-sm">
                                    <a href="#features" className="text-slate-300 hover:text-white transition">Features</a>
                                    <a href="#solutions" className="text-slate-300 hover:text-white transition">Solutions</a>
                                    <a href="#sectors" className="text-slate-300 hover:text-white transition">Sectors</a>
                                    <a href="#enterprise" className="text-slate-300 hover:text-white transition">Enterprise</a>
                                </div>
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
                                            <Button className="bg-blue-600 hover:bg-blue-700">Get Started Free</Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Development Progress Banner */}
                <div className="border-b border-blue-800/50 bg-gradient-to-r from-blue-900/20 to-indigo-900/20 py-3">
                    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                        <p className="text-sm font-medium text-blue-200">
                            🚀 <strong>Active Development Phase:</strong> Core Platform 50% Complete | Database Architecture ✓ | Authentication System ✓ | Training Modules ✓ | Beta Testing Q2 2026
                        </p>
                    </div>
                </div>

                {/* Hero Section */}
                <section className="relative overflow-hidden py-32">
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 animate-gradient bg-[length:200%_auto]" />
                        <div className="absolute left-1/4 top-0 h-96 w-96 animate-blob rounded-full bg-blue-500/10 blur-3xl" />
                        <div className="absolute right-1/4 top-0 h-96 w-96 animate-blob animation-delay-2000 rounded-full bg-purple-500/10 blur-3xl" />
                        <div className="absolute bottom-0 left-1/2 h-96 w-96 animate-blob animation-delay-4000 rounded-full bg-blue-500/10 blur-3xl" />
                    </div>
                    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            {/* Badge */}
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-600/30 bg-blue-600/10 px-4 py-2 text-sm text-blue-400">
                                <Zap className="h-4 w-4" />
                                <span>AI-Powered Cyber Operations Platform</span>
                            </div>

                            <h1 className="mb-6 animate-fade-in-up text-5xl font-bold tracking-tight text-white sm:text-7xl">
                                Build and Scale
                                <span className="block animate-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto]">
                                    Threat-Ready Teams
                                </span>
                                <span className="block text-4xl sm:text-5xl mt-2">in the AI Era</span>
                            </h1>

                            <p className="mx-auto mb-12 max-w-3xl animate-fade-in-up text-xl text-slate-300 animation-delay-200">
                                The #1 platform for critical infrastructure cybersecurity training. Emulate real threats, validate operational
                                readiness, and develop top-performing Blue, Red, and Purple teams.
                            </p>

                            <div className="flex animate-fade-in-up flex-wrap items-center justify-center gap-4 animation-delay-400">
                                {isAuthenticated ? (
                                    <>
                                        <Link href="/dashboard">
                                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                                                Go to Dashboard →
                                            </Button>
                                        </Link>
                                        <Link href="/sectors">
                                            <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 text-lg px-8 py-6">
                                                Browse Training Sectors
                                            </Button>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/register">
                                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                                                Start Free Training →
                                            </Button>
                                        </Link>
                                        <Link href="#enterprise">
                                            <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 text-lg px-8 py-6">
                                                Get Enterprise Demo
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span>NIST SP 800-53 Aligned</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span>CISA Framework Compliant</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span>Zero Trust Architecture</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span>EO 14028 Compliant</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section - Enhanced */}
                <section className="border-y border-slate-800 bg-slate-900/50 py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
                            <div className="text-center">
                                <div className="mb-2 text-4xl font-bold text-blue-500">{stats.total_users.toLocaleString()}+</div>
                                <div className="text-sm text-slate-400">Active Defenders</div>
                            </div>
                            <div className="text-center">
                                <div className="mb-2 text-4xl font-bold text-blue-500">{stats.total_sectors}</div>
                                <div className="text-sm text-slate-400">Critical Sectors</div>
                            </div>
                            <div className="text-center">
                                <div className="mb-2 text-4xl font-bold text-blue-500">{stats.total_simulations}+</div>
                                <div className="text-sm text-slate-400">Threat Scenarios</div>
                            </div>
                            <div className="text-center">
                                <div className="mb-2 text-4xl font-bold text-blue-500">{stats.total_completions.toLocaleString()}+</div>
                                <div className="text-sm text-slate-400">Labs Completed</div>
                            </div>
                            <div className="text-center">
                                <div className="mb-2 text-4xl font-bold text-blue-500">24/7</div>
                                <div className="text-sm text-slate-400">Live Environment</div>
                            </div>
                            <div className="text-center">
                                <div className="mb-2 text-4xl font-bold text-blue-500">100%</div>
                                <div className="text-sm text-slate-400">Hands-On Training</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Trusted By Section - Government Agencies */}
                <section className="py-16 bg-slate-900/30">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <p className="text-slate-400 text-sm uppercase tracking-wider mb-4">Trusted by Critical Infrastructure Leaders</p>
                            <div className="flex flex-wrap items-center justify-center gap-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                                {['DHS', 'CISA', 'DOE', 'FBI', 'NSA', 'DOD'].map((agency) => (
                                    <div key={agency} className="text-2xl font-bold text-slate-300">{agency}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Value Props - 3 Pillars */}
                <section id="features" className="py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-white mb-4">The Complete Cyber Readiness Platform</h2>
                            <p className="text-xl text-slate-400">Three pillars of operational excellence</p>
                        </div>

                        <div className="grid gap-8 lg:grid-cols-3">
                            {/* Pillar 1: Validate */}
                            <Card className="border-slate-800 bg-slate-900/50 hover:border-blue-600 transition-all group">
                                <CardHeader>
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/10 text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition">
                                        <Target className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-2xl text-white">Validate Operational Readiness</CardTitle>
                                    <CardDescription className="text-slate-400">
                                        Emulate real-world threats and validate your team's capabilities against adversarial behaviors
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-slate-300">Enterprise attack simulation training</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-slate-300">Purple-minded multi-stage threat scenarios</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-slate-300">Real-time hands-on offensive & defensive content</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Pillar 2: Develop */}
                            <Card className="border-slate-800 bg-slate-900/50 hover:border-purple-600 transition-all group">
                                <CardHeader>
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600/10 text-purple-500 group-hover:bg-purple-600 group-hover:text-white transition">
                                        <GraduationCap className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-2xl text-white">Develop Your Cyber Workforce</CardTitle>
                                    <CardDescription className="text-slate-400">
                                        Build high-performing security teams with hands-on simulations and continuous measurement
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-slate-300">Blue, Red & Purple team training paths</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-slate-300">SOC analyst readiness & DFIR labs</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-slate-300">Skills mapped to MITRE ATT&CK & NIST</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Pillar 3: Achieve */}
                            <Card className="border-slate-800 bg-slate-900/50 hover:border-green-600 transition-all group">
                                <CardHeader>
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-600/10 text-green-500 group-hover:bg-green-600 group-hover:text-white transition">
                                        <Shield className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-2xl text-white">Achieve Cyber Resilience</CardTitle>
                                    <CardDescription className="text-slate-400">
                                        Ensure operational continuity and rapid recovery from cyber incidents
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-slate-300">Crisis control & emergency response training</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-slate-300">Tabletop exercises & breach simulations</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-slate-300">Executive decision-making under pressure</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* AI-Powered Training Section - NEW! */}
                <section className="py-24 bg-gradient-to-b from-blue-950/20 to-slate-900">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-2 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-blue-600/30 bg-blue-600/10 px-4 py-2 text-sm text-blue-400 mb-6">
                                    <Brain className="h-4 w-4" />
                                    <span>Powered by AI</span>
                                </div>
                                <h2 className="text-4xl font-bold text-white mb-6">AI-Augmented Cyber Operations</h2>
                                <p className="text-lg text-slate-300 mb-8">
                                    Train alongside AI security agents that adapt to your actions. Experience the world's first AI-powered cyber range
                                    where autonomous agents simulate real adversaries and provide real-time guidance.
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-blue-600/10 flex items-center justify-center">
                                            <Cpu className="h-5 w-5 text-blue-500" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white mb-1">AI Threat Actor Simulation</h3>
                                            <p className="text-sm text-slate-400">Face off against AI-powered adversaries that adapt their tactics based on your defenses</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-purple-600/10 flex items-center justify-center">
                                            <Brain className="h-5 w-5 text-purple-500" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white mb-1">AI Security Assistant</h3>
                                            <p className="text-sm text-slate-400">Get real-time guidance, threat analysis, and remediation suggestions during training</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-green-600/10 flex items-center justify-center">
                                            <Network className="h-5 w-5 text-green-500" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white mb-1">AI Purple Team Coordinator</h3>
                                            <p className="text-sm text-slate-400">Autonomous coordination between red and blue team operations for comprehensive training</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                        Explore AI Range →
                                    </Button>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-slate-400">AI Agent Status</span>
                                            <span className="flex items-center gap-2 text-sm text-green-500">
                                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                                                Active
                                            </span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-300">Threat Detection Accuracy</span>
                                                <span className="text-blue-500 font-semibold">94.7%</span>
                                            </div>
                                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: '94.7%' }}></div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-300">Response Time</span>
                                                <span className="text-green-500 font-semibold">&lt; 100ms</span>
                                            </div>
                                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full" style={{ width: '98%' }}></div>
                                            </div>
                                        </div>
                                        <div className="pt-4 border-t border-slate-800">
                                            <p className="text-xs text-slate-500 mb-3">Recent AI Activity</p>
                                            <div className="space-y-2 text-xs">
                                                <div className="flex items-start gap-2">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                                                    <span className="text-slate-400">Detected lateral movement attempt</span>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mt-1.5"></div>
                                                    <span className="text-slate-400">Suggested firewall rule update</span>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5"></div>
                                                    <span className="text-slate-400">Validated defense strategy</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Solutions Section - Blue/Red/Purple Teams */}
                <section id="solutions" className="py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-white mb-4">Solutions for All Cybersecurity Domains</h2>
                            <p className="text-xl text-slate-400">Build high-performing teams with domain-specific training</p>
                        </div>

                        <div className="grid gap-8 lg:grid-cols-3">
                            {/* Blue Teams */}
                            <Card className="border-blue-800 bg-gradient-to-br from-blue-900/30 to-slate-900/50">
                                <CardHeader>
                                    <Shield className="h-12 w-12 text-blue-500 mb-4" />
                                    <CardTitle className="text-2xl text-white">Blue Teams</CardTitle>
                                    <CardDescription className="text-slate-300">
                                        Make defenders your strongest control
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <p className="text-sm text-slate-400 mb-4">
                                        Build a high-performing SOC with hands-on simulations, continuous measurement, and content mapped to MITRE & NIST.
                                    </p>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-slate-300">
                                            <CheckCircle className="h-4 w-4 text-blue-500" />
                                            <span>SOC Readiness Training Plans</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-300">
                                            <CheckCircle className="h-4 w-4 text-blue-500" />
                                            <span>DFIR Labs & Breach Response</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-300">
                                            <CheckCircle className="h-4 w-4 text-blue-500" />
                                            <span>Threat Intelligence Paths</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-300">
                                            <CheckCircle className="h-4 w-4 text-blue-500" />
                                            <span>Instant Team Assessments (180+ scenarios)</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Red Teams */}
                            <Card className="border-red-800 bg-gradient-to-br from-red-900/30 to-slate-900/50">
                                <CardHeader>
                                    <Flame className="h-12 w-12 text-red-500 mb-4" />
                                    <CardTitle className="text-2xl text-white">Red Teams</CardTitle>
                                    <CardDescription className="text-slate-300">
                                        Master offensive security operations
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <p className="text-sm text-slate-400 mb-4">
                                        Advanced penetration testing training with real-world infrastructure, exploits, and attack chains.
                                    </p>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-slate-300">
                                            <CheckCircle className="h-4 w-4 text-red-500" />
                                            <span>APT Simulation & Campaign Planning</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-300">
                                            <CheckCircle className="h-4 w-4 text-red-500" />
                                            <span>OT/ICS/SCADA Exploitation</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-300">
                                            <CheckCircle className="h-4 w-4 text-red-500" />
                                            <span>Cloud Infrastructure Pentesting</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-300">
                                            <CheckCircle className="h-4 w-4 text-red-500" />
                                            <span>Supply Chain Attack Scenarios</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Purple Teams */}
                            <Card className="border-purple-800 bg-gradient-to-br from-purple-900/30 to-slate-900/50">
                                <CardHeader>
                                    <Network className="h-12 w-12 text-purple-500 mb-4" />
                                    <CardTitle className="text-2xl text-white">Purple Teams</CardTitle>
                                    <CardDescription className="text-slate-300">
                                        Unified offensive & defensive excellence
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <p className="text-sm text-slate-400 mb-4">
                                        Coordinate attack and defense operations to validate security controls and improve detection capabilities.
                                    </p>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-slate-300">
                                            <CheckCircle className="h-4 w-4 text-purple-500" />
                                            <span>Coordinated Attack & Defense Exercises</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-300">
                                            <CheckCircle className="h-4 w-4 text-purple-500" />
                                            <span>TTP Validation (MITRE ATT&CK)</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-300">
                                            <CheckCircle className="h-4 w-4 text-purple-500" />
                                            <span>Detection Engineering</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-300">
                                            <CheckCircle className="h-4 w-4 text-purple-500" />
                                            <span>Tabletop & Post-Incident Reviews</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Critical Infrastructure Sectors */}
                <section id="sectors" className="py-24 bg-slate-900/50">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm text-slate-300 mb-6">
                                <Globe className="h-4 w-4" />
                                <span>CISA-Designated Sectors</span>
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-4">16 Critical Infrastructure Sectors</h2>
                            <p className="text-xl text-slate-400">Sector-specific training for America's most vital systems</p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4 mb-12">
                            {sectors.slice(0, 12).map((sector, index) => (
                                <Link key={sector.id} href={isAuthenticated ? `/sectors/${sector.slug}` : '/login'}>
                                    <Card
                                        className="group animate-fade-in-up border-slate-800 bg-slate-900/50 transition-all hover:scale-105 hover:border-blue-600 hover:bg-slate-800 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer"
                                        style={{ animationDelay: `${index * 30}ms` }}
                                    >
                                        <CardHeader>
                                            <div className="flex items-center justify-between mb-3">
                                                <Globe className="h-8 w-8" style={{ color: sector.color }} />
                                                {!isAuthenticated && <Lock className="h-4 w-4 text-slate-500" />}
                                            </div>
                                            <CardTitle className="text-sm text-white group-hover:text-blue-400 transition">
                                                {sector.name}
                                            </CardTitle>
                                            <CardDescription className="text-xs text-slate-500">
                                                {sector.simulation_modules_count} training modules
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>
                                </Link>
                            ))}
                        </div>

                        <div className="text-center">
                            <Link href={isAuthenticated ? '/sectors' : '/login'}>
                                <Button variant="outline" size="lg" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                                    View All {stats.total_sectors} Sectors →
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Additional Features Grid */}
                <section className="py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-white mb-4">Complete Training Ecosystem</h2>
                            <p className="text-xl text-slate-400">Everything you need to build cyber-ready teams</p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {[
                                {
                                    icon: Trophy,
                                    title: 'Capture The Flag',
                                    description: 'Compete in infrastructure-specific CTF challenges and tournaments',
                                    color: 'text-yellow-500',
                                },
                                {
                                    icon: AlertTriangle,
                                    title: 'Crisis Control',
                                    description: 'Executive decision-making simulations during critical incidents',
                                    color: 'text-red-500',
                                },
                                {
                                    icon: Briefcase,
                                    title: 'Talent Marketplace',
                                    description: 'Source, hire, and retain top cybersecurity professionals',
                                    color: 'text-green-500',
                                },
                                {
                                    icon: Radio,
                                    title: 'Live Sessions',
                                    description: 'Weekly instructor-led training with cybersecurity experts',
                                    color: 'text-purple-500',
                                },
                                {
                                    icon: CloudCog,
                                    title: 'Cloud Security',
                                    description: 'AWS, Azure, GCP security training and IaC scanning',
                                    color: 'text-blue-500',
                                },
                                {
                                    icon: BarChart,
                                    title: 'Advanced Analytics',
                                    description: 'Skills gap analysis, team benchmarking, and ROI tracking',
                                    color: 'text-indigo-500',
                                },
                                {
                                    icon: CheckCircle,
                                    title: 'Compliance Tracking',
                                    description: 'NIST, CMMC, PCI-DSS, HIPAA, NERC CIP compliance',
                                    color: 'text-teal-500',
                                },
                                {
                                    icon: Code,
                                    title: 'DevSecOps Training',
                                    description: 'CI/CD security, container security, and secure coding',
                                    color: 'text-orange-500',
                                },
                            ].map((feature, index) => (
                                <Card
                                    key={index}
                                    className="group border-slate-800 bg-slate-900/50 hover:border-blue-600 transition-all"
                                >
                                    <CardHeader>
                                        <feature.icon className={`h-10 w-10 ${feature.color} mb-3`} />
                                        <CardTitle className="text-lg text-white">{feature.title}</CardTitle>
                                        <CardDescription className="text-sm text-slate-400">
                                            {feature.description}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Enterprise Section */}
                <section id="enterprise" className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-12">
                            <div className="grid gap-12 lg:grid-cols-2">
                                <div>
                                    <div className="inline-flex items-center gap-2 rounded-full border border-blue-600/30 bg-blue-600/10 px-4 py-2 text-sm text-blue-400 mb-6">
                                        <Building2 className="h-4 w-4" />
                                        <span>For Organizations</span>
                                    </div>
                                    <h2 className="text-4xl font-bold text-white mb-6">
                                        The #1 Platform for Attack-Ready Teams
                                    </h2>
                                    <p className="text-lg text-slate-300 mb-8">
                                        Maximum curriculum flexibility, enhanced skills reporting, and engaging gamification features.
                                        Get a demo to see the business results.
                                    </p>

                                    <div className="space-y-3 mb-8">
                                        {[
                                            'Unmatched content library (1000+ scenarios)',
                                            'Workforce development plans',
                                            'Centralized user management',
                                            'Advanced analytics & reporting',
                                            'Source, hire, and retain talent',
                                            'Federal compliance tracking',
                                            'Dedicated success manager',
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                <span className="text-slate-300">{item}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex gap-4">
                                        <Link href="/pricing">
                                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                                Get Enterprise Demo →
                                            </Button>
                                        </Link>
                                        <Link href="/pricing">
                                            <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                                                View Pricing
                                            </Button>
                                        </Link>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <Card className="border-slate-800 bg-slate-800/50">
                                        <CardHeader>
                                            <CardTitle className="text-white">Federal Agencies</CardTitle>
                                            <CardDescription className="text-slate-400">
                                                Available on GSA Schedule. CISA, DHS, DOE, FBI trusted partner.
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>

                                    <Card className="border-slate-800 bg-slate-800/50">
                                        <CardHeader>
                                            <CardTitle className="text-white">Critical Infrastructure Operators</CardTitle>
                                            <CardDescription className="text-slate-400">
                                                Specialized training for utilities, healthcare, finance, transportation.
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>

                                    <Card className="border-slate-800 bg-slate-800/50">
                                        <CardHeader>
                                            <CardTitle className="text-white">Defense Contractors</CardTitle>
                                            <CardDescription className="text-slate-400">
                                                CMMC compliance training for DoD supply chain security requirements.
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>

                                    <div className="grid grid-cols-2 gap-4 pt-4">
                                        <div className="text-center p-4 rounded-lg border border-slate-800 bg-slate-800/30">
                                            <div className="text-2xl font-bold text-blue-500 mb-1">SOC 2</div>
                                            <div className="text-xs text-slate-400">Type II Certified</div>
                                        </div>
                                        <div className="text-center p-4 rounded-lg border border-slate-800 bg-slate-800/30">
                                            <div className="text-2xl font-bold text-blue-500 mb-1">ISO 27001</div>
                                            <div className="text-xs text-slate-400">Certified</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Community & Ratings */}
                <section className="py-16 bg-slate-900/30">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-8 md:grid-cols-3 text-center">
                            <div>
                                <div className="mb-2 text-4xl font-bold text-yellow-500">4.8★</div>
                                <div className="text-sm text-slate-400">Average Rating</div>
                                <div className="text-xs text-slate-500 mt-1">Based on 2,500+ reviews</div>
                            </div>
                            <div>
                                <div className="mb-2 text-4xl font-bold text-blue-500">{stats.total_users.toLocaleString()}+</div>
                                <div className="text-sm text-slate-400">Active Community</div>
                                <div className="text-xs text-slate-500 mt-1">Join our Discord server</div>
                            </div>
                            <div>
                                <div className="mb-2 text-4xl font-bold text-green-500">24/7</div>
                                <div className="text-sm text-slate-400">Support Available</div>
                                <div className="text-xs text-slate-500 mt-1">Enterprise customers</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-32 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
                    <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        <h2 className="text-5xl font-bold text-white mb-6">
                            Ready to Build the Best Cyber Team?
                        </h2>
                        <p className="text-xl text-slate-300 mb-12">
                            Join federal agencies, critical infrastructure operators, and defense contractors securing America's vital systems.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            {isAuthenticated ? (
                                <Link href="/dashboard">
                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-10 py-7">
                                        Go to Your Dashboard →
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/register">
                                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-10 py-7">
                                            Start Free Training →
                                        </Button>
                                    </Link>
                                    <Link href="/pricing">
                                        <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 text-lg px-8 py-6">
                                            Get Enterprise Demo
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
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
                                    <li><a href="#features" className="text-slate-400 hover:text-blue-400 transition">Features</a></li>
                                    <li><a href="#solutions" className="text-slate-400 hover:text-blue-400 transition">Solutions</a></li>
                                    <li><a href="#sectors" className="text-slate-400 hover:text-blue-400 transition">Sectors</a></li>
                                    <li><Link href="/pricing" className="text-slate-400 hover:text-blue-400 transition">Pricing</Link></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-white mb-4">Resources</h3>
                                <ul className="space-y-3 text-sm">
                                    <li><a href="https://www.cisa.gov" target="_blank" rel="noopener" className="text-slate-400 hover:text-blue-400 transition">CISA.gov</a></li>
                                    <li><a href="https://csrc.nist.gov" target="_blank" rel="noopener" className="text-slate-400 hover:text-blue-400 transition">NIST</a></li>
                                    <li><a href="#" className="text-slate-400 hover:text-blue-400 transition">Documentation</a></li>
                                    <li><a href="#" className="text-slate-400 hover:text-blue-400 transition">API</a></li>
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

                        <div className="mt-12 pt-8 border-t border-slate-800">
                            <div className="mb-6 p-4 rounded-lg border border-blue-800/50 bg-blue-900/20">
                                <p className="text-sm text-blue-300 text-center">
                                    <strong>🚀 Active Development Notice:</strong> CriticalCyberSim is currently under active development. 
                                    The platform is being built to address critical infrastructure cybersecurity training needs. 
                                    Core features are functional with ongoing enhancements planned for Q2-Q3 2026. 
                                    For partnership inquiries: business@criticalcybersim.dev
                                </p>
                            </div>
                            <p className="text-sm text-slate-500 text-center mb-2">
                                © 2026 CriticalCyberSim Platform | In Development | All rights reserved.
                            </p>
                            <p className="text-xs text-slate-600 text-center">
                                Built for America's Critical Infrastructure Protection | CISA 16 Sectors Aligned | NIST Framework Compliant
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
