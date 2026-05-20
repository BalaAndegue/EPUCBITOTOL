'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import {
  X, ChevronRight, ChevronLeft, Flame, Calendar,
  Play, Users, Heart, Mail, Sparkles,
} from 'lucide-react';

const STORAGE_KEY = 'epuc_onboarding_seen';

type Step = {
  icon: React.ElementType;
  color: string;
  bg: string;
  titleKey: string;
  descKey: string;
  href?: string;
  hrefLabelKey?: string;
};

const steps: Step[] = [
  {
    icon: Flame,
    color: 'text-[#E8B84B]',
    bg: 'bg-amber-950/60',
    titleKey: 's1_title',
    descKey: 's1_desc',
  },
  {
    icon: Calendar,
    color: 'text-orange-400',
    bg: 'bg-orange-950/60',
    titleKey: 's2_title',
    descKey: 's2_desc',
    href: '/activities',
    hrefLabelKey: 's2_cta',
  },
  {
    icon: Play,
    color: 'text-blue-400',
    bg: 'bg-blue-950/60',
    titleKey: 's3_title',
    descKey: 's3_desc',
    href: '/messages',
    hrefLabelKey: 's3_cta',
  },
  {
    icon: Users,
    color: 'text-green-400',
    bg: 'bg-green-950/60',
    titleKey: 's4_title',
    descKey: 's4_desc',
    href: '/community',
    hrefLabelKey: 's4_cta',
  },
  {
    icon: Heart,
    color: 'text-pink-400',
    bg: 'bg-pink-950/60',
    titleKey: 's5_title',
    descKey: 's5_desc',
    href: '/donate',
    hrefLabelKey: 's5_cta',
  },
  {
    icon: Sparkles,
    color: 'text-[#E8B84B]',
    bg: 'bg-amber-950/60',
    titleKey: 's6_title',
    descKey: 's6_desc',
    href: '/marketplace',
    hrefLabelKey: 's6_cta',
  },
];

