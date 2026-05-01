import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Award, BookOpen, CheckCircle, Clock, Play, Shield, Target } from 'lucide-react';

interface Sector {
    id: number;
    name: string;
    color: string;
}

interface Scenario {
    id: number;
    title: string;
    description: string;
    scenario_type: string;
    difficulty_points: number;
}

interface NistControl {
    id: number;
    control_family_code: string;
    control_family_name: string;
}

interface UserProgress {
    id: number;
    status: string;
    best_score: number;
    attempts: number;
    completed_at: string | null;
}

interface SimulationModule {
    id: number;
    title: string;
    slug: string;
    description: string;
    learning_objectives: string[];
    difficulty_level: string;
    estimated_duration: number;
    sector: Sector;
    scenarios: Scenario[];
    nist_controls: NistControl[];
}

interface Props {
    module: SimulationModule;
    userProgress: UserProgress | null;
}

const difficultyColors = {
    beginner: 'bg-green-500/10 text-green-500 border-green-500/20',
    intermediate: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    advanced: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    expert: 'bg-red-500/10 text-red-500 border-red-500/20',
};

export default function SimulationShow({ module, userProgress }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Simulations', href: '/simulations' },
        { title: module.title, href: `/simulations/${module.slug}` },
    ];

    const handleStartSimulation = () => {
        router.post(`/simulations/${module.slug}/start`, {});
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={module.title} />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div>
                    <div className="mb-4 flex items-start justify-between">
                        <div className="flex-1">
                            <div className="mb-2 flex items-center gap-3">
                                <Badge className={difficultyColors[module.difficulty_level as keyof typeof difficultyColors]}>
                                    {module.difficulty_level}
                                </Badge>
                                <span className="text-sm" style={{ color: module.sector.color }}>
                                    {module.sector.name}
                                </span>
                            </div>
                            <h1 className="mb-2 text-3xl font-bold">{module.title}</h1>
                            <p className="text-lg text-muted-foreground">{module.description}</p>
                        </div>
                        <Button size="lg" onClick={handleStartSimulation} className="ml-4">
                            <Play className="mr-2 h-5 w-5" />
                            {userProgress ? 'Continue' : 'Start'} Simulation
                        </Button>
                    </div>

                    {/* Progress Bar */}
                    {userProgress && (
                        <Card className="bg-muted/50">
                            <CardContent className="py-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium">Your Progress</p>
                                        <p className="text-xs text-muted-foreground">
                                            {userProgress.status === 'completed' ? 'Completed' : 'In Progress'} • Best Score: {userProgress.best_score}
                                            % • Attempts: {userProgress.attempts}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {userProgress.status === 'completed' && <CheckCircle className="h-5 w-5 text-green-500" />}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Main Grid */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Learning Objectives */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="h-5 w-5" />
                                    Learning Objectives
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {module.learning_objectives && module.learning_objectives.length > 0 ? (
                                        module.learning_objectives.map((objective, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                                            <span>{objective}</span>
                                        </li>
                                        ))
                                    ) : (
                                        <li className="text-sm text-muted-foreground">No learning objectives defined</li>
                                    )}
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Scenarios */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BookOpen className="h-5 w-5" />
                                    Training Scenarios ({module.scenarios.length})
                                </CardTitle>
                                <CardDescription>Complete these challenges to master the module</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {module.scenarios && module.scenarios.length > 0 ? (
                                        module.scenarios.map((scenario, index) => (
                                        <div key={scenario.id} className="rounded-lg border p-4">
                                            <div className="mb-2 flex items-start justify-between">
                                                <div className="flex items-start gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold">
                                                        {index + 1}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold">{scenario.title}</h4>
                                                        <p className="text-sm text-muted-foreground">{scenario.description}</p>
                                                    </div>
                                                </div>
                                                <Badge variant="outline" className="text-xs">
                                                    {scenario.scenario_type}
                                                </Badge>
                                            </div>
                                            <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <Award className="h-3 w-3" />
                                                    {scenario.difficulty_points} points
                                                </span>
                                            </div>
                                        </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-muted-foreground">No scenarios available</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">Estimated Duration</span>
                                    </div>
                                    <p className="mt-1 font-semibold">{module.estimated_duration} minutes</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Target className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">Scenarios</span>
                                    </div>
                                    <p className="mt-1 font-semibold">{module.scenarios.length} challenges</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Award className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">Difficulty</span>
                                    </div>
                                    <p className="mt-1 font-semibold capitalize">{module.difficulty_level}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* NIST Controls */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5" />
                                    NIST Controls
                                </CardTitle>
                                <CardDescription>Security control families covered</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {module.nist_controls.map((control) => (
                                        <div key={control.id} className="rounded-lg border p-3">
                                            <div className="font-semibold text-sm">{control.control_family_code}</div>
                                            <div className="text-xs text-muted-foreground">{control.control_family_name}</div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* CTA */}
                        <Card className="border-primary/50 bg-primary/5">
                            <CardContent className="pt-6">
                                <Button size="lg" onClick={handleStartSimulation} className="w-full">
                                    <Play className="mr-2 h-5 w-5" />
                                    {userProgress ? 'Continue Training' : 'Begin Training'}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
