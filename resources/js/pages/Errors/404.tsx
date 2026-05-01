import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { AlertTriangle, ArrowLeft, Home, Search } from 'lucide-react';
import { Head } from '@inertiajs/react';

interface Props {
    debug?: boolean;
    error?: {
        message?: string;
        file?: string;
        line?: number;
        trace?: string[];
    };
}

export default function NotFoundPage({ debug = false, error }: Props) {
    return (
        <>
            <Head title="404 - Page Not Found" />

            <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4">
                <div className="w-full max-w-2xl">
                    {/* Error Icon */}
                    <div className="mb-8 text-center">
                        <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-yellow-500/10">
                            <AlertTriangle className="h-12 w-12 text-yellow-500" />
                        </div>
                        <h1 className="mb-2 text-6xl font-bold text-white">404</h1>
                        <h2 className="text-2xl font-semibold text-slate-300">Page Not Found</h2>
                    </div>

                    {/* Error Message */}
                    <Card className="border-slate-800 bg-slate-900/50">
                        <CardContent className="space-y-6 p-8">
                            <p className="text-center text-slate-400">
                                The page you're looking for doesn't exist or has been moved. This could be a broken link or an outdated bookmark.
                            </p>

                            {/* Debug Information */}
                            {debug && error && (
                                <div className="space-y-4 rounded-lg border border-red-800/50 bg-red-950/20 p-4">
                                    <div className="flex items-start gap-2">
                                        <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                                        <div className="flex-1 space-y-2">
                                            <p className="font-semibold text-red-400">Debug Information</p>
                                            {error.message && (
                                                <div>
                                                    <p className="text-xs font-semibold text-red-300">Message:</p>
                                                    <p className="text-sm text-red-200">{error.message}</p>
                                                </div>
                                            )}
                                            {error.file && (
                                                <div>
                                                    <p className="text-xs font-semibold text-red-300">File:</p>
                                                    <p className="font-mono text-xs text-red-200">
                                                        {error.file}
                                                        {error.line && `:${error.line}`}
                                                    </p>
                                                </div>
                                            )}
                                            {error.trace && error.trace.length > 0 && (
                                                <div>
                                                    <p className="text-xs font-semibold text-red-300">Stack Trace:</p>
                                                    <div className="max-h-48 overflow-y-auto rounded bg-red-950/40 p-2">
                                                        <pre className="font-mono text-xs text-red-200">
                                                            {error.trace.join('\n')}
                                                        </pre>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-xs text-red-400">
                                        Debug mode is enabled. Remove <code className="rounded bg-red-900/50 px-1">?debug=1</code> from URL to hide
                                        this information.
                                    </p>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Button onClick={() => window.history.back()} variant="outline" className="flex-1 border-slate-700">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Go Back
                                </Button>
                                <Link href="/" className="flex-1">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                        <Home className="mr-2 h-4 w-4" />
                                        Return Home
                                    </Button>
                                </Link>
                            </div>

                            {/* Helpful Links */}
                            <div className="border-t border-slate-800 pt-6">
                                <p className="mb-4 text-sm font-semibold text-slate-300">You might be looking for:</p>
                                <ul className="space-y-2 text-sm">
                                    <li>
                                        <Link href="/sectors" className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                                            <Search className="h-4 w-4" />
                                            Browse Critical Infrastructure Sectors
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/dashboard" className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                                            <Search className="h-4 w-4" />
                                            Training Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/simulations" className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                                            <Search className="h-4 w-4" />
                                            Available Simulations
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Footer Note */}
                    <p className="mt-6 text-center text-sm text-slate-500">
                        If you believe this is an error, please contact your system administrator.
                    </p>
                </div>
            </div>
        </>
    );
}
