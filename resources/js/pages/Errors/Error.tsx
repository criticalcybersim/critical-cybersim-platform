import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { AlertTriangle, ArrowLeft, Home, RefreshCw } from 'lucide-react';
import { Head } from '@inertiajs/react';

interface Props {
    status: number;
    message?: string;
    debug?: boolean;
    error?: {
        message?: string;
        file?: string;
        line?: number;
        trace?: string[];
        exception?: string;
    };
}

export default function ErrorPage({ status, message, debug = false, error }: Props) {
    // Determine error title and description based on status code
    const getErrorInfo = () => {
        switch (status) {
            case 403:
                return {
                    title: 'Access Forbidden',
                    description: "You don't have permission to access this resource. Please contact your administrator if you believe this is an error.",
                    icon: '🔒',
                };
            case 404:
                return {
                    title: 'Page Not Found',
                    description: "The page you're looking for doesn't exist or has been moved.",
                    icon: '🔍',
                };
            case 419:
                return {
                    title: 'Session Expired',
                    description: 'Your session has expired. Please refresh the page and try again.',
                    icon: '⏱️',
                };
            case 429:
                return {
                    title: 'Too Many Requests',
                    description: 'You have made too many requests. Please wait a moment and try again.',
                    icon: '⚠️',
                };
            case 500:
                return {
                    title: 'Server Error',
                    description: 'An unexpected error occurred on our servers. Our team has been notified and is working on a fix.',
                    icon: '⚙️',
                };
            case 503:
                return {
                    title: 'Service Unavailable',
                    description: 'The platform is temporarily unavailable for maintenance. Please try again shortly.',
                    icon: '🔧',
                };
            default:
                return {
                    title: 'Error',
                    description: 'An unexpected error occurred. Please try again or contact support.',
                    icon: '❌',
                };
        }
    };

    const errorInfo = getErrorInfo();

    return (
        <>
            <Head title={`${status} - ${errorInfo.title}`} />

            <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4">
                <div className="w-full max-w-2xl">
                    {/* Error Icon */}
                    <div className="mb-8 text-center">
                        <div className="mb-6 text-6xl">{errorInfo.icon}</div>
                        <h1 className="mb-2 text-6xl font-bold text-white">{status}</h1>
                        <h2 className="text-2xl font-semibold text-slate-300">{errorInfo.title}</h2>
                    </div>

                    {/* Error Message */}
                    <Card className="border-slate-800 bg-slate-900/50">
                        <CardContent className="space-y-6 p-8">
                            <p className="text-center text-slate-400">{message || errorInfo.description}</p>

                            {/* Debug Information */}
                            {debug && error && (
                                <div className="space-y-4 rounded-lg border border-red-800/50 bg-red-950/20 p-4">
                                    <div className="flex items-start gap-2">
                                        <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                                        <div className="flex-1 space-y-2">
                                            <p className="font-semibold text-red-400">Debug Information</p>
                                            {error.exception && (
                                                <div>
                                                    <p className="text-xs font-semibold text-red-300">Exception:</p>
                                                    <p className="font-mono text-sm text-red-200">{error.exception}</p>
                                                </div>
                                            )}
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
                                {status === 419 || status === 503 ? (
                                    <Button onClick={() => window.location.reload()} variant="outline" className="flex-1 border-slate-700">
                                        <RefreshCw className="mr-2 h-4 w-4" />
                                        Refresh Page
                                    </Button>
                                ) : (
                                    <Button onClick={() => window.history.back()} variant="outline" className="flex-1 border-slate-700">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Go Back
                                    </Button>
                                )}
                                <Link href="/" className="flex-1">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                        <Home className="mr-2 h-4 w-4" />
                                        Return Home
                                    </Button>
                                </Link>
                            </div>

                            {/* Contact Info */}
                            {[500, 503].includes(status) && (
                                <div className="border-t border-slate-800 pt-6">
                                    <p className="text-center text-sm text-slate-400">
                                        If this problem persists, please contact your cybersecurity administrator or technical support team.
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Footer Note */}
                    <p className="mt-6 text-center text-sm text-slate-500">Error Code: {status}</p>
                </div>
            </div>
        </>
    );
}