export default function OnboardingGuide() {
  const t      = useTranslations('Onboarding');
  const params = useParams();
  const locale = (params?.locale as string) || 'fr';

  const [open,      setOpen]      = useState(false);
  const [step,      setStep]      = useState(0);
  const [seen,      setSeen]      = useState(true);
  const [animDir,   setAnimDir]   = useState<'left' | 'right'>('right');
  const [animating, setAnimating] = useState(false);

  const loc = (p: string) => `/${locale}${p}`;

  useEffect(() => {
    const done = sessionStorage.getItem(STORAGE_KEY);
    setSeen(!!done);
  }, []);

  const openGuide = () => {
    setStep(0);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    sessionStorage.setItem(STORAGE_KEY, 'true');
    setSeen(true);
  };

  const goTo = (next: number, dir: 'left' | 'right') => {
    setAnimDir(dir);
    setAnimating(true);
    setTimeout(() => {
      setStep(next);
      setAnimating(false);
    }, 220);
  };

  const prev = () => step > 0 && goTo(step - 1, 'left');
  const next = () => step < steps.length - 1 ? goTo(step + 1, 'right') : close();

  const current = steps[step];
  const Icon    = current.icon;
  const isLast  = step === steps.length - 1;

  return (
    <>
      {/* ── Trigger button ─────────────────────────────────────────────────── */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[150] flex flex-col items-center gap-2">
        {!seen && !open && (
          <span
            className="text-xs text-white/80 px-3 py-1.5 rounded-full animate-bounce"
            style={{ background: 'rgba(201,151,58,0.25)', border: '1px solid rgba(201,151,58,0.45)' }}
          >
            {t('hint')}
          </span>
        )}
        <button
          onClick={openGuide}
          className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg,#C9973A,#E8B84B)',
            color: '#1C1917',
            boxShadow: '0 8px 32px rgba(201,151,58,0.45)',
          }}
          aria-label={t('btn_label')}
        >
          <Sparkles className="w-4 h-4" />
          {t('btn_label')}
        </button>
      </div>

      {/* ── Backdrop ───────────────────────────────────────────────────────── */}
      {open && (
        <div
          className="fixed inset-0 bg-black/70 z-[160] backdrop-blur-sm transition-opacity duration-300"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* ── Dialog ─────────────────────────────────────────────────────────── */}
      {open && (
        <div
          className="fixed inset-0 z-[170] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={t('dialog_label')}
        >
          <div
            className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background: '#0D1425',
              border: '1px solid rgba(201,151,58,0.35)',
              animation: 'dialogPop 0.35s cubic-bezier(0.16,1,0.3,1) both',
            }}
            onClick={e => e.stopPropagation()}
          >
            <style>{`
              @keyframes dialogPop{from{opacity:0;transform:scale(0.92) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}
              @keyframes fadeRight{from{opacity:0;transform:translateX(32px)}to{opacity:1;transform:translateX(0)}}
              @keyframes fadeLeft{from{opacity:0;transform:translateX(-32px)}to{opacity:1;transform:translateX(0)}}
            `}</style>

            {/* Close */}
            <button
              onClick={close}
              className="absolute top-4 right-4 z-10 p-1.5 rounded-xl transition-colors hover:bg-white/10"
              style={{ color: 'rgba(255,255,255,0.45)' }}
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Progress bar */}
            <div className="w-full h-1" style={{ background: 'rgba(255,255,255,0.07)' }}>
              <div
                className="h-full transition-all duration-500 ease-out"
                style={{
                  width: `${((step + 1) / steps.length) * 100}%`,
                  background: 'linear-gradient(90deg,#C9973A,#E8B84B)',
                }}
              />
            </div>

            {/* Step content */}
            <div
              className="px-8 pt-8 pb-6"
              style={{ animation: animating ? undefined : `${animDir === 'right' ? 'fadeRight' : 'fadeLeft'} 0.25s ease both` }}
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 ${current.bg} rounded-2xl flex items-center justify-center mb-6 mx-auto`}
                style={{ border: '1px solid rgba(255,255,255,0.10)' }}
              >
                <Icon className={`w-8 h-8 ${current.color}`} />
              </div>

              {/* Step indicator */}
              <p className="text-center text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: '#C9973A' }}>
                {t('step_of', { current: step + 1, total: steps.length })}
              </p>

              {/* Text */}
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-white text-center mb-3 leading-snug">
                {t(current.titleKey as any)}
              </h2>
              <p className="text-white/65 text-sm leading-relaxed text-center mb-6">
                {t(current.descKey as any)}
              </p>

              {/* Optional page link */}
              {current.href && current.hrefLabelKey && (
                <a
                  href={loc(current.href)}
                  className="flex items-center justify-center gap-1.5 text-sm font-semibold mb-4 transition-colors hover:underline"
                  style={{ color: '#E8B84B' }}
                  onClick={close}
                >
                  <Mail className="w-3.5 h-3.5" />
                  {t(current.hrefLabelKey as any)}
                </a>
              )}

              {/* Dots */}
              <div className="flex justify-center gap-1.5 mb-6">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i, i > step ? 'right' : 'left')}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === step ? 24 : 6,
                      height: 6,
                      background: i === step ? '#E8B84B' : 'rgba(255,255,255,0.20)',
                    }}
                    aria-label={`Étape ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <div
              className="flex gap-3 px-8 pb-7"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.25rem' }}
            >
              {step > 0 ? (
                <button
                  onClick={prev}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.10)' }}
                >
                  <ChevronLeft className="w-4 h-4" />
                  {t('prev')}
                </button>
              ) : (
                <div className="flex-1" />
              )}
              <button
                onClick={next}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg,#C9973A,#E8B84B)', color: '#1C1917' }}
              >
                {isLast ? t('finish') : t('next')}
                {!isLast && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
