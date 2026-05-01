import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Award, Lock, Trophy } from 'lucide-react';

interface Achievement {
    id: number;
    name: string;
    description: string;
    icon: string;
    category: string;
    rarity: string;
    points: number;
    badge_color: string;
    earned: boolean;
    earned_at: string | null;
}

interface Stats {
    total_achievements: number;
    earned_achievements: number;
    total_achievement_points: number;
}

interface Props {
    achievements: Achievement[];
    stats: Stats;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Achievements', href: '/achievements' },
];

const rarityColors = {
    common: 'bg-gray-500',
    uncommon: 'bg-green-500',
    rare: 'bg-blue-500',
    epic: 'bg-purple-500',
    legendary: 'bg-orange-500',
};

const categoryIcons = {
    milestone: Trophy,
    performance: Award,
    streak: Award,
    sector: Award,
    speed: Award,
    dedication: Award,
};

export default function AchievementsIndex({ achievements, stats }: Props) {
    const groupedAchievements = achievements.reduce(
        (acc, achievement) => {
            if (!acc[achievement.category]) {
                acc[achievement.category] = [];
            }
            acc[achievement.category].push(achievement);
            return acc;
        },
        {} as Record<string, Achievement[]>,
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Achievements" />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">Achievement Gallery</h1>
                    <p className="text-muted-foreground">Track your accomplishments and unlock rewards</p>
                </div>

                {/* Stats */}
                <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Achievements</CardTitle>
                            <Trophy className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.earned_achievements} / {stats.total_achievements}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {Math.round((stats.earned_achievements / stats.total_achievements) * 100)}% unlocked
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Achievement Points</CardTitle>
                            <Award className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_achievement_points.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">Points from achievements</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                            <Trophy className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{Math.round((stats.earned_achievements / stats.total_achievements) * 100)}%</div>
                            <p className="text-xs text-muted-foreground">Of all available achievements</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Achievement Categories */}
                {Object.entries(groupedAchievements).map(([category, categoryAchievements]) => {
                    const Icon = categoryIcons[category as keyof typeof categoryIcons] || Award;
                    return (
                        <div key={category}>
                            <div className="mb-4 flex items-center gap-2">
                                <Icon className="h-5 w-5" />
                                <h2 className="text-xl font-bold capitalize">{category}</h2>
                                <span className="text-sm text-muted-foreground">
                                    ({categoryAchievements.filter((a) => a.earned).length}/{categoryAchievements.length})
                                </span>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {categoryAchievements.map((achievement) => (
                                    <Card
                                        key={achievement.id}
                                        className={achievement.earned ? 'border-2' : 'opacity-50'}
                                        style={achievement.earned ? { borderColor: achievement.badge_color } : {}}
                                    >
                                        <CardHeader>
                                            <div className="mb-4 flex items-center justify-between">
                                                <div
                                                    className="flex h-16 w-16 items-center justify-center rounded-full"
                                                    style={
                                                        achievement.earned
                                                            ? { backgroundColor: `${achievement.badge_color}20` }
                                                            : { backgroundColor: 'var(--muted)' }
                                                    }
                                                >
                                                    {achievement.earned ? (
                                                        <Award className="h-8 w-8" style={{ color: achievement.badge_color }} />
                                                    ) : (
                                                        <Lock className="h-8 w-8 text-muted-foreground" />
                                                    )}
                                                </div>
                                                <Badge className={rarityColors[achievement.rarity as keyof typeof rarityColors]}>
                                                    {achievement.rarity}
                                                </Badge>
                                            </div>
                                            <CardTitle className="text-base">{achievement.name}</CardTitle>
                                            <CardDescription className="line-clamp-2">{achievement.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">{achievement.points} points</span>
                                                {achievement.earned && achievement.earned_at && (
                                                    <span className="text-xs text-muted-foreground">Earned {achievement.earned_at}</span>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </AppLayout>
    );
}
