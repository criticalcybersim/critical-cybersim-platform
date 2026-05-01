import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Users, TrendingUp, Award, Eye, BookOpen, Activity } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    sessions_count: number;
    achievements_count: number;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    users: {
        data: User[];
        links: PaginationLink[];
        meta: PaginationMeta;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'User Progress', href: '/admin/users/progress' },
];

export default function UserProgressIndex({ users }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Progress Tracking" />

            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                <div className="space-y-6 p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white">User Progress Tracking</h1>
                            <p className="text-slate-400 mt-1">Monitor learner progress and performance</p>
                        </div>
                        <Link href="/admin/users/analytics">
                            <Button className="bg-purple-600 hover:bg-purple-700">
                                <Activity className="mr-2 h-4 w-4" />
                                View Analytics
                            </Button>
                        </Link>
                    </div>

                    {/* Users List */}
                    <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-white">All Users</CardTitle>
                            <CardDescription>Total: {users.meta.total} users</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {users.data.map((user) => (
                                    <div
                                        key={user.id}
                                        className="p-4 rounded-lg bg-slate-800/30 border border-slate-700 hover:border-blue-500/50 transition-all group"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                                                        {user.name}
                                                    </h3>
                                                    <p className="text-sm text-slate-400">{user.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold text-blue-400">{user.sessions_count}</p>
                                                    <p className="text-xs text-slate-500">Sessions</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold text-yellow-400">{user.achievements_count}</p>
                                                    <p className="text-xs text-slate-500">Achievements</p>
                                                </div>
                                                <Link href={`/admin/users/progress/${user.id}`}>
                                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                                        <Eye className="mr-1 h-3 w-3" />
                                                        View Details
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {users.meta.last_page > 1 && (
                                <div className="mt-6 flex items-center justify-center gap-2">
                                    {users.links.map((link: PaginationLink, index: number) => (
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
