'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Home,
  Calendar,
  Megaphone,
  MessageSquare,
  Users,
  LogOut,
  Heart,
  Activity,
  Mail,
  Video,
  Menu,
  X,
  ChevronRight,
  Flame
} from 'lucide-react';
import { logout } from '@/app/actions/auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-gray-100 flex-shrink-0">
        <div className="w-8 h-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center">
          <Flame className="w-4 h-4 text-white" />
        </div>
        <span className="text-base font-bold text-gray-900">Admin ÉPUC</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-l-4 border-[var(--color-primary)] pl-3'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent pl-3'
              }`}
            >
              <Icon className="w-4 h-4 mr-3 flex-shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Actions */}
      <div className="p-3 border-t border-gray-100 space-y-1 flex-shrink-0">
        <Link
          href="/"
          onClick={() => setSidebarOpen(false)}
          className="flex items-center px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
        >
          <Home className="w-4 h-4 mr-3" />
          Retour au site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Déconnexion
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-20 bg-gray-50 flex">

      {/* ====== SIDEBAR DESKTOP ====== */}
      <aside className="hidden lg:flex w-60 xl:w-64 bg-white shadow-sm border-r border-gray-100 flex-col fixed top-20 bottom-0 left-0 z-30">
        <SidebarContent />
      </aside>

      {/* ====== OVERLAY MOBILE ====== */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ====== SIDEBAR MOBILE (DRAWER) ====== */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 lg:hidden transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-gray-100">
          <span className="font-bold text-gray-900 text-sm">Menu Admin</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="h-[calc(100%-3.5rem)]">
          <SidebarContent />
        </div>
      </aside>

      {/* ====== CONTENU PRINCIPAL ====== */}
      <main className="flex-1 flex flex-col min-h-0 lg:ml-60 xl:ml-64">

        {/* Header mobile */}
        <header className="lg:hidden bg-white shadow-sm border-b border-gray-100 h-14 flex items-center px-4 justify-between sticky top-20 z-20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Menu</span>
          </button>

          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-[var(--color-primary)]" />
            <span className="font-bold text-sm text-gray-900">Admin ÉPUC</span>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
            title="Déconnexion"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </header>

        {/* Zone contenu */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
          {children}
        </div>
      </main>
    </div>
  );
}
