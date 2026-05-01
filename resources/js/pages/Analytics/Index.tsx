import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Activity, Award, BarChart3, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface Analytics {
    overview: {
        total_points: number;
        level: number;
        level_name: string;
        current_streak: number;
        total_simulations_completed: number;
        average_score: number;
        completion_rate: number;
        total_time_spent: number;
        achievements_earned: number;
    };
    progress_over_time: Array<{
        date: string;
        score: number;
        module: string;
    }>;
    skills_by_control_family: Array<{
        family: string;
        code: string;
        score: number;
        count: number;
        color: string;
    }>;
    sector_completion: Array<{
        sector: string;
        completed: number;
        total: number;
        percentage: number;
        color: string;
    }>;
    recent_sessions: Array<{
        id: number;
        module: string;
        sector: string;
        status: string;
        score: number | null;
        passed: boolean | null;
        duration: string;
        date: string;
    }>;
    achievements_earned: Array<{
        name: string;
        description: string;
        icon: string;
        rarity: string;
        color: string;
        earned_at: string;
    }>;
    strengths_and_weaknesses: {
        strengths: Array<{ area: string; score: number }>;
        weaknesses: Array<{ area: string; score: number; recommendation: string }>;
    };
}

interface Props {
    analytics: Analytics;
    period: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Analytics', href: '/analytics' },
];

export default function AnalyticsIndex({ analytics, period }: Props) {
    const [selectedPeriod, setSelectedPeriod] = useState(period);

    const handlePeriodChange = (value: string) => {
        setSelectedPeriod(value);
        router.get('/analytics', { period: value }, { preserveState: true });
    };

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${mins}m`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Analytics" />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Performance Analytics</h1>
                        <p className="text-muted-foreground">Comprehensive insights into your cybersecurity training progress</p>
                    </div>
                    <Select value={selectedPeriod} onValueChange={handlePeriodChange}>
                        <SelectTrigger className="w-40">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7d">Last 7 Days</SelectItem>
                            <SelectItem value="30d">Last 30 Days</SelectItem>
                            <SelectItem value="90d">Last 90 Days</SelectItem>
                            <SelectItem value="all">All Time</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Overview Stats */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
                            <Award className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{analytics.overview.total_points.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">{analytics.overview.level_name}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{analytics.overview.average_score}%</div>
                            <p className="text-xs text-muted-foreground">{analytics.overview.completion_rate}% completion rate</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Time Invested</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatTime(analytics.overview.total_time_spent)}</div>
                            <p className="text-xs text-muted-foreground">{analytics.overview.total_simulations_completed} simulations</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{analytics.overview.achievements_earned}</div>
                            <p className="text-xs text-muted-foreground">{analytics.overview.current_streak} day streak</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Grid */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Skills by NIST Control Family */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Skills by NIST Control Family</CardTitle>
                            <CardDescription>Your proficiency across security control domains</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {analytics.skills_by_control_family && analytics.skills_by_control_family.length > 0 ? (
                                analytics.skills_by_control_family.map((skill) => (
                                <div key={skill.code}>
                                    <div className="mb-1 flex items-center justify-between text-sm">
                                        <span className="font-medium">
                                            {skill.code} - {skill.family}
                                        </span>
                                        <span className="text-muted-foreground">
                                            {skill.score}% ({skill.count} modules)
                                        </span>
                                    </div>
                                    <Progress value={skill.score} className="h-2" style={{ '--progress-background': skill.color } as React.CSSProperties} />
                                </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground">Complete simulations to see your skills breakdown</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Sector Completion */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Sector Completion</CardTitle>
                            <CardDescription>Progress across critical infrastructure sectors</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {analytics.sector_completion && analytics.sector_completion.length > 0 ? (
                                analytics.sector_completion.slice(0, 6).map((sector) => (
                                <div key={sector.sector}>
                                    <div className="mb-1 flex items-center justify-between text-sm">
                                        <span className="font-medium">{sector.sector}</span>
                                        <span className="text-muted-foreground">
                                            {sector.completed}/{sector.total} ({sector.percentage}%)
                                        </span>
                                    </div>
                                    <Progress value={sector.percentage} className="h-2" style={{ '--progress-background': sector.color } as React.CSSProperties} />
                                </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground">Complete simulations to see sector progress</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Strengths */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Strengths</CardTitle>
                            <CardDescription>Areas where you excel</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {analytics.strengths_and_weaknesses.strengths.length > 0 ? (
                                <div className="space-y-3">
                                    {analytics.strengths_and_weaknesses.strengths.map((strength, index) => (
                                        <div key={index} className="rounded-lg border bg-green-500/5 p-3">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">{strength.area}</span>
                                                <span className="text-sm text-green-600">{strength.score}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">Complete more simulations to identify your strengths</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Weaknesses */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Areas for Improvement</CardTitle>
                            <CardDescription>Focus areas for your development</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {analytics.strengths_and_weaknesses.weaknesses.length > 0 ? (
                                <div className="space-y-3">
                                    {analytics.strengths_and_weaknesses.weaknesses.map((weakness, index) => (
                                        <div key={index} className="rounded-lg border bg-orange-500/5 p-3">
                                            <div className="mb-1 flex items-center justify-between">
                                                <span className="font-medium">{weakness.area}</span>
                                                <span className="text-sm text-orange-600">{weakness.score}%</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground">{weakness.recommendation}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">No weak areas identified - great job!</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Sessions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Training Sessions</CardTitle>
                        <CardDescription>Your latest simulation activities</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Module</TableHead>
                                    <TableHead>Sector</TableHead>
                                    <TableHead>Score</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead>Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {analytics.recent_sessions.map((session) => (
                                    <TableRow key={session.id}>
                                        <TableCell className="font-medium">{session.module}</TableCell>
                                        <TableCell>{session.sector}</TableCell>
                                        <TableCell>
                                            {session.score !== null ? (
                                                <span className={session.passed ? 'text-green-600' : 'text-red-600'}>{session.score}%</span>
                                            ) : (
                                                '-'
                                            )}
                                        </TableCell>
                                        <TableCell>{session.duration}</TableCell>
                                        <TableCell className="text-muted-foreground">{session.date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
