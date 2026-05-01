import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, Eye, ToggleLeft, ToggleRight, BookOpen, Users, Clock } from 'lucide-react';

interface Module {
    id: number;
    title: string;
    slug: string;
    description: string;
    sector: {
        id: number;
        name: string;
    };
    difficulty_level: string;
    estimated_duration_minutes: number;
    points_reward: number;
    is_published: boolean;
    is_featured: boolean;
    scenarios_count: number;
    sessions_count: number;
    created_at: string;
}

interface Props {
    modules: {
        data: Module[];
        links: any;
        meta: any;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'Modules', href: '/admin/modules' },
];

const difficultyColors = {
    Beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
    Intermediate: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    Advanced: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    Expert: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function ModulesIndex({ modules }: Props) {
    const handleTogglePublish = (moduleId: number) => {
        router.post(`/admin/modules/${moduleId}/toggle`, {}, {
            preserveScroll: true,
        });
    };

    const handleDelete = (moduleId: number, moduleName: string) => {
        if (confirm(`Are you sure you want to delete "${moduleName}"? This action cannot be undone.`)) {
            router.delete(`/admin/modules/${moduleId}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Training Modules Management" />

            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                <div className="space-y-6 p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white">Training Modules</h1>
                            <p className="text-slate-400 mt-1">Manage simulation modules and scenarios</p>
                        </div>
                        <Link href="/admin/modules/create">
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                <Plus className="mr-2 h-4 w-4" />
                                Create New Module
                            </Button>
                        </Link>
                    </div>

                    {/* Modules List */}
                    <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-white">All Training Modules</CardTitle>
                            <CardDescription>Total: {modules.meta.total} modules</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {modules.data.map((module) => (
                                    <div
                                        key={module.id}
                                        className="p-4 rounded-lg bg-slate-800/30 border border-slate-700 hover:border-blue-500/50 transition-all group"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                                                        {module.title}
                                                    </h3>
                                                    <Badge className={difficultyColors[module.difficulty_level]}>
                                                        {module.difficulty_level}
                                                    </Badge>
                                                    {module.is_published ? (
                                                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                                            Published
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="outline" className="border-slate-600 text-slate-400">
                                                            Draft
                                                        </Badge>
                                                    )}
                                                    {module.is_featured && (
                                                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                                                            Featured
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-sm text-slate-400 mb-3 line-clamp-2">{module.description}</p>
                                                <div className="flex items-center gap-4 text-sm text-slate-500">
                                                    <span className="flex items-center gap-1">
                                                        <BookOpen className="h-4 w-4" />
                                                        {module.sector.name}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        {module.estimated_duration_minutes} min
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Users className="h-4 w-4" />
                                                        {module.scenarios_count} scenarios
                                                    </span>
                                                    <span className="text-xs">
                                                        {module.sessions_count} sessions completed
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Link href={`/admin/modules/${module.id}/scenarios`}>
                                                    <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                                                        <Eye className="mr-1 h-3 w-3" />
                                                        Scenarios
                                                    </Button>
                                                </Link>
                                                <Link href={`/admin/modules/${module.id}/edit`}>
                                                    <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                                                        <Edit className="mr-1 h-3 w-3" />
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className={
                                                        module.is_published
                                                            ? 'border-green-700 text-green-400 hover:bg-green-900/20'
                                                            : 'border-slate-700 text-slate-400 hover:bg-slate-800'
                                                    }
                                                    onClick={() => handleTogglePublish(module.id)}
                                                >
                                                    {module.is_published ? (
                                                        <ToggleRight className="h-4 w-4" />
                                                    ) : (
                                                        <ToggleLeft className="h-4 w-4" />
                                                    )}
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="border-red-700 text-red-400 hover:bg-red-900/20"
                                                    onClick={() => handleDelete(module.id, module.title)}
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {modules.meta.last_page > 1 && (
                                <div className="mt-6 flex items-center justify-center gap-2">
                                    {modules.links.map((link: any, index: number) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            preserveScroll
                                            className={`px-3 py-1 rounded text-sm ${
                                                link.active
                                                    ? 'bg-blue-600 text-white'
                                                    : link.url
                                                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                                    : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
