'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Calendar, Megaphone, MessageSquare, Users, LogOut, Heart, Activity, Mail, Video } from 'lucide-react';
import { logout } from '@/app/actions/auth';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Do not show layout on login page
    if (pathname.includes('/admin/login')) {
        return <>{children}</>;
    }

    const navigation = [
        { name: 'Tableau de bord', href: '/fr/admin', icon: Activity },
        { name: 'Annonces', href: '/fr/admin/announcements', icon: Megaphone },
        { name: 'Prédications', href: '/fr/admin/messages', icon: Video },
        { name: 'Événements', href: '/fr/admin/events', icon: Calendar },
        { name: 'Départements', href: '/fr/admin/departments', icon: Users },
        { name: 'Témoignages', href: '/fr/admin/testimonials', icon: MessageSquare },
        { name: 'Newsletter', href: '/fr/admin/newsletter', icon: Mail },
    ];

    const handleLogout = async () => {
        await logout();
        window.location.href = '/fr/admin/login';
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-xl border-r border-gray-100 flex flex-col hidden md:flex">
                <div className="h-16 flex items-center px-6 border-b border-gray-100">
                    <Heart className="w-6 h-6 text-[var(--color-primary)] mr-2" />
                    <span className="text-xl font-bold text-gray-900">Admin EPUC</span>
                </div>

                <div className="flex-1 py-6 flex flex-col gap-1 overflow-y-auto">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center px-6 py-3 border-l-4 ${isActive
                                    ? 'border-[var(--color-primary)] bg-red-50 text-[var(--color-primary)]'
                                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <Icon className="w-5 h-5 mr-3" />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>

                <div className="p-4 border-t border-gray-100 space-y-2">
                    <Link
                        href="/"
                        className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Retour au site principal
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Déconnexion
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Mobile Header (simplified) */}
                <header className="md:hidden bg-white shadow-sm border-b border-gray-100 h-16 flex items-center px-4 justify-between">
                    <span className="text-lg font-bold">Admin EPUC</span>
                    <button onClick={handleLogout} className="text-red-600"><LogOut className="w-5 h-5" /></button>
                </header>

                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
