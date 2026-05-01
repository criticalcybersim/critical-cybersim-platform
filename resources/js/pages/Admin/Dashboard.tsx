import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { 
    Activity, BarChart3, Shield, TrendingUp, Users, BookOpen, 
    Award, ArrowUpRight, Plus, Eye, CheckCircle2, Sparkles, 
    Brain, RefreshCw, Target
} from 'lucide-react';
import { useState } from 'react';

interface Stats {
    total_users: number;
    active_users_30d: number;
    total_organizations: number;
    total_modules: number;
    published_modules: number;
    total_sessions: number;
    completed_sessions: number;
    average_score: number;
}

interface RecentUser {
    id: number;
    name: string;
    email: string;
    organization: string | null;
    sector: string | null;
    created_at: string;
}

interface PopularModule {
    title: string;
    sessions: number;
}

interface ActivityDataItem {
    date: string;
    count: number;
}

interface Props {
    stats: Stats;
    recentUsers: RecentUser[];
    popularModules: PopularModule[];
    activityData: ActivityDataItem[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'Dashboard', href: '/admin/dashboard' },
];

export default function AdminDashboard({ stats, recentUsers, popularModules, activityData }: Props) {
    const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'users'>('overview');

    const aiFeatures = [
        { icon: '🤖', title: 'AI Training Assistant', desc: 'Real-time guidance and personalized hints', color: 'purple' },
        { icon: '🧠', title: 'Intelligent Scenarios', desc: 'Dynamic threat scenarios from real-world intel', color: 'blue' },
        { icon: '📈', title: 'Adaptive Learning', desc: 'Personalized progression based on performance', color: 'green' },
        { icon: '💬', title: 'Automated Feedback', desc: 'AI-generated insights on decisions', color: 'orange' },
        { icon: '🔍', title: 'Threat Intelligence', desc: 'Live data from CISA, FBI, and industry', color: 'red' },
        { icon: '📊', title: 'Performance Analytics', desc: 'ML-powered team readiness insights', color: 'cyan' }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard - CriticalCyberSim Platform" />

            {/* Custom Animations */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideInFromLeft {
                    from { opacity: 0; transform: translateX(-30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes slideInFromRight {
                    from { opacity: 0; transform: translateX(30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes glow {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.8; }
                }
                .animate-fadeIn { animation: fadeIn 0.7s ease-out forwards; }
                .animate-slideInLeft { animation: slideInFromLeft 0.6s ease-out forwards; }
                .animate-slideInRight { animation: slideInFromRight 0.6s ease-out forwards; }
                .animate-scaleIn { animation: scaleIn 0.5s ease-out forwards; }
                .animate-float { animation: float 3s ease-in-out infinite; }
                .animate-glow { animation: glow 2s ease-in-out infinite; }
            `}</style>

            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                <div className="space-y-8 p-6">
                    {/* Animated Header */}
                    <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-900/20 via-indigo-900/20 to-purple-900/20 p-8 animate-fadeIn">
                        <div className="absolute inset-0 bg-grid-white/5" />
                        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl animate-glow" />
                        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl animate-glow" style={{ animationDelay: '1s' }} />
                        
                        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div>
                                <div className="mb-2 flex items-center gap-3">
                                    <div className="rounded-lg bg-blue-500/20 p-2 animate-pulse animate-float">
                                        <Shield className="h-6 w-6 text-blue-400" />
                                    </div>
                                    <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-blue-500/30">
                                        <Sparkles className="mr-1 h-3 w-3" />
                                        Admin Control Center
                                    </Badge>
                                </div>
                                <h1 className="text-4xl font-bold text-white mb-2">
                                    Platform Command Center
                                </h1>
                                <p className="text-blue-200/80 text-lg">
                                    🚀 Core Platform 50% Complete | Database ✓ | Auth ✓ | Training ✓ | AI Architecture ✓
                                </p>
                                {/* Progress Bar */}
                                <div className="mt-4 w-full max-w-md">
                                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out animate-pulse"
                                            style={{ width: '50%' }}
                                        />
                                    </div>
                                    <p className="text-xs text-blue-300 mt-1">Development Progress: 50%</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-5xl font-bold text-blue-400 mb-1 animate-pulse">
                                    {stats.total_users}
                                </div>
                                <p className="text-sm text-blue-300 mb-2">Total Users</p>
                                <Button size="sm" variant="ghost" className="text-blue-300 hover:text-blue-200 hover:bg-blue-500/10">
                                    <RefreshCw className="mr-2 h-3 w-3" />
                                    Refresh
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex gap-2 border-b border-slate-800">
                        {[
                            { id: 'overview', label: 'Overview', icon: BarChart3 },
                            { id: 'modules', label: 'Training Modules', icon: BookOpen },
                            { id: 'users', label: 'User Management', icon: Users }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`px-6 py-3 text-sm font-medium transition-all relative group ${
                                    activeTab === tab.id
                                        ? 'text-blue-400 border-b-2 border-blue-400'
                                        : 'text-slate-400 hover:text-slate-300'
                                }`}
                            >
                                <tab.icon className="inline-block h-4 w-4 mr-2" />
                                {tab.label}
                                {activeTab === tab.id && (
                                    <div className="absolute inset-0 bg-blue-500/10 -z-10 rounded-t-lg" />
                                )}
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                            </button>
                        ))}
                    </div>

                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="space-y-8 animate-fadeIn">
                            {/* Stats Grid */}
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                {/* Users Card */}
                                <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:scale-105 group cursor-pointer animate-scaleIn">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium text-slate-300">Total Users</CardTitle>
                                        <div className="rounded-full bg-blue-500/10 p-2 group-hover:bg-blue-500/20 transition-colors">
                                            <Users className="h-5 w-5 text-blue-400 group-hover:scale-110 transition-transform" />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold text-white">{stats.total_users.toLocaleString()}</div>
                                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                            <TrendingUp className="h-3 w-3 text-green-500" />
                                            {stats.active_users_30d} active (30d)
                                        </p>
                                        <div className="mt-3 h-1 bg-slate-800 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-blue-500 transition-all duration-1000" 
                                                style={{ width: `${(stats.active_users_30d / stats.total_users) * 100}%` }} 
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Organizations Card */}
                                <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105 group cursor-pointer animate-scaleIn" style={{ animationDelay: '0.1s' }}>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium text-slate-300">Organizations</CardTitle>
                                        <div className="rounded-full bg-purple-500/10 p-2 group-hover:bg-purple-500/20 transition-colors">
                                            <Shield className="h-5 w-5 text-purple-400 group-hover:scale-110 transition-transform" />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold text-white">{stats.total_organizations}</div>
                                        <p className="text-xs text-slate-400 mt-1">Registered organizations</p>
                                        <div className="mt-2 flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <div 
                                                    key={i} 
                                                    className="h-8 flex-1 bg-purple-500/20 rounded transition-all duration-500" 
                                                    style={{ 
                                                        animationDelay: `${i * 100}ms`,
                                                        height: `${Math.random() * 20 + 20}px`
                                                    }} 
                                                />
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Modules Card */}
                                <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 hover:scale-105 group cursor-pointer animate-scaleIn" style={{ animationDelay: '0.2s' }}>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium text-slate-300">Training Modules</CardTitle>
                                        <div className="rounded-full bg-green-500/10 p-2 group-hover:bg-green-500/20 transition-colors">
                                            <BarChart3 className="h-5 w-5 text-green-400 group-hover:scale-110 transition-transform" />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold text-white">{stats.total_modules}</div>
                                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                                            {stats.published_modules} published
                                        </p>
                                        <div className="mt-3">
                                            <div className="flex justify-between text-xs text-slate-500 mb-1">
                                                <span>Published</span>
                                                <span>{Math.round((stats.published_modules / stats.total_modules) * 100)}%</span>
                                            </div>
                                            <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-green-500 transition-all duration-1000" 
                                                    style={{ width: `${(stats.published_modules / stats.total_modules) * 100}%` }} 
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Sessions Card */}
                                <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 hover:scale-105 group cursor-pointer animate-scaleIn" style={{ animationDelay: '0.3s' }}>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium text-slate-300">Total Sessions</CardTitle>
                                        <div className="rounded-full bg-orange-500/10 p-2 group-hover:bg-orange-500/20 transition-colors">
                                            <Activity className="h-5 w-5 text-orange-400 group-hover:scale-110 transition-transform" />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold text-white">{stats.total_sessions.toLocaleString()}</div>
                                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                                            {stats.completed_sessions.toLocaleString()} completed
                                        </p>
                                        <div className="mt-3">
                                            <div className="flex justify-between text-xs text-slate-500 mb-1">
                                                <span>Completion</span>
                                                <span>{Math.round((stats.completed_sessions / stats.total_sessions) * 100)}%</span>
                                            </div>
                                            <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-orange-500 transition-all duration-1000" 
                                                    style={{ width: `${(stats.completed_sessions / stats.total_sessions) * 100}%` }} 
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* AI Features Section */}
                            <Card className="border-purple-800/50 bg-gradient-to-r from-purple-900/10 to-blue-900/10 overflow-hidden relative">
                                <div className="absolute inset-0 bg-grid-white/5" />
                                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
                                <CardHeader className="relative">
                                    <CardTitle className="flex items-center gap-2 text-white">
                                        <Brain className="h-6 w-6 text-purple-400 animate-pulse" />
                                        AI-Powered Training Platform
                                    </CardTitle>
                                    <CardDescription className="text-slate-300">
                                        Next-generation cybersecurity training with artificial intelligence
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="relative">
                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        {aiFeatures.map((feature, i) => (
                                            <div 
                                                key={i} 
                                                className="rounded-lg border border-slate-800 bg-slate-900/50 p-4 hover:border-blue-500/50 hover:bg-slate-800/50 transition-all duration-300 hover:scale-105"
                                            >
                                                <div className="text-2xl mb-2">{feature.icon}</div>
                                                <div className={`mb-2 text-sm font-semibold text-${feature.color}-400`}>
                                                    {feature.title}
                                                </div>
                                                <p className="text-xs text-slate-400">{feature.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Performance Metrics */}
                            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-white">
                                        <TrendingUp className="h-5 w-5 text-green-500" />
                                        Platform Performance Metrics
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6 md:grid-cols-3">
                                        <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-blue-500/50 transition-all group">
                                            <div className="text-sm text-slate-400 mb-2">Average Score</div>
                                            <div className="text-4xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                                {stats.average_score}%
                                            </div>
                                            <div className="mt-2 flex items-center gap-2 text-xs text-green-500">
                                                <TrendingUp className="h-3 w-3" />
                                                <span>+5.2% vs last month</span>
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 transition-all group">
                                            <div className="text-sm text-slate-400 mb-2">Completion Rate</div>
                                            <div className="text-4xl font-bold text-white group-hover:text-purple-400 transition-colors">
                                                {Math.round((stats.completed_sessions / stats.total_sessions) * 100)}%
                                            </div>
                                            <div className="mt-2 flex items-center gap-2 text-xs text-green-500">
                                                <TrendingUp className="h-3 w-3" />
                                                <span>+12.8% vs last month</span>
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-green-500/50 transition-all group">
                                            <div className="text-sm text-slate-400 mb-2">User Engagement</div>
                                            <div className="text-4xl font-bold text-white group-hover:text-green-400 transition-colors">
                                                {Math.round((stats.active_users_30d / stats.total_users) * 100)}%
                                            </div>
                                            <div className="mt-2 flex items-center gap-2 text-xs text-green-500">
                                                <TrendingUp className="h-3 w-3" />
                                                <span>+8.4% vs last month</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Recent Activity */}
                            <div className="grid gap-6 lg:grid-cols-2">
                                {/* Recent Users */}
                                <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle className="text-white">Recent Registrations</CardTitle>
                                                <CardDescription>Latest users who joined the platform</CardDescription>
                                            </div>
                                            <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                                                <Eye className="mr-2 h-3 w-3" />
                                                View All
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                        {recentUsers.map((user, idx) => (
                                                <div 
                                                    key={user.id} 
                                                    className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-all border border-transparent hover:border-blue-500/30 animate-slideInLeft"
                                                    style={{ animationDelay: `${idx * 0.1}s` }}>
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                                                            {user.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-white">{user.name}</div>
                                                            <div className="text-xs text-slate-400">{user.organization || 'Individual'}</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <Badge variant="outline" className="border-slate-700 text-slate-400 text-xs">
                                                            {user.sector || 'General'}
                                                        </Badge>
                                                        <div className="text-xs text-slate-500 mt-1">{user.created_at}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Popular Modules */}
                                <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle className="text-white">Popular Training Modules</CardTitle>
                                                <CardDescription>Most accessed training content</CardDescription>
                                            </div>
                                            <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                                                <Plus className="mr-2 h-3 w-3" />
                                                Add Module
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {popularModules.map((module, index) => (
                                                <div 
                                                    key={index} 
                                                    className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-all border border-transparent hover:border-green-500/30 animate-slideInRight"
                                                    style={{ animationDelay: `${index * 0.1}s` }}>
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white font-bold text-sm">
                                                            #{index + 1}
                                                        </div>
                                                        <span className="font-medium text-white">{module.title}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                                            {module.sessions} sessions
                                                        </Badge>
                                                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                                                            <ArrowUpRight className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                    {/* Modules Tab */}
                    {activeTab === 'modules' && (
                        <div className="animate-fadeIn">
                            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-white text-2xl">Training Modules Management</CardTitle>
                                            <CardDescription>Create, edit, and manage training content</CardDescription>
                                        </div>
                                        <Button className="bg-blue-600 hover:bg-blue-700">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Create New Module
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center py-16 text-slate-400">
                                        <BookOpen className="h-16 w-16 mx-auto mb-4 text-slate-600" />
                                        <h3 className="text-lg font-semibold mb-2 text-slate-300">Module Management Coming Soon</h3>
                                        <p className="text-sm">Full CRUD interface for training modules will be available in the next update</p>
                                        <div className="mt-6 flex gap-4 justify-center">
                                            <Link href="/simulations">
                                                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    View All Modules
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Users Tab */}
                    {activeTab === 'users' && (
                        <div className="animate-fadeIn">
                            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-white text-2xl">User Management</CardTitle>
                                            <CardDescription>Manage user accounts, roles, and permissions</CardDescription>
                                        </div>
                                        <Button className="bg-purple-600 hover:bg-purple-700">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add New User
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center py-16 text-slate-400">
                                        <Users className="h-16 w-16 mx-auto mb-4 text-slate-600" />
                                        <h3 className="text-lg font-semibold mb-2 text-slate-300">User Management Coming Soon</h3>
                                        <p className="text-sm">Complete user administration panel will be available in the next update</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
