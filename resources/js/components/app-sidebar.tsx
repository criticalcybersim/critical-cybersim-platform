import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { ThemeToggle } from '@/components/theme-toggle';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Activity, Award, BookOpen, Globe, LayoutGrid, Monitor, TrendingUp, Trophy, Settings, Users, FileText, BarChart3, GraduationCap } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'My Learning',
        url: '/learning',
        icon: GraduationCap,
    },
    {
        title: 'Simulations',
        url: '/simulations',
        icon: Monitor,
    },
    {
        title: 'Learning Paths',
        url: '/learning-paths',
        icon: BookOpen,
    },
    {
        title: 'Analytics',
        url: '/analytics',
        icon: TrendingUp,
    },
    {
        title: 'Achievements',
        url: '/achievements',
        icon: Award,
    },
    {
        title: 'Leaderboard',
        url: '/leaderboard',
        icon: Trophy,
    },
    {
        title: 'Sectors',
        url: '/sectors',
        icon: Globe,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Documentation',
        url: 'https://www.cisa.gov/topics/critical-infrastructure-security-and-resilience',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage<{ auth: { user: { role?: string } } }>().props;
    const isAdmin = auth?.user?.role === 'admin' || auth?.user?.role === 'super_admin';

    // Admin menu items with sub-navigation
    const adminNavItems: NavItem[] = [
        {
            title: 'Admin',
            url: '/admin/dashboard',
            icon: Settings,
            isActive: true,
            items: [
                {
                    title: 'Dashboard',
                    url: '/admin/dashboard',
                    icon: LayoutGrid,
                },
                {
                    title: 'Modules',
                    url: '/admin/modules',
                    icon: BookOpen,
                },
                {
                    title: 'User Progress',
                    url: '/admin/users/progress',
                    icon: Users,
                },
                {
                    title: 'Analytics',
                    url: '/admin/users/analytics',
                    icon: BarChart3,
                },
            ],
        },
    ];

    // Add admin menu items if user is admin
    const navItems = isAdmin ? [...mainNavItems, ...adminNavItems] : mainNavItems;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                <div className="flex items-center justify-between px-2 py-2">
                    <span className="text-xs text-muted-foreground">Theme</span>
                    <ThemeToggle />
                </div>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
