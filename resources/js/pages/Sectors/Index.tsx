import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { AlertTriangle, Globe, Shield } from 'lucide-react';

interface Sector {
    id: number;
    name: string;
    slug: string;
    icon: string;
    color: string;
    threat_level: string;
    simulation_modules_count: number;
}

interface Props {
    sectors: Sector[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Sectors', href: '/sectors' },
];

const threatLevelColors = {
    high: 'bg-red-500/10 text-red-500 border-red-500/20',
    'elevated': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    'moderate': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    'guarded': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    'low': 'bg-green-500/10 text-green-500 border-green-500/20',
};

export default function SectorsIndex({ sectors }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Critical Infrastructure Sectors" />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">Critical Infrastructure Sectors</h1>
                    <p className="text-muted-foreground">16 CISA-designated sectors essential to national security and public safety</p>
                </div>

                {/* Info Card */}
                <Card className="border-blue-500/50 bg-blue-500/5">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-blue-500" />
                            <CardTitle className="text-lg">About Critical Infrastructure</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm leading-relaxed">
                            The Cybersecurity and Infrastructure Security Agency (CISA) identifies 16 critical infrastructure sectors whose assets,
                            systems, and networks are considered so vital that their incapacitation or destruction would have a debilitating effect on
                            security, national economic security, national public health or safety, or any combination thereof.
                        </p>
                    </CardContent>
                </Card>

                {/* Sectors Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {sectors.map((sector) => (
                        <Link key={sector.id} href={`/sectors/${sector.slug}`}>
                            <Card className="h-full transition-all hover:border-primary hover:shadow-md">
                                <CardHeader>
                                    <div className="mb-4 flex items-center justify-between">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: `${sector.color}20` }}>
                                            <Globe className="h-6 w-6" style={{ color: sector.color }} />
                                        </div>
                                        <Badge className={threatLevelColors[sector.threat_level as keyof typeof threatLevelColors]}>
                                            {sector.threat_level}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-base">{sector.name}</CardTitle>
                                    <CardDescription className="flex items-center gap-2">
                                        <Shield className="h-3 w-3" />
                                        {sector.simulation_modules_count} training modules
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* CISA Reference */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-orange-500" />
                            <CardTitle className="text-lg">Federal Framework</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <p>
                            <strong>NIST SP 800-53 Rev.5:</strong> Security and Privacy Controls for Information Systems and Organizations
                        </p>
                        <p>
                            <strong>OMB M-22-09:</strong> Moving the U.S. Government Toward Zero Trust Cybersecurity Principles
                        </p>
                        <p>
                            <strong>Executive Order 14028:</strong> Improving the Nation's Cybersecurity
                        </p>
                        <p>
                            <strong>CISA Framework:</strong> Critical Infrastructure Cyber Community (C³) Voluntary Program
                        </p>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
