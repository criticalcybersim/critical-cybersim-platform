import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, usePage } from '@inertiajs/react';
import { 
    Shield, BookOpen, MessageSquare, HelpCircle, FileText, User,
    Mail, Search, ExternalLink, CheckCircle
} from 'lucide-react';
import { Head } from '@inertiajs/react';
import { type SharedData } from '@/types';

export default function SupportPage() {
    const { auth } = usePage<SharedData>().props;
    const isAuthenticated = !!auth.user;

    const faqCategories = [
        {
            title: 'Getting Started',
            icon: BookOpen,
            questions: [
                { q: 'How do I create an account?', a: 'Click "Get Started" and fill out the registration form with your details.' },
                { q: 'What sectors are available?', a: 'We cover all 16 CISA-designated critical infrastructure sectors.' },
                { q: 'Is training free?', a: 'Basic training is free. Enterprise plans available for organizations.' }
            ]
        },
        {
            title: 'Training & Simulations',
            icon: HelpCircle,
            questions: [
                { q: 'How do simulations work?', a: 'Complete realistic scenarios based on actual cyber incidents.' },
                { q: 'Can I track my progress?', a: 'Yes, view detailed analytics in your dashboard.' },
                { q: 'Are achievements transferable?', a: 'Achievements are linked to your profile and visible to organizations.' }
            ]
        },
        {
            title: 'Technical Support',
            icon: FileText,
            questions: [
                { q: 'Browser compatibility?', a: 'Chrome, Firefox, Safari, and Edge (latest versions).' },
                { q: 'Reset my password?', a: 'Use the "Forgot Password" link on the login page.' },
                { q: 'Report a bug?', a: 'Contact support@criticalcybersim.com with details.' }
            ]
        }
    ];

    const resources = [
        {
            title: 'Documentation',
            description: 'Comprehensive guides and tutorials',
            icon: BookOpen,
            link: '#docs'
        },
        {
            title: 'Video Tutorials',
            description: 'Step-by-step training videos',
            icon: ExternalLink,
            link: '#videos'
        },
        {
            title: 'Community Forum',
            description: 'Connect with other learners',
            icon: MessageSquare,
            link: '#forum'
        },
        {
            title: 'Contact Support',
            description: 'Get personalized assistance',
            icon: Mail,
            link: '/contact'
        }
    ];

    return (
        <>
            <Head title="Support & Help Center - CriticalCyberSim">
                <meta name="description" content="Get help with CriticalCyberSim. Find answers to common questions, browse documentation, and contact our support team." />
                <meta name="keywords" content="support, help, FAQ, documentation, tutorials, troubleshooting" />
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
                                <HelpCircle className="h-4 w-4" />
                                <span>Support & Help</span>
                            </div>
                            <h1 className="mb-6 text-5xl font-bold text-white sm:text-6xl">
                                How Can We
                                <span className="block animate-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto]">
                                    Help You?
                                </span>
                            </h1>
                            <p className="mx-auto max-w-3xl text-xl text-slate-300 mb-8">
                                Find answers, browse documentation, or contact our support team
                            </p>

                            {/* Search Bar */}
                            <div className="mx-auto max-w-2xl">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search for help..."
                                        className="w-full pl-12 pr-4 py-4 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Resources */}
                <section className="py-24 bg-slate-900/50">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {resources.map((resource, index) => (
                                <Link key={index} href={resource.link}>
                                    <Card className="border-slate-800 bg-slate-900/50 hover:border-blue-600 transition-all h-full cursor-pointer group">
                                        <CardHeader>
                                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/10 group-hover:bg-blue-600 transition">
                                                <resource.icon className="h-6 w-6 text-blue-500 group-hover:text-white transition" />
                                            </div>
                                            <CardTitle className="text-xl text-white">{resource.title}</CardTitle>
                                            <CardDescription className="text-slate-400">{resource.description}</CardDescription>
                                        </CardHeader>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                            <p className="text-xl text-slate-400">Find quick answers to common questions</p>
                        </div>

                        <div className="grid gap-8 lg:grid-cols-3">
                            {faqCategories.map((category, index) => (
                                <Card key={index} className="border-slate-800 bg-slate-900/50">
                                    <CardHeader>
                                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/10">
                                            <category.icon className="h-6 w-6 text-blue-500" />
                                        </div>
                                        <CardTitle className="text-2xl text-white">{category.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {category.questions.map((item, idx) => (
                                            <div key={idx}>
                                                <h3 className="font-semibold text-white mb-2 flex items-start gap-2">
                                                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                    <span>{item.q}</span>
                                                </h3>
                                                <p className="text-sm text-slate-400 ml-7">{item.a}</p>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Support CTA */}
                <section className="py-24 bg-gradient-to-r from-blue-950/50 to-purple-950/50">
                    <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        <h2 className="text-4xl font-bold text-white mb-6">Still Need Help?</h2>
                        <p className="text-xl text-slate-300 mb-8">
                            Our support team is available 24/7 to assist you with any questions or issues.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Link href="/contact">
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                    Contact Support
                                </Button>
                            </Link>
                            <a href="mailto:support@criticalcybersim.com">
                                <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                                    Email Us
                                </Button>
                            </a>
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
