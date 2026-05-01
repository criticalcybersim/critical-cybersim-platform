import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, usePage } from '@inertiajs/react';
import { 
    Shield, CheckCircle, X, User, Users, Building2, Zap, 
    Star, TrendingUp, Award, Target, Phone, Mail
} from 'lucide-react';
import { Head } from '@inertiajs/react';
import { type SharedData } from '@/types';

export default function PricingPage() {
    const { auth } = usePage<SharedData>().props;
    const isAuthenticated = !!auth.user;

    const pricingPlans = [
        {
            name: 'Individual',
            icon: User,
            price: 'Free',
            period: 'forever',
            description: 'Perfect for individuals learning cybersecurity fundamentals',
            popular: false,
            features: [
                { text: 'Access to basic training modules', included: true },
                { text: '3 critical infrastructure sectors', included: true },
                { text: 'Community forum access', included: true },
                { text: 'Monthly training reports', included: true },
                { text: 'Achievement badges', included: true },
                { text: 'Advanced simulations', included: false },
                { text: 'AI-powered training assistant', included: false },
                { text: 'Team collaboration', included: false },
                { text: 'Priority support', included: false }
            ],
            cta: 'Get Started Free',
            link: '/register'
        },
        {
            name: 'Professional',
            icon: Star,
            price: '$29',
            period: 'per month',
            description: 'For cybersecurity professionals advancing their careers',
            popular: true,
            features: [
                { text: 'Everything in Individual', included: true },
                { text: 'All 16 critical infrastructure sectors', included: true },
                { text: 'Advanced simulation scenarios', included: true },
                { text: 'AI-powered training assistant', included: true },
                { text: 'Blue/Red/Purple team exercises', included: true },
                { text: 'Monthly certification prep', included: true },
                { text: 'Priority email support', included: true },
                { text: 'Team collaboration', included: false },
                { text: 'Custom training paths', included: false }
            ],
            cta: 'Start Pro Trial',
            link: '/register'
        },
        {
            name: 'Team',
            icon: Users,
            price: '$99',
            period: 'per user/month',
            description: 'For small teams (5-50 users) building cyber capabilities',
            popular: false,
            features: [
                { text: 'Everything in Professional', included: true },
                { text: 'Team collaboration workspace', included: true },
                { text: 'Team performance analytics', included: true },
                { text: 'Custom training paths', included: true },
                { text: 'Bulk user management', included: true },
                { text: 'SSO integration (SAML)', included: true },
                { text: 'Dedicated account manager', included: true },
                { text: '24/7 priority support', included: true },
                { text: 'Federal compliance reporting', included: false }
            ],
            cta: 'Contact Sales',
            link: '/contact'
        },
        {
            name: 'Enterprise',
            icon: Building2,
            price: 'Custom',
            period: 'pricing',
            description: 'For organizations, agencies, and large-scale deployments',
            popular: false,
            features: [
                { text: 'Everything in Team', included: true },
                { text: 'Unlimited users', included: true },
                { text: 'Federal compliance reporting', included: true },
                { text: 'Custom content development', included: true },
                { text: 'On-premise deployment option', included: true },
                { text: 'Dedicated infrastructure', included: true },
                { text: 'Custom integrations & API', included: true },
                { text: 'White-label options', included: true },
                { text: 'Executive briefings & training', included: true }
            ],
            cta: 'Get Enterprise Demo',
            link: '/contact'
        }
    ];

    const features = [
        {
            icon: Target,
            title: 'Realistic Simulations',
            description: 'Train with scenarios based on real-world critical infrastructure incidents'
        },
        {
            icon: Zap,
            title: 'AI-Powered Learning',
            description: 'Adaptive training paths powered by artificial intelligence'
        },
        {
            icon: Award,
            title: 'Industry Recognition',
            description: 'Earn certificates recognized by federal agencies and enterprises'
        },
        {
            icon: TrendingUp,
            title: 'Progress Tracking',
            description: 'Detailed analytics and skills gap analysis for teams'
        }
    ];

    const faqs = [
        {
            q: 'Can I try before I buy?',
            a: 'Yes! Start with our free Individual plan. Professional plan includes a 14-day free trial.'
        },
        {
            q: 'What payment methods do you accept?',
            a: 'We accept all major credit cards, ACH transfers, and purchase orders for enterprise customers.'
        },
        {
            q: 'Can I upgrade or downgrade anytime?',
            a: 'Absolutely. You can change your plan at any time, and we\'ll prorate the charges.'
        },
        {
            q: 'Is there a federal discount?',
            a: 'Yes, we offer special pricing for federal agencies, state/local governments, and educational institutions.'
        },
        {
            q: 'What about data security?',
            a: 'We\'re SOC 2 Type II certified with data encrypted at rest and in transit. FedRAMP authorization in progress.'
        }
    ];

    return (
        <>
            <Head title="Pricing - CriticalCyberSim">
                <meta name="description" content="Choose the perfect plan for your cybersecurity training needs. Free tier available, with Professional, Team, and Enterprise options." />
                <meta name="keywords" content="pricing, plans, cybersecurity training cost, enterprise security training" />
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
                                <Star className="h-4 w-4" />
                                <span>Transparent Pricing</span>
                            </div>
                            <h1 className="mb-6 text-5xl font-bold text-white sm:text-6xl">
                                Choose Your
                                <span className="block animate-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto]">
                                    Perfect Plan
                                </span>
                            </h1>
                            <p className="mx-auto max-w-3xl text-xl text-slate-300">
                                From individuals to enterprise organizations. Start free, upgrade anytime.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Pricing Cards */}
                <section className="py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-8 lg:grid-cols-4">
                            {pricingPlans.map((plan, index) => (
                                <Card 
                                    key={index} 
                                    className={`relative border-slate-800 bg-slate-900/50 transition-all hover:border-blue-600 ${
                                        plan.popular ? 'ring-2 ring-blue-600 scale-105' : ''
                                    }`}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1 text-sm font-semibold text-white">
                                            Most Popular
                                        </div>
                                    )}
                                    <CardHeader>
                                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/10">
                                            <plan.icon className="h-6 w-6 text-blue-500" />
                                        </div>
                                        <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                                        <CardDescription className="text-slate-400 min-h-[40px]">
                                            {plan.description}
                                        </CardDescription>
                                        <div className="mt-6">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-4xl font-bold text-white">{plan.price}</span>
                                                {plan.price !== 'Free' && plan.price !== 'Custom' && (
                                                    <span className="text-slate-400">/{plan.period}</span>
                                                )}
                                                {plan.price === 'Custom' && (
                                                    <span className="text-slate-400">{plan.period}</span>
                                                )}
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <Link href={plan.link}>
                                            <Button 
                                                className={`w-full mb-6 ${
                                                    plan.popular 
                                                        ? 'bg-blue-600 hover:bg-blue-700' 
                                                        : 'bg-slate-800 hover:bg-slate-700'
                                                }`}
                                            >
                                                {plan.cta}
                                            </Button>
                                        </Link>

                                        <ul className="space-y-3">
                                            {plan.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    {feature.included ? (
                                                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                    ) : (
                                                        <X className="h-5 w-5 text-slate-600 flex-shrink-0 mt-0.5" />
                                                    )}
                                                    <span className={`text-sm ${feature.included ? 'text-slate-300' : 'text-slate-600'}`}>
                                                        {feature.text}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="py-24 bg-slate-900/50">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-white mb-4">Included in All Paid Plans</h2>
                            <p className="text-xl text-slate-400">Enterprise-grade features for critical infrastructure protection</p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {features.map((feature, index) => (
                                <Card key={index} className="border-slate-800 bg-slate-900/50 text-center">
                                    <CardHeader>
                                        <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/10">
                                            <feature.icon className="h-6 w-6 text-blue-500" />
                                        </div>
                                        <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-slate-400">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Enterprise CTA */}
                <section className="py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <Card className="border-slate-800 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
                            <CardContent className="p-12">
                                <div className="grid gap-8 lg:grid-cols-2 items-center">
                                    <div>
                                        <h2 className="text-4xl font-bold text-white mb-4">Enterprise Solutions</h2>
                                        <p className="text-lg text-slate-300 mb-6">
                                            Custom pricing for federal agencies, large organizations, and defense contractors. 
                                            Get dedicated support, custom content, and flexible deployment options.
                                        </p>
                                        <ul className="space-y-3 mb-8">
                                            {[
                                                'Volume discounts available',
                                                'GSA Schedule & federal procurement',
                                                'On-premise deployment options',
                                                'Custom SLA & support agreements',
                                                'Dedicated training development'
                                            ].map((item, idx) => (
                                                <li key={idx} className="flex items-center gap-3">
                                                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                    <span className="text-slate-300">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex flex-wrap gap-4">
                                            <Link href="/contact">
                                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                                    <Mail className="mr-2 h-4 w-4" />
                                                    Request Demo
                                                </Button>
                                            </Link>
                                            <a href="tel:+15551234567">
                                                <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                                                    <Phone className="mr-2 h-4 w-4" />
                                                    Call Sales
                                                </Button>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <Card className="border-slate-800 bg-slate-900/50">
                                            <CardHeader>
                                                <CardTitle className="text-white">Trusted By</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="grid grid-cols-3 gap-4 text-center">
                                                    {['DHS', 'CISA', 'DOE', 'FBI', 'NSA', 'DOD'].map((agency) => (
                                                        <div key={agency} className="text-lg font-bold text-slate-400">
                                                            {agency}
                                                        </div>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <Card className="border-slate-800 bg-slate-900/50">
                                            <CardHeader>
                                                <CardTitle className="text-white">Certifications</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-2 text-sm text-slate-300">
                                                    <div className="flex items-center gap-2">
                                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                                        <span>SOC 2 Type II Certified</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                                        <span>ISO 27001 Certified</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <CheckCircle className="h-4 w-4 text-blue-500" />
                                                        <span>FedRAMP Ready (In Progress)</span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-24 bg-slate-900/50">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                            <p className="text-xl text-slate-400">Everything you need to know about pricing</p>
                        </div>

                        <div className="space-y-6">
                            {faqs.map((faq, index) => (
                                <Card key={index} className="border-slate-800 bg-slate-900/50">
                                    <CardHeader>
                                        <CardTitle className="text-lg text-white">{faq.q}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-400">{faq.a}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <p className="text-slate-400 mb-4">Still have questions?</p>
                            <Link href="/contact">
                                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                                    Contact Our Team
                                </Button>
                            </Link>
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
