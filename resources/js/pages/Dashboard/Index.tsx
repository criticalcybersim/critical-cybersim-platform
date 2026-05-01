import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Activity, Award, CheckCircle, Flame, TrendingUp, Trophy } from 'lucide-react';

interface Stats {
    total_points: number;
    level: number;
    level_name: string;
    level_color: string;
    progress_to_next_level: number;
    current_streak: number;
    simulations_completed: number;
    average_score: number;
    completion_rate: number;
}

interface Session {
    id: number;
    module: string;
    sector: string;
    status: string;
    score: number | null;
    passed: boolean | null;
    date: string;
}

interface Module {
    id: number;
    title: string;
    description: string;
    difficulty_level: string;
    sector: {
        name: string;
        color: string;
    };
}

interface SectorProgress {
    sector: string;
    completed: number;
    total: number;
    percentage: number;
    color: string;
}

interface LeaderboardEntry {
    rank: number;
    name: string;
    points: number;
    level: string;
    level_name: string;
    streak: number;
}

interface Achievement {
    id: number;
    title: string;
    description: string;
    icon: string;
    earned_at: string;
}

interface Props {
    stats: Stats;
    recentSessions: Session[];
    recommendedModules: Module[];
    sectorCompletion: SectorProgress[];
    recentAchievements: Achievement[];
    leaderboard: LeaderboardEntry[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function DashboardPage({ 
    stats, 
    recentSessions = [], 
    recommendedModules = [], 
    sectorCompletion = [], 
    recentAchievements = [], 
    leaderboard = [] 
}: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="space-y-6 p-6">
                {/* Welcome Section */}
                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back! Here's your cybersecurity training progress.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {/* Level Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Current Level</CardTitle>
                            <Trophy className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold" style={{ color: stats.level_color }}>
                                {stats.level_name}
                            </div>
                            <p className="text-xs text-muted-foreground">Level {stats.level}</p>
                            <Progress value={stats.progress_to_next_level} className="mt-2" />
                            <p className="mt-1 text-xs text-muted-foreground">{stats.progress_to_next_level}% to next level</p>
                        </CardContent>
                    </Card>

                    {/* Points Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
                            <Award className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_points.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">{stats.simulations_completed} simulations completed</p>
                        </CardContent>
                    </Card>

                    {/* Streak Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
                            <Flame className="h-4 w-4 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.current_streak} days</div>
                            <p className="text-xs text-muted-foreground">Keep training daily!</p>
                        </CardContent>
                    </Card>

                    {/* Performance Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.average_score}%</div>
                            <p className="text-xs text-muted-foreground">{stats.completion_rate}% completion rate</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Grid */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Recent Sessions */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Recent Sessions</CardTitle>
                            <CardDescription>Your latest simulation activities</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {recentSessions.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Module</TableHead>
                                            <TableHead>Sector</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Score</TableHead>
                                            <TableHead>Date</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {recentSessions && recentSessions.length > 0 ? (
                                            recentSessions.map((session) => (
                                                <TableRow key={session.id}>
                                                <TableCell className="font-medium">{session.module}</TableCell>
                                                <TableCell>{session.sector}</TableCell>
                                                <TableCell>
                                                    <Badge variant={session.status === 'completed' ? 'default' : 'secondary'}>{session.status}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {session.score !== null ? (
                                                        <span className={session.passed ? 'text-green-600' : 'text-red-600'}>{session.score}%</span>
                                                    ) : (
                                                        '-'
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">{session.date}</TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center text-muted-foreground">
                                                    No recent sessions yet. Start a simulation to see your activity here.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            ) : (
                                <div className="py-8 text-center text-muted-foreground">
                                    <Activity className="mx-auto mb-2 h-12 w-12 opacity-20" />
                                    <p>No sessions yet. Start your first simulation!</p>
                                    <Link href="/simulations">
                                        <Button className="mt-4">Browse Simulations</Button>
                                    </Link>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Recommended Modules */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recommended for You</CardTitle>
                            <CardDescription>Personalized training modules</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {recommendedModules && recommendedModules.length > 0 ? (
                                recommendedModules.map((module: Module) => (
                                    <div key={module.id} className="rounded-lg border p-3">
                                        <div className="mb-2 flex items-start justify-between">
                                            <h4 className="font-semibold">{module.title}</h4>
                                            <Badge variant="outline" className="text-xs">
                                                {module.difficulty_level}
                                            </Badge>
                                        </div>
                                        <p className="mb-2 text-xs text-muted-foreground line-clamp-2">{module.description}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs" style={{ color: module.sector.color }}>
                                                {module.sector.name}
                                            </span>
                                            <Link href={`/simulations/${module.id}`}>
                                                <Button size="sm" variant="ghost">
                                                Start
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))
                            ) : (
                                <p className="text-sm text-muted-foreground">No recommended modules available yet. Complete some simulations to get personalized recommendations.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sector Completion & Leaderboard */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Sector Completion */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Sector Progress</CardTitle>
                            <CardDescription>Your completion across critical infrastructure sectors</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {sectorCompletion && sectorCompletion.length > 0 ? (
                                sectorCompletion.slice(0, 5).map((sector) => (
                                <div key={sector.sector}>
                                    <div className="mb-1 flex items-center justify-between text-sm">
                                        <span className="font-medium">{sector.sector}</span>
                                        <span className="text-muted-foreground">
                                            {sector.completed}/{sector.total}
                                        </span>
                                    </div>
                                    <Progress value={sector.percentage} className="h-2" style={{ '--progress-background': sector.color } as React.CSSProperties} />
                                </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground">Complete simulations to see sector progress.</p>
                            )}
                            <Link href="/sectors">
                                <Button variant="outline" className="w-full">
                                    View All Sectors
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Leaderboard */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Leaderboard</CardTitle>
                            <CardDescription>Top performers this month</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {leaderboard && leaderboard.length > 0 ? (
                                    leaderboard.slice(0, 5).map((entry) => (
                                    <div key={entry.rank} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                                    entry.rank === 1
                                                        ? 'bg-yellow-500/20 text-yellow-500'
                                                        : entry.rank === 2
                                                          ? 'bg-gray-500/20 text-gray-400'
                                                          : entry.rank === 3
                                                            ? 'bg-orange-500/20 text-orange-500'
                                                            : 'bg-muted text-muted-foreground'
                                                }`}
                                            >
                                                {entry.rank}
                                            </div>
                                            <div>
                                                <div className="font-medium">{entry.name}</div>
                                                <div className="text-xs text-muted-foreground">{entry.level_name}</div>
                                            </div>
                                        </div>
                                        <div className="font-semibold">{entry.points?.toLocaleString() || 0}</div>
                                    </div>
                                ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">No leaderboard data available yet.</p>
                                )}
                            </div>
                            <Link href="/leaderboard">
                                <Button variant="outline" className="mt-4 w-full">
                                    View Full Leaderboard
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Achievements */}
                {recentAchievements.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Achievements</CardTitle>
                            <CardDescription>Your latest accomplishments</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
                                {recentAchievements.map((achievement, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center rounded-lg border p-4 text-center"
                                        style={{ borderColor: achievement.badge_color }}
                                    >
                                        <Award className="mb-2 h-10 w-10" style={{ color: achievement.badge_color }} />
                                        <h4 className="mb-1 text-sm font-semibold">{achievement.name}</h4>
                                        <p className="text-xs text-muted-foreground">{achievement.rarity}</p>
                                    </div>
                                ))}
                            </div>
                            <Link href="/achievements">
                                <Button variant="outline" className="mt-4 w-full">
                                    View All Achievements
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
