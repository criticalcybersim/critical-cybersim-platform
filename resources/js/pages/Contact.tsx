import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, usePage } from '@inertiajs/react';
import { 
    Shield, Mail, Phone, MapPin, User, MessageSquare, Building2,
    Send, CheckCircle
} from 'lucide-react';
import { Head } from '@inertiajs/react';
import { type SharedData } from '@/types';

export default function ContactPage() {
    const { auth } = usePage<SharedData>().props;
    const isAuthenticated = !!auth.user;

    const contactMethods = [
        {
            icon: Mail,
            title: 'General Inquiries',
            description: 'Questions about the platform',
            contact: 'info@criticalcybersim.dev',
            action: 'Send Email'
        },
        {
            icon: Building2,
            title: 'Business Development',
            description: 'Partnerships & collaboration',
            contact: 'business@criticalcybersim.dev',
            action: 'Contact Us'
        },
        {
            icon: Building2,
            title: 'Enterprise Inquiries',
            description: 'Organizations & federal agencies',
            contact: 'enterprise@criticalcybersim.dev',
            action: 'Contact Sales'
        },
        {
            icon: MessageSquare,
            title: 'Development Updates',
            description: 'Platform development progress',
            contact: 'updates@criticalcybersim.dev',
            action: 'Subscribe'
        }
    ];

    return (
        <>
            <Head title="Contact Us - CriticalCyberSim">
                <meta name="description" content="Get in touch with CriticalCyberSim for enterprise inquiries, support, or general questions about our cybersecurity training platform." />
                <meta name="keywords" content="contact, support, sales, enterprise, help, cybersecurity training" />
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
                                <MessageSquare className="h-4 w-4" />
                                <span>Get In Touch</span>
                            </div>
                            <h1 className="mb-6 text-5xl font-bold text-white sm:text-6xl">
                                Contact
                                <span className="block animate-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto]">
                                    CriticalCyberSim
                                </span>
                            </h1>
                            <p className="mx-auto max-w-3xl text-xl text-slate-300">
                                Have questions about our platform? Need enterprise support? We're here to help.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Methods */}
                <section className="py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {contactMethods.map((method, index) => (
                                <Card key={index} className="border-slate-800 bg-slate-900/50 hover:border-blue-600 transition-all">
                                    <CardHeader>
                                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/10">
                                            <method.icon className="h-6 w-6 text-blue-500" />
                                        </div>
                                        <CardTitle className="text-xl text-white">{method.title}</CardTitle>
                                        <CardDescription className="text-slate-400">{method.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-blue-400 font-medium mb-4">{method.contact}</p>
                                        <Button variant="outline" size="sm" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800">
                                            {method.action}
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Form */}
                <section className="py-24 bg-slate-900/50">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-white mb-4">Send Us a Message</h2>
                            <p className="text-xl text-slate-400">We'll respond within 24 hours</p>
                        </div>

                        <Card className="border-slate-800 bg-slate-900/50">
                            <CardContent className="pt-6">
                                <form className="space-y-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                                                placeholder="John Doe"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                                                placeholder="john@example.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div>
                                            <label htmlFor="organization" className="block text-sm font-medium text-slate-300 mb-2">
                                                Organization
                                            </label>
                                            <input
                                                type="text"
                                                id="organization"
                                                className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                                                placeholder="Your Organization"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                                                Subject *
                                            </label>
                                            <select
                                                id="subject"
                                                className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                                                required
                                            >
                                                <option value="">Select a topic</option>
                                                <option value="sales">Enterprise Sales</option>
                                                <option value="support">Technical Support</option>
                                                <option value="general">General Inquiry</option>
                                                <option value="partnership">Partnership</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={6}
                                            className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition resize-none"
                                            placeholder="Tell us how we can help you..."
                                            required
                                        />
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            id="consent"
                                            className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500"
                                            required
                                        />
                                        <label htmlFor="consent" className="text-sm text-slate-400">
                                            I agree to CriticalCyberSim's <Link href="/privacy" className="text-blue-400 hover:text-blue-300">Privacy Policy</Link> and consent to be contacted about my inquiry.
                                        </label>
                                    </div>

                                    <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                                        Send Message <Send className="ml-2 h-4 w-4" />
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Office Location */}
                <section className="py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-2">
                            <div>
                                <h2 className="text-4xl font-bold text-white mb-6">Visit Our Office</h2>
                                <p className="text-lg text-slate-300 mb-8">
                                    Located in the heart of Washington, D.C., near federal agencies and critical infrastructure organizations.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-blue-600/10 flex items-center justify-center">
                                            <MapPin className="h-5 w-5 text-blue-500" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white mb-1">Address</h3>
                                            <p className="text-slate-400">1776 Pennsylvania Ave NW<br />Washington, DC 20006</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-blue-600/10 flex items-center justify-center">
                                            <Phone className="h-5 w-5 text-blue-500" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white mb-1">Phone</h3>
                                            <p className="text-slate-400">+1 (555) 123-4567</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-blue-600/10 flex items-center justify-center">
                                            <Mail className="h-5 w-5 text-blue-500" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white mb-1">Email</h3>
                                            <p className="text-slate-400">contact@criticalcybersim.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Card className="border-slate-800 bg-slate-900/50">
                                <CardContent className="p-0">
                                    <div className="h-[400px] bg-slate-800 rounded-lg flex items-center justify-center">
                                        <div className="text-center">
                                            <MapPin className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                                            <p className="text-slate-500">Map Integration</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
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
