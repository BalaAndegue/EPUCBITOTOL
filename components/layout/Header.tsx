'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  Menu, X, Heart, Users, Calendar, MessageSquare,
  Phone, Home, ChevronRight, Flame, Bell, Globe, HandHeart, Sparkles,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

// ─── colour tokens ────────────────────────────────────────────────────────────
const GOLD        = '#C9973A';
const GOLD_LIGHT  = '#E8B84B';
const GOLD_DIM    = 'rgba(201,151,58,0.65)';
const GOLD_RING   = 'rgba(201,151,58,0.40)';
const GOLD_TINT   = 'rgba(201,151,58,0.12)';
const WHITE_65    = 'rgba(255,255,255,0.65)';
const WHITE_40    = 'rgba(255,255,255,0.40)';
const WHITE_08    = 'rgba(255,255,255,0.08)';
const WHITE_06    = 'rgba(255,255,255,0.06)';
const WHITE_10    = 'rgba(255,255,255,0.10)';
const BG_TOP      = 'rgba(8,9,14,0.75)';
const BG_SCROLLED = 'rgba(8,9,14,0.92)';
const DRAWER_BG   = '#0D1425';

// ─── nav items ────────────────────────────────────────────────────────────────
const nav = [
  { key: 'home',        href: '/',            icon: Home },
  { key: 'about',       href: '/about',       icon: Heart },
  { key: 'activities',  href: '/activities',  icon: Calendar },
  { key: 'messages',    href: '/messages',    icon: MessageSquare },
  { key: 'marketplace', href: '/marketplace', icon: Sparkles },
  { key: 'community',   href: '/community',   icon: Users },
  { key: 'network',     href: '/network',     icon: Globe },
  { key: 'contact',     href: '/contact',     icon: Phone },
] as const;

// ─── Logo ─────────────────────────────────────────────────────────────────────
function LogoMark({ size = 40 }: { size?: number }) {
  const [err, setErr] = useState(false);
  return err ? (
    <div
      className="rounded-full flex items-center justify-center flex-shrink-0"
      style={{
        width: size, height: size,
        background: `linear-gradient(135deg,${GOLD},${GOLD_LIGHT})`,
      }}
    >
      <Flame style={{ width: size * 0.5, height: size * 0.5, color: '#1C1917' }} />
    </div>
  ) : (
    <Image
      src="/yaounde-church-logo.png"
      alt="ÉPUC Nkoabang"
      width={size}
      height={size}
      className="rounded-full flex-shrink-0 object-cover"
      onError={() => setErr(true)}
      priority
    />
  );
}

