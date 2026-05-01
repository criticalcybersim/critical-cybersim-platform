import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';

interface AuthLayoutProps {
    children: React.ReactNode;
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 md:p-10">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            
            {/* Gradient Orbs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-4 top-0 h-72 w-72 animate-pulse rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-500/10" />
                <div className="absolute -right-4 bottom-0 h-72 w-72 animate-pulse rounded-full bg-purple-500/20 blur-3xl delay-1000 dark:bg-purple-500/10" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                <div className="flex flex-col gap-8">
                    {/* Logo & Header */}
                    <div className="flex flex-col items-center gap-6">
                        <Link href={route('home')} className="group flex flex-col items-center gap-3 transition-transform hover:scale-105">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-500/50 ring-2 ring-blue-500/20 transition-all group-hover:shadow-xl group-hover:shadow-blue-500/50 dark:from-blue-500 dark:to-blue-600">
                                <AppLogoIcon className="size-9 fill-white" />
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                                    CriticalCyberSim
                                </span>
                                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                                    Critical Infrastructure Training
                                </span>
                            </div>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">{title}</h1>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-8 shadow-xl backdrop-blur-sm dark:border-slate-800/60 dark:bg-slate-900/80">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
