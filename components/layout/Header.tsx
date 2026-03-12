'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Heart, Users, Calendar, MessageSquare, Phone, Home, Globe, Book } from 'lucide-react';

const navigation = [
  { name: 'Accueil', href: '/', icon: Home },
  { name: 'À Propos', href: '/about', icon: Heart },
  { name: 'Activités', href: '/activities', icon: Calendar },
  { name: 'Prédications', href: '/messages', icon: MessageSquare },
  { name: 'Communauté', href: '/community', icon: Users },
  { name: 'Contact', href: '/contact', icon: Phone },
  { name: 'Bibles', href: '/bibles', icon: Book }, // Added Bible Link
];

export default function Header({ locale }: { locale: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Helper to ensure links have locale prefix
  const getLink = (path: string) => `/${locale}${path === '/' ? '' : path}`;

  const switchLocale = (newLocale: string) => {
    // Simple path string replacement: /fr/about -> /en/about
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href={getLink('/')} className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-[var(--color-primary)] rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
              <Heart className="w-6 h-6 text-white" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-xl font-heading font-bold text-[var(--color-text-primary)]">
                ÉPUC BITOTOL
              </h1>
              <p className="text-xs text-[var(--color-text-muted)] font-medium tracking-wide">YAOUNDÉ</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 h-full">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={getLink(item.href)}
                className="text-sm font-medium text-gray-600 hover:text-[var(--color-primary)] transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}

            <div className="h-6 w-px bg-gray-200 mx-2"></div>

            {/* Lang Switcher */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => switchLocale('fr')}
                className={`text-sm font-bold ${locale === 'fr' ? 'text-[var(--color-primary)]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                FR
              </button>
              <span className="text-gray-300">/</span>
              <button
                onClick={() => switchLocale('en')}
                className={`text-sm font-bold ${locale === 'en' ? 'text-[var(--color-primary)]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                EN
              </button>
            </div>

            <Link
              href={getLink('/donate')}
              className="ml-4 px-5 py-2.5 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--color-primary-hover)] transition-all shadow-md hover:shadow-lg"
            >
              Faire un Don
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 animate-fade-in">
            <nav className="px-4 py-6 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={getLink(item.href)}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-[var(--color-primary)] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5 opacity-70" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}

              <div className="flex items-center justify-center space-x-6 py-4 border-t border-b border-gray-100 mt-2">
                <button onClick={() => switchLocale('fr')} className={`font-bold ${locale === 'fr' ? 'text-[var(--color-primary)]' : 'text-gray-500'}`}>Français</button>
                <button onClick={() => switchLocale('en')} className={`font-bold ${locale === 'en' ? 'text-[var(--color-primary)]' : 'text-gray-500'}`}>English</button>
              </div>

              <div className="pt-2">
                <Link
                  href={getLink('/donate')}
                  className="block w-full text-center py-3 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors shadow-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Faire un Don
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}