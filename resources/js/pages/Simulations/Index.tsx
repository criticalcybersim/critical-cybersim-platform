import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { BookOpen, Clock, Filter, Target } from 'lucide-react';
import { useState } from 'react';

interface Sector {
    id: number;
    name: string;
    slug: string;
    color: string;
}

interface SimulationModule {
    id: number;
    title: string;
    slug: string;
    description: string;
    difficulty_level: string;
    estimated_duration: number;
    scenarios_count: number;
    sector: Sector;
}

interface PaginatedModules {
    data: SimulationModule[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Filters {
    sector?: string;
    difficulty?: string;
    sort?: string;
    order?: string;
}

interface Props {
    modules: PaginatedModules;
    filters: Filters;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Simulations', href: '/simulations' },
];

const difficultyColors = {
    beginner: 'bg-green-500/10 text-green-500 border-green-500/20',
    intermediate: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    advanced: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    expert: 'bg-red-500/10 text-red-500 border-red-500/20',
};

export default function SimulationsIndex({ modules, filters }: Props) {
    const [localFilters, setLocalFilters] = useState(filters);

    const handleFilterChange = (key: string, value: string) => {
        const newFilters = { ...localFilters, [key]: value };
        // Remove empty values to show all
        if (!value || value === 'all') {
            delete newFilters[key];
        }
        setLocalFilters(newFilters);
        router.get('/simulations', newFilters, { preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Simulations" />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">Cybersecurity Simulations</h1>
                    <p className="text-muted-foreground">Hands-on training scenarios for critical infrastructure protection</p>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            <CardTitle>Filters</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div>
                                <label className="mb-2 block text-sm font-medium">Difficulty Level</label>
                                <Select value={localFilters.difficulty || 'all'} onValueChange={(value) => handleFilterChange('difficulty', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Levels" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Levels</SelectItem>
                                        <SelectItem value="beginner">Beginner</SelectItem>
                                        <SelectItem value="intermediate">Intermediate</SelectItem>
                                        <SelectItem value="advanced">Advanced</SelectItem>
                                        <SelectItem value="expert">Expert</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium">Sort By</label>
                                <Select value={localFilters.sort || 'created_at'} onValueChange={(value) => handleFilterChange('sort', value)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="created_at">Newest First</SelectItem>
                                        <SelectItem value="title">Title</SelectItem>
                                        <SelectItem value="difficulty_level">Difficulty</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-end">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => {
                                        setLocalFilters({});
                                        router.get('/simulations');
                                    }}
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Results Count */}
                <div className="text-sm text-muted-foreground">
                    Showing {modules.data.length} of {modules.total} simulations
                </div>

                {/* Modules Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {modules.data.map((module) => (
                        <Card key={module.id} className="flex flex-col">
                            <CardHeader>
                                <div className="mb-2 flex items-start justify-between">
                                    <Badge className={difficultyColors[module.difficulty_level as keyof typeof difficultyColors]}>
                                        {module.difficulty_level}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground" style={{ color: module.sector.color }}>
                                        {module.sector.name}
                                    </span>
                                </div>
                                <CardTitle className="line-clamp-2">{module.title}</CardTitle>
                                <CardDescription className="line-clamp-3">{module.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Target className="h-4 w-4" />
                                        <span>{module.scenarios_count} scenarios</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        <span>~{module.estimated_duration} minutes</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Link href={`/simulations/${module.slug}`} className="w-full">
                                    <Button className="w-full">
                                        <BookOpen className="mr-2 h-4 w-4" />
                                        View Details
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {modules.data.length === 0 && (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground opacity-20" />
                            <p className="text-muted-foreground">No simulations found. Try adjusting your filters.</p>
                        </CardContent>
                    </Card>
                )}

                {/* Pagination */}
                {modules.last_page > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        {Array.from({ length: modules.last_page }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={page === modules.current_page ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => router.get(`/simulations?page=${page}`, localFilters)}
                            >
                                {page}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
