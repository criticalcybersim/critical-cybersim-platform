import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Award, BookOpen, Clock, Target, TrendingUp, Zap, Trophy, Activity } from 'lucide-react';

interface Module {
    id: number;
    title: string;
    sector: { name: string };
    difficulty_level: string;
    scenarios_count: number;
}

interface Progress {
    id: number;
    module: Module;
    completion_percentage: number;
    completion_status: string;
    points_earned: number;
    scenarios_completed: number;
    scenarios_total: number;
    last_accessed_at: string;
}

interface Session {
    id: number;
    module: { title: string };
    score: number;
    status: string;
    created_at: string;
}

interface Achievement {
    id: number;
    name: string;
    description: string;
    icon: string;
    earned_at: string;
}

interface Props {
    progress: Progress[];
    availableModules: Module[];
    recentSessions: Session[];
    achievements: Achievement[];
    stats: {
        total_modules: number;
        completed_modules: number;
        in_progress_modules: number;
        total_points: number;
        total_sessions: number;
        completed_sessions: number;
        average_score: number;
        total_time_spent: number;
        achievements_count: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Learning', href: '/learning' },
];

export default function LearningDashboard({ progress, availableModules, recentSessions, achievements, stats }: Props) {
    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Learning Dashboard" />

            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                <div className="space-y-8 p-6">
                    {/* Header */}
                    <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-900/20 via-indigo-900/20 to-purple-900/20 p-8">
                        <div className="absolute inset-0 bg-grid-white/5" />
                        <div className="absolute -right-20 -top-20 h-64 w-64 animate-pulse rounded-full bg-blue-500/10 blur-3xl" />
                        
                        <div className="relative">
                            <h1 className="text-4xl font-bold text-white mb-2">My Learning Journey</h1>
                            <p className="text-blue-200/80 text-lg">Track your progress and continue your cybersecurity training</p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-blue-500/50 transition-all">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-slate-300">Total Points</CardTitle>
                                <Trophy className="h-5 w-5 text-yellow-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-white">{stats.total_points.toLocaleString()}</div>
                                <p className="text-xs text-slate-400 mt-1">{stats.achievements_count} achievements earned</p>
                            </CardContent>
                        </Card>

                        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-green-500/50 transition-all">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-slate-300">Modules Completed</CardTitle>
                                <BookOpen className="h-5 w-5 text-green-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-white">{stats.completed_modules}/{stats.total_modules}</div>
                                <p className="text-xs text-slate-400 mt-1">{stats.in_progress_modules} in progress</p>
                            </CardContent>
                        </Card>

                        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-purple-500/50 transition-all">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-slate-300">Average Score</CardTitle>
                                <Target className="h-5 w-5 text-purple-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-white">{Math.round(stats.average_score)}%</div>
                                <p className="text-xs text-slate-400 mt-1">{stats.completed_sessions} sessions completed</p>
                            </CardContent>
                        </Card>

                        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-orange-500/50 transition-all">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-slate-300">Time Spent</CardTitle>
                                <Clock className="h-5 w-5 text-orange-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-white">{formatTime(stats.total_time_spent)}</div>
                                <p className="text-xs text-slate-400 mt-1">Total learning time</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Left Column - Progress */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* In Progress Modules */}
                            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-white">Continue Learning</CardTitle>
                                    <CardDescription>Pick up where you left off</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {progress.filter(p => p.completion_status === 'in_progress').slice(0, 3).map((item) => (
                                        <div key={item.id} className="p-4 rounded-lg bg-slate-800/30 border border-slate-700 hover:border-blue-500/50 transition-all">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white">{item.module.title}</h3>
                                                    <p className="text-sm text-slate-400">{item.module.sector.name}</p>
                                                </div>
                                                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                                    {item.completion_percentage}%
                                                </Badge>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm text-slate-400">
                                                    <span>{item.scenarios_completed}/{item.scenarios_total} scenarios</span>
                                                    <span>{item.points_earned} points</span>
                                                </div>
                                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                                                        style={{ width: `${item.completion_percentage}%` }}
                                                    />
                                                </div>
                                            </div>
                                            <Link href={`/simulations/${item.module.id}`}>
                                                <Button size="sm" className="mt-3 bg-blue-600 hover:bg-blue-700">
                                                    Continue Training
                                                </Button>
                                            </Link>
                                        </div>
                                    ))}
                                    {progress.filter(p => p.completion_status === 'in_progress').length === 0 && (
                                        <p className="text-center text-slate-400 py-8">No modules in progress. Start a new one below!</p>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Available Modules */}
                            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-white">Available Modules</CardTitle>
                                    <CardDescription>Start new training modules</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {availableModules.slice(0, 4).map((module) => (
                                            <div key={module.id} className="p-4 rounded-lg bg-slate-800/30 border border-slate-700 hover:border-green-500/50 transition-all">
                                                <h3 className="text-base font-semibold text-white mb-2">{module.title}</h3>
                                                <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                                                    <BookOpen className="h-4 w-4" />
                                                    <span>{module.scenarios_count} scenarios</span>
                                                </div>
                                                <Link href={`/simulations/${module.id}`}>
                                                    <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 w-full">
                                                        Start Module
                                                    </Button>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                    <Link href="/simulations">
                                        <Button variant="outline" className="w-full mt-4 border-slate-700 text-slate-300 hover:bg-slate-800">
                                            View All Modules
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column - Activity & Achievements */}
                        <div className="space-y-6">
                            {/* Recent Activity */}
                            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center gap-2">
                                        <Activity className="h-5 w-5 text-blue-400" />
                                        Recent Activity
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {recentSessions.map((session) => (
                                            <div key={session.id} className="p-3 rounded-lg bg-slate-800/30 border border-slate-700">
                                                <p className="text-sm font-medium text-white">{session.module.title}</p>
                                                <div className="flex items-center justify-between mt-2">
                                                    <span className="text-xs text-slate-400">
                                                        Score: {session.score}%
                                                    </span>
                                                    <Badge 
                                                        className={
                                                            session.status === 'completed'
                                                                ? 'bg-green-500/20 text-green-400 border-green-500/30 text-xs'
                                                                : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs'
                                                        }
                                                    >
                                                        {session.status}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Link href="/learning/history">
                                        <Button variant="outline" className="w-full mt-4 border-slate-700 text-slate-300 hover:bg-slate-800 text-sm">
                                            View Full History
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>

                            {/* Achievements */}
                            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center gap-2">
                                        <Award className="h-5 w-5 text-yellow-400" />
                                        Recent Achievements
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {achievements.map((achievement) => (
                                            <div key={achievement.id} className="p-3 rounded-lg bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-700/30">
                                                <div className="flex items-center gap-3">
                                                    <div className="text-2xl">{achievement.icon}</div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-yellow-300">{achievement.name}</p>
                                                        <p className="text-xs text-slate-400">{achievement.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Link href="/achievements">
                                        <Button variant="outline" className="w-full mt-4 border-slate-700 text-slate-300 hover:bg-slate-800 text-sm">
                                            View All Achievements
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
