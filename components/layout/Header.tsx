'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Heart, Users, Calendar, MessageSquare, Phone, Home, Book, ChevronRight, Flame } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations('Navigation');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const nav = [
    { key: 'home',       href: '/',           icon: Home },
    { key: 'about',      href: '/about',      icon: Heart },
    { key: 'activities', href: '/activities', icon: Calendar },
    { key: 'messages',   href: '/messages',   icon: MessageSquare },
    { key: 'community',  href: '/community',  icon: Users },
    { key: 'contact',    href: '/contact',    icon: Phone },
    { key: 'bibles',     href: '/bibles',     icon: Book },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const link  = (p: string) => `/${locale}${p === '/' ? '' : p}`;
  const active = (href: string) => href === '/' ? pathname === link(href) : pathname.startsWith(link(href));
  const switchLocale = (l: string) => { router.push(pathname.replace(`/${locale}`, `/${l}`)); setOpen(false); };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(7,10,20,0.97)' : 'rgba(7,10,20,0.85)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.45)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <div className="flex items-center justify-between" style={{ height: '72px' }}>

            {/* Logo */}
            <Link href={link('/')} className="flex items-center gap-3 group py-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#C9973A,#E8B84B)' }}>
                <Flame className="w-5 h-5" style={{ color: '#1C1917' }} />
              </div>
              <div>
                <p className="font-heading font-bold text-white text-sm sm:text-base leading-tight">ÉPUC NKOABANG</p>
                <p className="text-[10px] font-medium tracking-widest uppercase hidden sm:block" style={{ color: 'rgba(201,151,58,0.7)' }}>
                  Yaoundé · Cameroun
                </p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {nav.map(item => (
                <Link key={item.key} href={link(item.href)}
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={active(item.href)
                    ? { background: 'rgba(201,151,58,0.15)', color: '#C9973A' }
                    : { color: 'rgba(255,255,255,0.70)' }}
                  onMouseEnter={e => { if (!active(item.href)) (e.currentTarget as HTMLElement).style.cssText += 'color:white;background:rgba(255,255,255,0.08)'; }}
                  onMouseLeave={e => { if (!active(item.href)) { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.70)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; } }}
                >
                  {t(item.key as any)}
                </Link>
              ))}
            </nav>

            {/* Actions desktop */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Langue */}
              <div className="flex items-center rounded-lg overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
                {['fr', 'en'].map(l => (
                  <button key={l} onClick={() => switchLocale(l)}
                    className="px-3 py-1.5 text-xs font-bold transition-all"
                    style={locale === l
                      ? { background: 'linear-gradient(135deg,#C9973A,#E8B84B)', color: '#1C1917' }
                      : { color: 'rgba(255,255,255,0.50)' }}>
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
              <Link href={link('/donate')} className="btn-gold text-sm px-4 py-2 rounded-xl">
                {t('donate_btn')}
              </Link>
            </div>

            {/* Burger mobile */}
            <button
              className="lg:hidden p-2 rounded-xl transition-colors text-white"
              style={{ background: 'rgba(255,255,255,0.08)' }}
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Overlay mobile */}
      {open && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Drawer mobile */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 z-50 lg:hidden flex flex-col transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ background: '#0D1425' }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#C9973A,#E8B84B)' }}>
              <Flame className="w-4 h-4" style={{ color: '#1C1917' }} />
            </div>
            <div>
              <p className="font-bold text-white text-sm">ÉPUC Nkoabang</p>
              <p className="text-[9px]" style={{ color: 'rgba(201,151,58,0.65)' }}>YAOUNDÉ · CAMEROUN</p>
            </div>
          </div>
          <button onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg text-white/40 hover:text-white transition-colors"
            style={{ background: 'rgba(255,255,255,0.06)' }}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Liens nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {nav.map(item => {
            const Icon = item.icon;
            const isAct = active(item.href);
            return (
              <Link key={item.key} href={link(item.href)} onClick={() => setOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl transition-all group"
                style={isAct
                  ? { background: 'rgba(201,151,58,0.12)', color: '#C9973A' }
                  : { color: 'rgba(255,255,255,0.65)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: isAct ? 'rgba(201,151,58,0.15)' : 'rgba(255,255,255,0.06)' }}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-sm">{t(item.key as any)}</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-40" />
              </Link>
            );
          })}
        </nav>

        {/* Footer drawer */}
        <div className="px-4 pb-6 pt-3 space-y-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.10)' }}>
            {([['fr', '🇫🇷 Français'], ['en', '🇬🇧 English']] as const).map(([l, label]) => (
              <button key={l} onClick={() => switchLocale(l)}
                className="flex-1 py-2.5 text-xs font-bold transition-all"
                style={locale === l
                  ? { background: 'linear-gradient(135deg,#C9973A,#E8B84B)', color: '#1C1917' }
                  : { color: 'rgba(255,255,255,0.50)' }}>
                {label}
              </button>
            ))}
          </div>
          <Link href={link('/donate')} onClick={() => setOpen(false)}
            className="block w-full text-center py-3 rounded-xl font-bold text-sm"
            style={{ background: 'linear-gradient(135deg,#C9973A,#E8B84B)', color: '#1C1917' }}>
            {t('donate_btn')}
          </Link>
        </div>
      </aside>
    </>
  );
}
