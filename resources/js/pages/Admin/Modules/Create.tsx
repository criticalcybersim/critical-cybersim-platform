import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { FormEventHandler } from 'react';

interface Sector {
    id: number;
    name: string;
}

interface Props {
    sectors: Sector[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'Modules', href: '/admin/modules' },
    { title: 'Create', href: '/admin/modules/create' },
];

export default function CreateModule({ sectors }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        learning_objectives: '',
        sector_id: '',
        difficulty_level: 'Intermediate',
        estimated_duration_minutes: 60,
        points_reward: 100,
        attack_type: '',
        nist_controls: [] as string[],
        prerequisites: [] as string[],
        is_published: false,
        is_featured: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/modules');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Training Module" />

            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                <div className="space-y-6 p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white">Create Training Module</h1>
                            <p className="text-slate-400 mt-1">Add a new simulation module to the platform</p>
                        </div>
                        <Link href="/admin/modules">
                            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Modules
                            </Button>
                        </Link>
                    </div>

                    {/* Form */}
                    <form onSubmit={submit}>
                        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-white">Module Details</CardTitle>
                                <CardDescription>Fill in the information below to create a new training module</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Title */}
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-slate-300">Module Title *</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="bg-slate-800/50 border-slate-700 text-white"
                                        placeholder="e.g., Power Grid Attack Response"
                                    />
                                    {errors.title && <p className="text-sm text-red-400">{errors.title}</p>}
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-slate-300">Description *</Label>
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="w-full min-h-[100px] px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md text-white"
                                        placeholder="Detailed description of the module..."
                                    />
                                    {errors.description && <p className="text-sm text-red-400">{errors.description}</p>}
                                </div>

                                {/* Learning Objectives */}
                                <div className="space-y-2">
                                    <Label htmlFor="learning_objectives" className="text-slate-300">Learning Objectives *</Label>
                                    <textarea
                                        id="learning_objectives"
                                        value={data.learning_objectives}
                                        onChange={(e) => setData('learning_objectives', e.target.value)}
                                        className="w-full min-h-[100px] px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md text-white"
                                        placeholder="What will learners achieve? (separate with new lines)"
                                    />
                                    {errors.learning_objectives && <p className="text-sm text-red-400">{errors.learning_objectives}</p>}
                                </div>

                                {/* Grid Layout for smaller fields */}
                                <div className="grid gap-6 md:grid-cols-2">
                                    {/* Sector */}
                                    <div className="space-y-2">
                                        <Label htmlFor="sector_id" className="text-slate-300">Sector *</Label>
                                        <select
                                            id="sector_id"
                                            value={data.sector_id}
                                            onChange={(e) => setData('sector_id', e.target.value)}
                                            className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md text-white"
                                        >
                                            <option value="">Select a sector</option>
                                            {sectors.map((sector) => (
                                                <option key={sector.id} value={sector.id}>{sector.name}</option>
                                            ))}
                                        </select>
                                        {errors.sector_id && <p className="text-sm text-red-400">{errors.sector_id}</p>}
                                    </div>

                                    {/* Difficulty Level */}
                                    <div className="space-y-2">
                                        <Label htmlFor="difficulty_level" className="text-slate-300">Difficulty Level *</Label>
                                        <select
                                            id="difficulty_level"
                                            value={data.difficulty_level}
                                            onChange={(e) => setData('difficulty_level', e.target.value)}
                                            className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md text-white"
                                        >
                                            <option value="Beginner">Beginner</option>
                                            <option value="Intermediate">Intermediate</option>
                                            <option value="Advanced">Advanced</option>
                                            <option value="Expert">Expert</option>
                                        </select>
                                        {errors.difficulty_level && <p className="text-sm text-red-400">{errors.difficulty_level}</p>}
                                    </div>

                                    {/* Duration */}
                                    <div className="space-y-2">
                                        <Label htmlFor="estimated_duration_minutes" className="text-slate-300">Duration (minutes) *</Label>
                                        <Input
                                            id="estimated_duration_minutes"
                                            type="number"
                                            value={data.estimated_duration_minutes}
                                            onChange={(e) => setData('estimated_duration_minutes', Number(e.target.value))}
                                            className="bg-slate-800/50 border-slate-700 text-white"
                                        />
                                        {errors.estimated_duration_minutes && <p className="text-sm text-red-400">{errors.estimated_duration_minutes}</p>}
                                    </div>

                                    {/* Points Reward */}
                                    <div className="space-y-2">
                                        <Label htmlFor="points_reward" className="text-slate-300">Points Reward *</Label>
                                        <Input
                                            id="points_reward"
                                            type="number"
                                            value={data.points_reward}
                                            onChange={(e) => setData('points_reward', Number(e.target.value))}
                                            className="bg-slate-800/50 border-slate-700 text-white"
                                        />
                                        {errors.points_reward && <p className="text-sm text-red-400">{errors.points_reward}</p>}
                                    </div>

                                    {/* Attack Type */}
                                    <div className="space-y-2">
                                        <Label htmlFor="attack_type" className="text-slate-300">Attack Type *</Label>
                                        <Input
                                            id="attack_type"
                                            value={data.attack_type}
                                            onChange={(e) => setData('attack_type', e.target.value)}
                                            className="bg-slate-800/50 border-slate-700 text-white"
                                            placeholder="e.g., Ransomware, DDoS, Phishing"
                                        />
                                        {errors.attack_type && <p className="text-sm text-red-400">{errors.attack_type}</p>}
                                    </div>
                                </div>

                                {/* Checkboxes */}
                                <div className="flex items-center gap-6">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={data.is_published}
                                            onChange={(e) => setData('is_published', e.target.checked)}
                                            className="w-4 h-4 rounded border-slate-700 bg-slate-800"
                                        />
                                        <span className="text-sm text-slate-300">Publish immediately</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={data.is_featured}
                                            onChange={(e) => setData('is_featured', e.target.checked)}
                                            className="w-4 h-4 rounded border-slate-700 bg-slate-800"
                                        />
                                        <span className="text-sm text-slate-300">Featured module</span>
                                    </label>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
                                    <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700">
                                        {processing ? 'Creating...' : 'Create Module'}
                                    </Button>
                                    <Link href="/admin/modules">
                                        <Button type="button" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                                            Cancel
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
