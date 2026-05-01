import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Award, Crown, Flame, Trophy, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface LeaderboardEntry {
    rank: number;
    name: string;
    points: number;
    level: string;
    level_name: string;
    streak: number;
    simulations_completed: number;
}

interface UserRank {
    rank: number;
    total_users: number;
    percentile: number;
}

interface Props {
    leaderboard: LeaderboardEntry[];
    userRank: UserRank;
    type: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Leaderboard', href: '/leaderboard' },
];

export default function LeaderboardIndex({ leaderboard, userRank, type }: Props) {
    const [selectedType, setSelectedType] = useState(type);

    const handleTypeChange = (value: string) => {
        setSelectedType(value);
        router.get('/leaderboard', { type: value }, { preserveState: true });
    };

    const getRankColor = (rank: number) => {
        if (rank === 1) return 'text-yellow-500';
        if (rank === 2) return 'text-gray-400';
        if (rank === 3) return 'text-orange-500';
        return 'text-muted-foreground';
    };

    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
        if (rank === 2) return <Award className="h-5 w-5 text-gray-400" />;
        if (rank === 3) return <Award className="h-5 w-5 text-orange-500" />;
        return null;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Leaderboard" />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Leaderboard</h1>
                        <p className="text-muted-foreground">Compete with other cybersecurity professionals</p>
                    </div>
                    <Select value={selectedType} onValueChange={handleTypeChange}>
                        <SelectTrigger className="w-48">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="global">Global Rankings</SelectItem>
                            <SelectItem value="organization">My Organization</SelectItem>
                            <SelectItem value="sector">My Sector</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Your Rank */}
                <Card className="border-primary/50 bg-primary/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Your Ranking
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-4xl font-bold">#{userRank.rank}</div>
                                <p className="text-sm text-muted-foreground">
                                    Top {userRank.percentile}% of {userRank.total_users.toLocaleString()} users
                                </p>
                            </div>
                            <Trophy className="h-16 w-16 text-primary opacity-20" />
                        </div>
                    </CardContent>
                </Card>

                {/* Top 3 */}
                <div className="grid gap-6 md:grid-cols-3">
                    {leaderboard.slice(0, 3).map((entry) => (
                        <Card
                            key={entry.rank}
                            className={
                                entry.rank === 1
                                    ? 'border-yellow-500/50 bg-yellow-500/5'
                                    : entry.rank === 2
                                      ? 'border-gray-500/50 bg-gray-500/5'
                                      : 'border-orange-500/50 bg-orange-500/5'
                            }
                        >
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className={`text-5xl font-bold ${getRankColor(entry.rank)}`}>#{entry.rank}</div>
                                    {getRankIcon(entry.rank)}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <h3 className="mb-2 text-lg font-bold">{entry.name}</h3>
                                <div className="space-y-1 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Award className="h-4 w-4" />
                                        <span>{entry.points?.toLocaleString() || 0} points</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Trophy className="h-4 w-4" />
                                        <span>{entry.level_name || entry.level}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Flame className="h-4 w-4" />
                                        <span>{entry.streak || 0} day streak</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Full Leaderboard */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Rankings</CardTitle>
                        <CardDescription>Complete leaderboard for {selectedType === 'global' ? 'all users' : selectedType}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-16">Rank</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Level</TableHead>
                                    <TableHead className="text-right">Points</TableHead>
                                    <TableHead className="text-right">Streak</TableHead>
                                    <TableHead className="text-right">Completed</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {leaderboard.map((entry) => (
                                    <TableRow key={entry.rank}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span className={`font-bold ${getRankColor(entry.rank)}`}>#{entry.rank}</span>
                                                {getRankIcon(entry.rank)}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">{entry.name}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{entry.level_name || entry.level}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right font-semibold">{entry.points?.toLocaleString() || 0}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Flame className="h-4 w-4 text-orange-500" />
                                                <span>{entry.streak || 0}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right text-muted-foreground">{entry.simulations_completed || 0}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Info Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">How Rankings Work</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-muted-foreground">
                        <p>• Rankings are based on total points earned from completed simulations</p>
                        <p>• Points are awarded based on module difficulty and performance</p>
                        <p>• Maintain a streak by training at least once per day</p>
                        <p>• Leaderboards update in real-time after each completed simulation</p>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
