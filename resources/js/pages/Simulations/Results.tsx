import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Award, CheckCircle, Clock, Home, RefreshCw, Target, TrendingUp, XCircle } from 'lucide-react';

interface Session {
    id: number;
    status: string;
    percentage_score: number;
    points_earned: number;
    time_spent_seconds: number;
    is_passed: boolean;
    mistakes_made: Array<{
        scenario_title: string;
        action_taken: string;
        correct_action: string;
    }>;
    ai_feedback: string;
    module: {
        id: number;
        title: string;
        slug: string;
        sector: {
            name: string;
            color: string;
        };
    };
}

interface Props {
    session: Session;
}

export default function SimulationResults({ session }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Simulations', href: '/simulations' },
        { title: 'Results', href: '#' },
    ];

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins} min ${secs} sec`;
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-500';
        if (score >= 80) return 'text-blue-500';
        if (score >= 70) return 'text-yellow-500';
        return 'text-red-500';
    };

    const getScoreMessage = (score: number) => {
        if (score >= 90) return 'Outstanding Performance!';
        if (score >= 80) return 'Great Job!';
        if (score >= 70) return 'Good Work!';
        return 'Keep Practicing!';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Simulation Results" />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="text-center">
                    {session.is_passed ? (
                        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
                    ) : (
                        <XCircle className="mx-auto mb-4 h-16 w-16 text-red-500" />
                    )}
                    <h1 className="mb-2 text-3xl font-bold">{getScoreMessage(session.percentage_score)}</h1>
                    <p className="text-lg text-muted-foreground">
                        You {session.is_passed ? 'passed' : 'did not pass'} the simulation
                    </p>
                </div>

                {/* Score Card */}
                <Card className="mx-auto max-w-2xl border-2">
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <div className={`mb-4 text-7xl font-bold ${getScoreColor(session.percentage_score)}`}>{session.percentage_score}%</div>
                            <p className="mb-6 text-muted-foreground">Final Score</p>
                            <Progress value={session.percentage_score} className="h-3" />
                        </div>
                    </CardContent>
                </Card>

                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Points Earned</CardTitle>
                            <Award className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{session.points_earned}</div>
                            <p className="text-xs text-muted-foreground">Added to your total</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatTime(session.time_spent_seconds)}</div>
                            <p className="text-xs text-muted-foreground">Total duration</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
                            <Target className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{session.mistakes_made.length === 0 ? 'Perfect' : `${session.mistakes_made.length} mistakes`}</div>
                            <p className="text-xs text-muted-foreground">{session.is_passed ? 'Above passing threshold' : 'Below passing threshold'}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* AI Feedback & Mistakes */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* AI Feedback */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5" />
                                    Personalized Feedback
                                </CardTitle>
                                <CardDescription>AI-generated insights based on your performance</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-lg border bg-muted/50 p-4">
                                    <p className="leading-relaxed whitespace-pre-line">{session.ai_feedback}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Mistakes */}
                        {session.mistakes_made.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <XCircle className="h-5 w-5 text-orange-500" />
                                        Areas for Improvement
                                    </CardTitle>
                                    <CardDescription>Review these scenarios to strengthen your understanding</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {session.mistakes_made && session.mistakes_made.length > 0 ? (
                                            session.mistakes_made.map((mistake, index) => (
                                            <div key={index} className="rounded-lg border p-4">
                                                <h4 className="mb-2 font-semibold">{mistake.scenario_title}</h4>
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex items-start gap-2">
                                                        <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                                                        <div>
                                                            <span className="text-muted-foreground">Your choice:</span>
                                                            <p className="font-medium">{mistake.action_taken}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-2">
                                                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                                                        <div>
                                                            <span className="text-muted-foreground">Correct action:</span>
                                                            <p className="font-medium">{mistake.correct_action}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            ))
                                        ) : (
                                            <p className="text-center text-sm text-muted-foreground">Perfect score! No mistakes made.</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Perfect Score */}
                        {session.mistakes_made.length === 0 && (
                            <Card className="border-green-500/50 bg-green-500/5">
                                <CardContent className="py-12 text-center">
                                    <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-500" />
                                    <h3 className="mb-2 text-lg font-semibold">Perfect Score!</h3>
                                    <p className="text-muted-foreground">You answered all scenarios correctly. Excellent work!</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar Actions */}
                    <div className="space-y-6">
                        {/* Module Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Module</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <h3 className="mb-1 font-semibold">{session.module.title}</h3>
                                <p className="text-sm" style={{ color: session.module.sector.color }}>
                                    {session.module.sector.name}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Next Steps</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Link href="/dashboard" className="block">
                                    <Button className="w-full" variant="default">
                                        <Home className="mr-2 h-4 w-4" />
                                        Back to Dashboard
                                    </Button>
                                </Link>
                                <Link href={`/simulations/${session.module.slug}`} className="block">
                                    <Button className="w-full" variant="outline">
                                        <RefreshCw className="mr-2 h-4 w-4" />
                                        Retry Module
                                    </Button>
                                </Link>
                                <Link href="/simulations" className="block">
                                    <Button className="w-full" variant="outline">
                                        Browse More Simulations
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        {/* Status Badge */}
                        <Card className={session.is_passed ? 'border-green-500/50 bg-green-500/5' : 'border-orange-500/50 bg-orange-500/5'}>
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <Badge className={session.is_passed ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}>
                                        {session.is_passed ? 'PASSED' : 'NEEDS IMPROVEMENT'}
                                    </Badge>
                                    <p className="mt-4 text-sm text-muted-foreground">
                                        {session.is_passed
                                            ? 'You have successfully completed this module!'
                                            : 'Score 70% or higher to pass. Review the feedback and try again.'}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
