import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { AlertCircle, CheckCircle, Clock, Target } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Scenario {
    id: number;
    title: string;
    description: string;
    context: string;
    options?: Array<{
        key: string;
        text: string;
        title?: string;
    }>;
}

interface Session {
    id: number;
    status: string;
    current_scenario_index: number;
    total_scenarios: number;
    started_at: string;
    module: {
        title: string;
        sector: {
            name: string;
            color: string;
        };
    };
    current_scenario?: Scenario | null;
}

interface Props {
    session: Session;
    feedback?: {
        is_correct: boolean;
        points_earned: number;
        feedback: string;
    } | null;
}

export default function SimulationSession({ session, feedback }: Props) {
    const [selectedAction, setSelectedAction] = useState<string>('');
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showFeedback, setShowFeedback] = useState(!!feedback);

    // Hide feedback after 5 seconds
    useEffect(() => {
        if (feedback) {
            setShowFeedback(true);
            const timer = setTimeout(() => setShowFeedback(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [feedback]);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Simulations', href: '/simulations' },
        { title: session.module.title, href: '#' },
    ];

    const progress = ((session.current_scenario_index) / session.total_scenarios) * 100;

    // Timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeElapsed((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSubmitAction = () => {
        if (!selectedAction || !session.current_scenario) return;

        setIsSubmitting(true);
        router.post(
            `/sessions/${session.id}/action`,
            {
                scenario_id: session.current_scenario.id,
                action_taken: selectedAction,
                time_taken: timeElapsed,
            },
            {
                preserveState: false,
                onSuccess: () => {
                    setSelectedAction('');
                    setTimeElapsed(0);
                    setIsSubmitting(false);
                },
                onError: () => {
                    setIsSubmitting(false);
                },
            },
        );
    };

    const handleCompleteSession = () => {
        router.post(`/sessions/${session.id}/complete`, {}, {
            preserveState: false,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Simulation - ${session.module.title}`} />

            <div className="space-y-6 p-6">
                {/* Header with Progress */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold">{session.module.title}</h2>
                                <p className="text-sm text-muted-foreground" style={{ color: session.module.sector.color }}>
                                    {session.module.sector.name}
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <Clock className="h-4 w-4" />
                                    <span className="font-mono">{formatTime(timeElapsed)}</span>
                                </div>
                                <Badge variant="outline">
                                    Scenario {session.current_scenario_index + 1} of {session.total_scenarios}
                                </Badge>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Overall Progress</span>
                                <span className="font-medium">{Math.round(progress)}%</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                        </div>
                    </CardContent>
                </Card>

                {/* Feedback from Previous Scenario */}
                {showFeedback && feedback && (
                    <Card className={`border-2 ${feedback.is_correct ? 'border-green-500 bg-green-50 dark:bg-green-950' : 'border-amber-500 bg-amber-50 dark:bg-amber-950'}`}>
                        <CardContent className="pt-6">
                            <div className="flex items-start gap-3">
                                {feedback.is_correct ? (
                                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                                ) : (
                                    <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0" />
                                )}
                                <div className="flex-1">
                                    <h3 className={`font-semibold mb-1 ${feedback.is_correct ? 'text-green-900 dark:text-green-100' : 'text-amber-900 dark:text-amber-100'}`}>
                                        {feedback.is_correct ? '✓ Correct Decision!' : '⚠ Suboptimal Choice'}
                                    </h3>
                                    <p className={`text-sm mb-2 ${feedback.is_correct ? 'text-green-800 dark:text-green-200' : 'text-amber-800 dark:text-amber-200'}`}>
                                        {feedback.is_correct 
                                            ? `Excellent! You earned ${feedback.points_earned} points.` 
                                            : `That wasn't the best choice. ${feedback.points_earned} points earned.`}
                                    </p>
                                    {feedback.feedback && (
                                        <p className="text-sm text-muted-foreground">{feedback.feedback}</p>
                                    )}
                                </div>
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => setShowFeedback(false)}
                                    className="flex-shrink-0"
                                >
                                    ×
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Scenario Content */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Scenario */}
                    <div className="lg:col-span-2">
                        {session.current_scenario ? (
                            <Card>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <CardTitle>{session.current_scenario.title}</CardTitle>
                                            <CardDescription>{session.current_scenario.description}</CardDescription>
                                        </div>
                                        <Target className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Scenario Context */}
                                    <div className="rounded-lg border bg-muted/50 p-4">
                                        <h4 className="mb-2 flex items-center gap-2 font-semibold">
                                            <AlertCircle className="h-4 w-4" />
                                            Situation
                                        </h4>
                                        <p className="text-sm leading-relaxed">{session.current_scenario.context}</p>
                                    </div>

                                    {/* Actions */}
                                    {session.current_scenario.options && session.current_scenario.options.length > 0 ? (
                                        <div>
                                            <h4 className="mb-4 font-semibold">Choose Your Action</h4>
                                            <RadioGroup value={selectedAction} onValueChange={setSelectedAction}>
                                                <div className="space-y-3">
                                                    {session.current_scenario.options.map((option) => (
                                                        <div
                                                            key={option.key}
                                                            className={`flex items-start space-x-3 rounded-lg border p-4 transition-colors ${
                                                                selectedAction === option.key
                                                                    ? 'border-primary bg-primary/5'
                                                                    : 'hover:border-primary/50 hover:bg-muted/50'
                                                            }`}
                                                        >
                                                            <RadioGroupItem value={option.key} id={option.key} className="mt-1" />
                                                            <Label htmlFor={option.key} className="flex-1 cursor-pointer font-normal">
                                                                <span className="font-semibold">Option {option.key.toUpperCase()}: </span>
                                                                {option.text}
                                                            </Label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </RadioGroup>
                                        </div>
                                    ) : (
                                        <div className="rounded-lg border bg-muted/50 p-4 text-center text-muted-foreground">
                                            <p>No actions available for this scenario.</p>
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <div className="flex items-center justify-between pt-4">
                                        <p className="text-sm text-muted-foreground">
                                            {selectedAction ? 'Ready to submit your decision?' : 'Select an action to continue'}
                                        </p>
                                        <Button size="lg" disabled={!selectedAction || isSubmitting} onClick={handleSubmitAction}>
                                            {isSubmitting ? 'Submitting...' : 'Submit Decision'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card>
                                <CardContent className="py-12 text-center">
                                    <AlertCircle className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                                    <p className="text-lg text-muted-foreground">No scenario available</p>
                                    <p className="mt-2 text-sm text-muted-foreground">The session may have ended or an error occurred.</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Tips */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Training Tips</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                                    <span>Read the scenario carefully before choosing</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                                    <span>Consider NIST security principles</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                                    <span>Think about potential consequences</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                                    <span>No time limit - take your time</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Progress Summary */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Session Progress</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Completed</span>
                                    <span className="font-semibold">
                                        {session.current_scenario_index} / {session.total_scenarios}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Time Elapsed</span>
                                    <span className="font-mono font-semibold">{formatTime(timeElapsed)}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Remaining</span>
                                    <span className="font-semibold">{session.total_scenarios - session.current_scenario_index}</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* End Session */}
                        <Card className="border-orange-500/50 bg-orange-500/5">
                            <CardContent className="pt-6">
                                <p className="mb-4 text-sm text-muted-foreground">
                                    Need to finish later? You can end this session and your progress will be saved.
                                </p>
                                <Button variant="outline" className="w-full" onClick={handleCompleteSession}>
                                    End Session
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
