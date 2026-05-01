import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, ArrowLeft, BookOpen, GripVertical } from 'lucide-react';

interface Module {
    id: number;
    title: string;
    sector: {
        name: string;
    };
}

interface Scenario {
    id: number;
    title: string;
    order_number: number;
    scenario_type: string;
    content: string;
    max_score: number;
    is_critical: boolean;
}

interface Props {
    module: Module;
    scenarios: Scenario[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'Modules', href: '/admin/modules' },
    { title: 'Scenarios', href: '#' },
];

const scenarioTypeColors = {
    decision: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    technical: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    analysis: 'bg-green-500/20 text-green-400 border-green-500/30',
    response: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

export default function ScenariosIndex({ module, scenarios }: Props) {
    const handleDelete = (scenarioId: number, scenarioTitle: string) => {
        if (confirm(`Are you sure you want to delete "${scenarioTitle}"?`)) {
            router.delete(`/admin/modules/${module.id}/scenarios/${scenarioId}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Scenarios - ${module.title}`} />

            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                <div className="space-y-6 p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <Link href="/admin/modules">
                                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white mb-2">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Modules
                                </Button>
                            </Link>
                            <h1 className="text-3xl font-bold text-white">{module.title}</h1>
                            <p className="text-slate-400 mt-1">
                                <BookOpen className="inline h-4 w-4 mr-1" />
                                {module.sector.name} | {scenarios.length} Scenarios
                            </p>
                        </div>
                        <Link href={`/admin/modules/${module.id}/scenarios/create`}>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Scenario
                            </Button>
                        </Link>
                    </div>

                    {/* Scenarios List */}
                    <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-white">Training Scenarios</CardTitle>
                            <CardDescription>Manage scenarios and questions for this module</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {scenarios.length > 0 ? (
                                <div className="space-y-4">
                                    {scenarios.map((scenario) => (
                                        <div
                                            key={scenario.id}
                                            className="p-4 rounded-lg bg-slate-800/30 border border-slate-700 hover:border-blue-500/50 transition-all group"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="cursor-move text-slate-600 hover:text-slate-400 transition-colors">
                                                    <GripVertical className="h-5 w-5" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <Badge className="bg-slate-700 text-slate-300">
                                                            #{scenario.order_number}
                                                        </Badge>
                                                        <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                                                            {scenario.title}
                                                        </h3>
                                                        <Badge className={scenarioTypeColors[scenario.scenario_type as keyof typeof scenarioTypeColors]}>
                                                            {scenario.scenario_type}
                                                        </Badge>
                                                        {scenario.is_critical && (
                                                            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                                                                Critical
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-slate-400 mb-3 line-clamp-2">{scenario.content}</p>
                                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                                        <span>Max Score: {scenario.max_score} points</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Link href={`/admin/modules/${module.id}/scenarios/${scenario.id}/edit`}>
                                                        <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                                                            <Edit className="mr-1 h-3 w-3" />
                                                            Edit
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="border-red-700 text-red-400 hover:bg-red-900/20"
                                                        onClick={() => handleDelete(scenario.id, scenario.title)}
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <BookOpen className="h-16 w-16 mx-auto mb-4 text-slate-600" />
                                    <h3 className="text-lg font-semibold mb-2 text-slate-300">No Scenarios Yet</h3>
                                    <p className="text-sm text-slate-400 mb-6">
                                        Start building this training module by adding scenarios
                                    </p>
                                    <Link href={`/admin/modules/${module.id}/scenarios/create`}>
                                        <Button className="bg-blue-600 hover:bg-blue-700">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add First Scenario
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
