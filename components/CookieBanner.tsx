'use client';

import { useState, useEffect } from 'react';
import { Shield, ChevronDown, ChevronUp, Check, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = 'epuc_cookie_consent_v2';

function loadConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveConsent(consent: ConsentState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
}

export default function CookieBanner() {
  const t = useTranslations('Cookie');
  const [show, setShow] = useState(false);
  const [managing, setManaging] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const saved = loadConsent();
    if (!saved) {
      const timer = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    const full: ConsentState = { necessary: true, analytics: true, marketing: true };
    saveConsent(full);
    setShow(false);
  };

  const rejectAll = () => {
    const minimal: ConsentState = { necessary: true, analytics: false, marketing: false };
    saveConsent(minimal);
    setShow(false);
  };

  const savePreferences = () => {
    saveConsent(consent);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:bottom-6 sm:w-[420px] z-[200]"
      style={{ animation: 'slideUp 0.4s cubic-bezier(0.16,1,0.3,1) both' }}
      role="dialog"
      aria-modal="true"
      aria-label={t('aria_label')}
    >
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}`}</style>

      <div
        className="rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: '#0D1425', border: '1px solid rgba(201,151,58,0.30)' }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 px-5 py-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(201,151,58,0.15)', border: '1px solid rgba(201,151,58,0.35)' }}
          >
            <Shield className="w-4 h-4" style={{ color: '#E8B84B' }} />
          </div>
          <div className="flex-1">
            <p className="font-bold text-white text-sm">{t('title')}</p>
            <p className="text-white/50 text-xs">{t('subtitle')}</p>
          </div>
          <button
            onClick={rejectAll}
            className="p-1 rounded-lg transition-colors hover:bg-white/10"
            style={{ color: 'rgba(255,255,255,0.40)' }}
            aria-label={t('close')}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-3">
          <p className="text-white/70 text-xs leading-relaxed">{t('desc')}</p>

          {/* Manage preferences toggle */}
          <button
            onClick={() => setManaging(!managing)}
            className="flex items-center gap-1.5 text-xs font-semibold transition-colors"
            style={{ color: '#C9973A' }}
          >
            {managing ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            {t('manage')}
          </button>

          {/* Categories */}
          {managing && (
            <div className="space-y-2 pt-1">
              {/* Necessary — always on */}
              <CategoryRow
                label={t('cat_necessary')}
                desc={t('cat_necessary_desc')}
                checked
                locked
              />
              <CategoryRow
                label={t('cat_analytics')}
                desc={t('cat_analytics_desc')}
                checked={consent.analytics}
                onChange={v => setConsent(c => ({ ...c, analytics: v }))}
              />
              <CategoryRow
                label={t('cat_marketing')}
                desc={t('cat_marketing_desc')}
                checked={consent.marketing}
                onChange={v => setConsent(c => ({ ...c, marketing: v }))}
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div
          className="px-5 pb-5 flex flex-col gap-2"
        >
          {managing ? (
            <button
              onClick={savePreferences}
              className="w-full py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg,#C9973A,#E8B84B)', color: '#1C1917' }}
            >
              {t('save_prefs')}
            </button>
          ) : (
            <button
              onClick={acceptAll}
              className="w-full py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg,#C9973A,#E8B84B)', color: '#1C1917' }}
            >
              {t('accept')}
            </button>
          )}
          <button
            onClick={rejectAll}
            className="w-full py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white transition-colors"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
          >
            {t('decline')}
          </button>
        </div>
      </div>
    </div>
  );
}

function CategoryRow({
  label,
  desc,
  checked,
  locked,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  locked?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <div
      className="flex items-start gap-3 p-3 rounded-xl"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <button
        type="button"
        disabled={locked}
        onClick={() => onChange?.(!checked)}
        className="mt-0.5 w-9 h-5 rounded-full flex-shrink-0 relative transition-all duration-200"
        style={{
          background: checked ? 'linear-gradient(135deg,#C9973A,#E8B84B)' : 'rgba(255,255,255,0.12)',
          cursor: locked ? 'not-allowed' : 'pointer',
        }}
        aria-checked={checked}
        role="switch"
      >
        <span
          className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 flex items-center justify-center"
          style={{ transform: checked ? 'translateX(16px)' : 'translateX(0)' }}
        >
          {locked && <Check className="w-2.5 h-2.5 text-[#C9973A]" />}
        </span>
      </button>
      <div className="flex-1 min-w-0">
        <p className="text-white text-xs font-semibold flex items-center gap-1.5">
          {label}
          {locked && (
            <span
              className="text-[10px] font-normal px-1.5 py-0.5 rounded-full"
              style={{ background: 'rgba(201,151,58,0.18)', color: '#C9973A' }}
            >
              Requis
            </span>
          )}
        </p>
        <p className="text-white/50 text-[11px] mt-0.5 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
