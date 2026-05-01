import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { AlertTriangle, BookOpen, CheckCircle, Clock, Globe, Shield, Target, Lock } from 'lucide-react';

interface Scenario {
    id: number;
    title: string;
}

interface SimulationModule {
    id: number;
    title: string;
    slug: string;
    description: string;
    difficulty_level: string;
    estimated_duration: number;
    scenarios: Scenario[];
}

interface Sector {
    id: number;
    name: string;
    slug: string;
    icon: string;
    color: string;
    threat_level: string;
    description: string;
    key_threats: string[];
    regulatory_frameworks: string[];
    simulation_modules: SimulationModule[];
}

interface Progress {
    completed: number;
    total: number;
    percentage: number;
}

interface Props {
    sector: Sector;
    progress: Progress;
}

const difficultyColors = {
    beginner: 'bg-green-500/10 text-green-500 border-green-500/20',
    intermediate: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    advanced: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    expert: 'bg-red-500/10 text-red-500 border-red-500/20',
};

export default function SectorShow({ sector, progress }: Props) {
    const { auth } = usePage<SharedData>().props;
    const isAuthenticated = !!auth.user;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Sectors', href: '/sectors' },
        { title: sector.name, href: `/sectors/${sector.slug}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={sector.name} />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div>
                    <div className="mb-4 flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: `${sector.color}20` }}>
                            <Globe className="h-8 w-8" style={{ color: sector.color }} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">{sector.name}</h1>
                            <p className="text-muted-foreground">CISA Critical Infrastructure Sector</p>
                        </div>
                    </div>

                    {/* Progress Card */}
                    <Card className="bg-muted/50">
                        <CardContent className="py-4">
                            <div className="mb-2 flex items-center justify-between">
                                <span className="font-medium">Your Progress in This Sector</span>
                                <span className="text-sm text-muted-foreground">
                                    {progress.completed} of {progress.total} modules completed
                                </span>
                            </div>
                            <Progress value={progress.percentage} className="h-2" style={{ '--progress-background': sector.color } as React.CSSProperties} />
                            <p className="mt-1 text-sm text-muted-foreground">{progress.percentage}% complete</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Grid */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Description */}
                        <Card>
                            <CardHeader>
                                <CardTitle>About This Sector</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="leading-relaxed">{sector.description}</p>
                            </CardContent>
                        </Card>

                        {/* Training Modules */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BookOpen className="h-5 w-5" />
                                    Training Modules ({sector.simulation_modules.length})
                                </CardTitle>
                                <CardDescription>Specialized cybersecurity training for {sector.name}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {sector.simulation_modules && sector.simulation_modules.length > 0 ? (
                                        sector.simulation_modules.map((module) => (
                                            <Card key={module.id}>
                                                <CardHeader>
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <CardTitle className="text-base">{module.title}</CardTitle>
                                                            <CardDescription className="line-clamp-2">{module.description}</CardDescription>
                                                        </div>
                                                        <Badge className={difficultyColors[module.difficulty_level as keyof typeof difficultyColors]}>
                                                            {module.difficulty_level}
                                                        </Badge>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="space-y-2 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-2">
                                                        <Target className="h-4 w-4" />
                                                        <span>{module.scenarios.length} scenarios</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4" />
                                                        <span>~{module.estimated_duration} minutes</span>
                                                    </div>
                                                </CardContent>
                                                <CardFooter>
                                                    {isAuthenticated ? (
                                                        <Link href={`/simulations/${module.slug}`} className="w-full">
                                                            <Button variant="outline" className="w-full">
                                                                View Module
                                                            </Button>
                                                        </Link>
                                                    ) : (
                                                        <Link href="/login" className="w-full">
                                                            <Button variant="default" className="w-full">
                                                                <Lock className="mr-2 h-4 w-4" />
                                                                Login to Access
                                                            </Button>
                                                        </Link>
                                                    )}
                                                </CardFooter>
                                            </Card>
                                        ))
                                    ) : (
                                        <p className="text-sm text-muted-foreground">No training modules available yet.</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Key Threats */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                                    <CardTitle className="text-base">Key Cyber Threats</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {sector.key_threats.map((threat, index) => (
                                        <li key={index} className="flex items-start gap-2 text-sm">
                                            <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-500" />
                                            <span>{threat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Regulatory Frameworks */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-blue-500" />
                                    <CardTitle className="text-base">Regulatory Frameworks</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {sector.regulatory_frameworks.map((framework, index) => (
                                        <div key={index} className="rounded-lg border p-2 text-sm">
                                            {framework}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Threat Level */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Current Threat Level</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center">
                                    <Badge
                                        className="mb-2 text-base"
                                        variant={sector.threat_level === 'high' ? 'destructive' : sector.threat_level === 'elevated' ? 'default' : 'secondary'}
                                    >
                                        {sector.threat_level.toUpperCase()}
                                    </Badge>
                                    <p className="text-xs text-muted-foreground">Based on CISA threat assessments</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* CTA */}
                        <Card className="border-primary/50 bg-primary/5">
                            <CardContent className="pt-6">
                                {isAuthenticated ? (
                                    <Link href="/simulations" className="block">
                                        <Button className="w-full">
                                            <BookOpen className="mr-2 h-4 w-4" />
                                            Browse All Simulations
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link href="/login" className="block">
                                        <Button className="w-full">
                                            <Lock className="mr-2 h-4 w-4" />
                                            Login to Browse Simulations
                                        </Button>
                                    </Link>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
