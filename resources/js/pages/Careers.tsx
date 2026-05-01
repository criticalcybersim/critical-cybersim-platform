import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, usePage } from '@inertiajs/react';
import { 
    Shield, Briefcase, MapPin, Clock, DollarSign, Users, User,
    Code, Brain, Target, CheckCircle, ArrowRight
} from 'lucide-react';
import { Head } from '@inertiajs/react';
import { type SharedData } from '@/types';

export default function CareersPage() {
    const { auth } = usePage<SharedData>().props;
    const isAuthenticated = !!auth.user;

    const jobOpenings = [
        {
            title: 'Senior Full Stack Engineer',
            department: 'Engineering',
            location: 'Remote (U.S. Only)',
            type: 'Full-Time',
            salary: '$140k - $180k',
            description: 'Build the future of AI-powered cybersecurity training platforms.',
            requirements: ['React', 'Laravel', 'TypeScript', 'Security Clearance (Preferred)']
        },
        {
            title: 'Cybersecurity Instructor',
            department: 'Training',
            location: 'Remote / Hybrid',
            type: 'Full-Time',
            salary: '$120k - $160k',
            description: 'Lead hands-on training sessions for critical infrastructure organizations.',
            requirements: ['CISSP/OSCP', '5+ years SOC/Red Team', 'Teaching Experience', 'Active TS/SCI']
        },
        {
            title: 'AI/ML Engineer',
            department: 'AI Research',
            location: 'Remote',
            type: 'Full-Time',
            salary: '$160k - $220k',
            description: 'Develop autonomous AI security agents for threat simulation.',
            requirements: ['Python', 'TensorFlow/PyTorch', 'LLMs', 'Cybersecurity Knowledge']
        },
        {
            title: 'Federal Account Executive',
            department: 'Sales',
            location: 'Washington, D.C.',
            type: 'Full-Time',
            salary: '$100k - $150k + Commission',
            description: 'Build relationships with federal agencies and defense contractors.',
            requirements: ['Federal Sales Experience', 'Active Security Clearance', 'Cybersecurity Knowledge']
        },
        {
            title: 'Threat Intelligence Analyst',
            department: 'Content',
            location: 'Remote',
            type: 'Full-Time',
            salary: '$110k - $150k',
            description: 'Research emerging threats and create realistic training scenarios.',
            requirements: ['Threat Intel Experience', 'MITRE ATT&CK', 'Critical Infrastructure Knowledge']
        },
        {
            title: 'DevSecOps Engineer',
            department: 'Engineering',
            location: 'Remote',
            type: 'Full-Time',
            salary: '$130k - $170k',
            description: 'Build and secure our cloud infrastructure and CI/CD pipelines.',
            requirements: ['AWS/Azure', 'Kubernetes', 'Terraform', 'Security Best Practices']
        }
    ];

    const benefits = [
        { icon: DollarSign, title: 'Competitive Salary', description: 'Top-tier compensation with equity options' },
        { icon: Users, title: 'Remote-First', description: 'Work from anywhere in the U.S.' },
        { icon: Target, title: 'Mission-Driven', description: 'Protect America\'s critical infrastructure' },
        { icon: Brain, title: 'Learning Budget', description: '$3,000/year for conferences & training' },
        { icon: CheckCircle, title: 'Health & Wellness', description: 'Premium health, dental, vision coverage' },
        { icon: Clock, title: 'Flexible Hours', description: 'Work-life balance with unlimited PTO' }
    ];

    return (
        <>
            <Head title="Careers - CriticalCyberSim">
                <meta name="description" content="Join CriticalCyberSim and help protect America's critical infrastructure. View open positions in engineering, cybersecurity, AI, and more." />
                <meta name="keywords" content="careers, jobs, cybersecurity jobs, AI jobs, critical infrastructure, remote work" />
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

                {/* Hero */}
                <section className="relative overflow-hidden py-24">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 animate-gradient bg-[length:200%_auto]" />
                    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-600/30 bg-blue-600/10 px-4 py-2 text-sm text-blue-400">
                                <Briefcase className="h-4 w-4" />
                                <span>Join Our Mission</span>
                            </div>
                            <h1 className="mb-6 text-5xl font-bold text-white sm:text-6xl">
                                Build the Future of
                                <span className="block animate-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto]">
                                    Cybersecurity Training
                                </span>
                            </h1>
                            <p className="mx-auto max-w-3xl text-xl text-slate-300 mb-8">
                                Join a mission-driven team protecting America's critical infrastructure through AI-powered training 
                                and real-world threat simulation.
                            </p>
                            <div className="flex items-center justify-center gap-4">
                                <a href="#openings">
                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                        View Open Positions →
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits */}
                <section className="py-24 bg-slate-900/50">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-white mb-4">Why Join CriticalCyberSim?</h2>
                            <p className="text-xl text-slate-400">More than just a job—it's a mission</p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {benefits.map((benefit, index) => (
                                <Card key={index} className="border-slate-800 bg-slate-900/50">
                                    <CardHeader>
                                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/10">
                                            <benefit.icon className="h-6 w-6 text-blue-500" />
                                        </div>
                                        <CardTitle className="text-xl text-white">{benefit.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-400">{benefit.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Open Positions */}
                <section id="openings" className="py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-white mb-4">Open Positions</h2>
                            <p className="text-xl text-slate-400">{jobOpenings.length} opportunities to make an impact</p>
                        </div>

                        <div className="space-y-6">
                            {jobOpenings.map((job, index) => (
                                <Card key={index} className="border-slate-800 bg-slate-900/50 hover:border-blue-600 transition-all group">
                                    <CardHeader>
                                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                            <div>
                                                <CardTitle className="text-2xl text-white mb-2">{job.title}</CardTitle>
                                                <CardDescription className="text-slate-400">{job.description}</CardDescription>
                                            </div>
                                            <Button className="bg-blue-600 hover:bg-blue-700 w-fit">
                                                Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-4 mb-4 text-sm text-slate-400">
                                            <div className="flex items-center gap-2">
                                                <Briefcase className="h-4 w-4" />
                                                <span>{job.department}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4" />
                                                <span>{job.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4" />
                                                <span>{job.type}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="h-4 w-4" />
                                                <span>{job.salary}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {job.requirements.map((req, idx) => (
                                                <span key={idx} className="px-3 py-1 rounded-full text-xs bg-slate-800 text-slate-300 border border-slate-700">
                                                    {req}
                                                </span>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 bg-gradient-to-r from-blue-950/50 to-purple-950/50">
                    <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        <h2 className="text-4xl font-bold text-white mb-6">Don't See Your Role?</h2>
                        <p className="text-xl text-slate-300 mb-8">
                            We're always looking for talented individuals who are passionate about cybersecurity and national security.
                        </p>
                        <Link href="/contact">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                Contact Us About Opportunities
                            </Button>
                        </Link>
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