// ─── component ────────────────────────────────────────────────────────────────
export default function Header({ locale }: { locale: string }) {
  const t        = useTranslations('Navigation');
  const pathname = usePathname();
  const router   = useRouter();

  const [open,    setOpen]    = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // scroll listener
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // lock body when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // helpers
  const link       = (p: string) => `/${locale}${p === '/' ? '' : p}`;
  const active     = (href: string) =>
    href === '/' ? pathname === link(href) : pathname.startsWith(link(href));
  const switchLocale = (l: string) => {
    router.push(pathname.replace(`/${locale}`, `/${l}`));
    setOpen(false);
  };

  return (
    <>
      {/* ── Header bar ─────────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? BG_SCROLLED : BG_TOP,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: scrolled ? '0 2px 28px rgba(0,0,0,0.50)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <div className="flex items-center" style={{ height: 72, gap: 0 }}>

            {/* ── Logo (far left) ──────────────────────────────────────────── */}
            <Link href={link('/')} className="flex items-center gap-3 flex-shrink-0 py-3 mr-auto lg:mr-0">
              <LogoMark size={40} />
              <div>
                <p className="font-heading font-bold text-white text-sm sm:text-base leading-tight tracking-wide">
                  ÉPUC NKOABANG
                </p>
                <p
                  className="text-[10px] font-medium tracking-widest uppercase hidden sm:block"
                  style={{ color: GOLD_DIM }}
                >
                  Yaoundé · Cameroun
                </p>
              </div>
            </Link>

            {/* ── Desktop nav (middle-right) ───────────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-1 mx-8">
              {nav.map(item => {
                const isAct = active(item.href);
                return (
                  <Link
                    key={item.key}
                    href={link(item.href)}
                    className="relative group px-3 py-2 text-sm font-medium transition-colors duration-200"
                    style={{ color: isAct ? GOLD_LIGHT : WHITE_65 }}
                  >
                    {/* hover underline animation */}
                    <span
                      className="absolute inset-x-3 bottom-1 h-px transition-transform duration-200 origin-left"
                      style={{
                        background: GOLD_LIGHT,
                        transform: isAct ? 'scaleX(1)' : 'scaleX(0)',
                      }}
                      aria-hidden="true"
                    />
                    {/* text — white on hover via CSS group */}
                    <span className="relative group-hover:text-white transition-colors duration-200">
                      {t(item.key as any)}
                    </span>
                    {/* active gold dot */}
                    {isAct && (
                      <span
                        className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-1 h-1 rounded-full"
                        style={{ background: GOLD }}
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ── Desktop actions (far right) ──────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-3 ml-auto">

              {/* FR | EN pill toggle */}
              <div
                className="flex items-center rounded-full overflow-hidden"
                style={{ border: `1px solid ${GOLD_RING}` }}
              >
                {(['fr', 'en'] as const).map((l, i) => (
                  <button
                    key={l}
                    onClick={() => switchLocale(l)}
                    className="px-3 py-1.5 text-xs font-bold transition-all duration-200"
                    style={
                      locale === l
                        ? { background: `linear-gradient(135deg,${GOLD},${GOLD_LIGHT})`, color: '#1C1917' }
                        : { color: WHITE_40, borderLeft: i ? `1px solid ${GOLD_RING}` : undefined }
                    }
                    aria-label={`Switch to ${l.toUpperCase()}`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Announcements bell pill */}
              <Link
                href={link('/announcements')}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:bg-opacity-25"
                style={{
                  border: `1px solid ${GOLD_RING}`,
                  color: GOLD_LIGHT,
                  background: active('/announcements')
                    ? `linear-gradient(135deg,${GOLD},${GOLD_LIGHT})`
                    : GOLD_TINT,
                }}
              >
                <Bell className="w-4 h-4" />
                <span>{t('announcements' as any)}</span>
              </Link>

              {/* Donate solid-gold button */}
              <Link
                href={link('/donate')}
                className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{
                  background: `linear-gradient(135deg,${GOLD},${GOLD_LIGHT})`,
                  color: '#1C1917',
                }}
              >
                <HandHeart className="w-4 h-4" />
                {t('donate_btn')}
              </Link>
            </div>

            {/* ── Mobile hamburger (far right) ─────────────────────────────── */}
            <button
              className="lg:hidden p-2 rounded-xl transition-colors text-white flex-shrink-0"
              style={{ background: WHITE_08 }}
              onClick={() => setOpen(!open)}
              aria-label={open
                ? (locale === 'fr' ? 'Fermer le menu' : 'Close menu')
                : (locale === 'fr' ? 'Ouvrir le menu' : 'Open menu')
              }
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </header>

      {/* ── Mobile overlay ──────────────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* ── Mobile full-screen drawer ────────────────────────────────────────── */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] z-50 lg:hidden flex flex-col transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ background: DRAWER_BG }}
        aria-label="Menu navigation"
      >
        {/* Drawer header — logo top-left, close right */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: `1px solid ${WHITE_10}` }}
        >
          <div className="flex items-center gap-3">
            <LogoMark size={36} />
            <div>
              <p className="font-bold text-white text-sm leading-tight">ÉPUC Nkoabang</p>
              <p className="text-[9px] font-medium tracking-widest uppercase" style={{ color: GOLD_DIM }}>
                Yaoundé · Cameroun
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg transition-colors"
            style={{ background: WHITE_06, color: WHITE_40 }}
            aria-label={locale === 'fr' ? 'Fermer le menu' : 'Close menu'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav links with icons */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {nav.map(item => {
            const Icon  = item.icon;
            const isAct = active(item.href);
            return (
              <Link
                key={item.key}
                href={link(item.href)}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl transition-all"
                style={
                  isAct
                    ? { background: GOLD_TINT, color: GOLD_LIGHT }
                    : { color: WHITE_65 }
                }
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: isAct ? 'rgba(201,151,58,0.18)' : WHITE_06 }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-sm">{t(item.key as any)}</span>
                </div>
                <ChevronRight className="w-4 h-4" style={{ color: WHITE_40 }} />
              </Link>
            );
          })}
        </nav>

        {/* Drawer footer — locale toggle + announcements + donate */}
        <div
          className="px-4 pb-6 pt-3 space-y-3"
          style={{ borderTop: `1px solid ${WHITE_10}` }}
        >
          {/* FR / EN toggle */}
          <div
            className="flex rounded-xl overflow-hidden"
            style={{ border: `1px solid ${WHITE_10}` }}
          >
            {([['fr', 'FR · Français'], ['en', 'EN · English']] as const).map(([l, label]) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className="flex-1 py-2.5 text-xs font-bold transition-all duration-200"
                style={
                  locale === l
                    ? { background: `linear-gradient(135deg,${GOLD},${GOLD_LIGHT})`, color: '#1C1917' }
                    : { color: WHITE_40 }
                }
              >
                {label}
              </button>
            ))}
          </div>

          {/* Announcements */}
          <Link
            href={link('/announcements')}
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm transition-all duration-200"
            style={{
              background: GOLD_TINT,
              color: GOLD_LIGHT,
              border: `1px solid ${GOLD_RING}`,
            }}
          >
            <Bell className="w-4 h-4" />
            {t('announcements' as any)}
          </Link>

          {/* Donate */}
          <Link
            href={link('/donate')}
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90"
            style={{
              background: `linear-gradient(135deg,${GOLD},${GOLD_LIGHT})`,
              color: '#1C1917',
            }}
          >
            <HandHeart className="w-4 h-4" />
            {t('donate_btn')}
          </Link>
        </div>
      </aside>
    </>
  );
}
