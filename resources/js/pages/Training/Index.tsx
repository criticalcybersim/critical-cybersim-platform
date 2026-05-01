import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { AlertTriangle, BookOpen, CheckCircle, Target, TrendingDown, TrendingUp } from 'lucide-react';

interface Module {
    id: number;
    title: string;
    slug: string;
    description: string;
    difficulty_level: string;
    sector: {
        name: string;
        color: string;
    };
}

interface LearningPath {
    phase: string;
    modules: Module[];
}

interface Strengths {
    top_sectors: Array<{
        sector: { id: number; name: string; color: string };
        avg_score: number;
        count: number;
    }>;
    average_score: number;
    completion_rate: number;
    total_completed: number;
}

interface Weaknesses {
    weak_sectors: Array<{
        sector: { id: number; name: string; color: string };
        avg_score: number;
        count: number;
    }>;
    common_mistakes: Array<{
        scenario: string;
        frequency: number;
    }>;
}

interface Props {
    learningPath: LearningPath[];
    strengths: Strengths;
    weaknesses: Weaknesses;
    recommendedDifficulty: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Learning Paths', href: '/learning-paths' },
];

const difficultyColors = {
    beginner: 'bg-green-500/10 text-green-500 border-green-500/20',
    intermediate: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    advanced: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    expert: 'bg-red-500/10 text-red-500 border-red-500/20',
};

export default function TrainingIndex({ learningPath, strengths, weaknesses, recommendedDifficulty }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Learning Paths" />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">Personalized Learning Paths</h1>
                    <p className="text-muted-foreground">AI-driven recommendations based on your performance and goals</p>
                </div>

                {/* Recommendation Card */}
                <Card className="border-primary/50 bg-primary/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5" />
                            Recommended Difficulty Level
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <Badge className={`text-lg ${difficultyColors[recommendedDifficulty as keyof typeof difficultyColors]}`}>
                                {recommendedDifficulty}
                            </Badge>
                            <p className="text-sm text-muted-foreground">
                                Based on your current performance, we recommend {recommendedDifficulty}-level modules to maximize your learning.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Main Grid */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Learning Paths */}
                    <div className="lg:col-span-2 space-y-6">
                        {learningPath && learningPath.length > 0 ? (
                            learningPath.map((path, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <BookOpen className="h-5 w-5" />
                                        {path.phase}
                                    </CardTitle>
                                    <CardDescription>
                                        {path.modules.length} modules recommended for this learning phase
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {path.modules && Array.isArray(path.modules) && path.modules.length > 0 ? (
                                            path.modules.map((module) => (
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
                                                <CardFooter className="flex items-center justify-between">
                                                    <span className="text-sm" style={{ color: module.sector.color }}>
                                                        {module.sector.name}
                                                    </span>
                                                    <Link href={`/simulations/${module.slug}`}>
                                                        <Button size="sm">Start Module</Button>
                                                    </Link>
                                                </CardFooter>
                                            </Card>
                                            ))
                                        ) : (
                                            <p className="text-sm text-muted-foreground">No modules available in this phase</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                        ) : (
                            <Card>
                                <CardContent className="py-12 text-center">
                                    <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground opacity-20" />
                                    <h3 className="mb-2 text-lg font-semibold">No Learning Path Yet</h3>
                                    <p className="mb-4 text-sm text-muted-foreground">
                                        Complete some simulations to get personalized recommendations
                                    </p>
                                    <Link href="/simulations">
                                        <Button>Browse Simulations</Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Strengths */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-green-500" />
                                    <CardTitle className="text-base">Your Strengths</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {strengths.top_sectors && strengths.top_sectors.length > 0 ? (
                                    <div className="space-y-3">
                                        {strengths.top_sectors.map((item, index) => (
                                            <div key={index} className="rounded-lg border bg-green-500/5 p-3">
                                                <div className="mb-1 flex items-center justify-between">
                                                    <span className="text-sm font-medium">{item.sector.name}</span>
                                                    <span className="text-sm text-green-600">{item.avg_score}%</span>
                                                </div>
                                                <p className="text-xs text-muted-foreground">{item.count} modules completed</p>
                                            </div>
                                        ))}
                                        <div className="mt-4 rounded-lg border p-3 text-center">
                                            <div className="text-2xl font-bold text-green-600">{strengths.average_score}%</div>
                                            <p className="text-xs text-muted-foreground">Average Score</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">Complete more simulations to identify your strengths</p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Weaknesses */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <TrendingDown className="h-5 w-5 text-orange-500" />
                                    <CardTitle className="text-base">Areas to Improve</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {weaknesses.weak_sectors && weaknesses.weak_sectors.length > 0 ? (
                                    <div className="space-y-3">
                                        {weaknesses.weak_sectors.map((item, index) => (
                                            <div key={index} className="rounded-lg border bg-orange-500/5 p-3">
                                                <div className="mb-1 flex items-center justify-between">
                                                    <span className="text-sm font-medium">{item.sector.name}</span>
                                                    <span className="text-sm text-orange-600">{item.avg_score}%</span>
                                                </div>
                                                <p className="text-xs text-muted-foreground">Needs more practice</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">No weak areas identified - great job!</p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Common Mistakes */}
                        {weaknesses.common_mistakes && weaknesses.common_mistakes.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                                        <CardTitle className="text-base">Common Mistakes</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {weaknesses.common_mistakes.slice(0, 3).map((mistake, index) => (
                                            <div key={index} className="rounded-lg border p-2 text-sm">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium line-clamp-1">{mistake.scenario}</span>
                                                    <Badge variant="outline" className="ml-2 text-xs">
                                                        {mistake.frequency}x
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Tips */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Learning Tips</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                                    <span>Focus on your weak sectors first</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                                    <span>Review feedback after each simulation</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                                    <span>Maintain a daily learning streak</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                                    <span>Challenge yourself with harder levels</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
