'use client';

import { MapPin, Phone, Mail, Send, Clock, MessageCircle, Bus, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const IMG = {
  hero:  '/church-1.webp',
  bg:    'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1400&auto=format&fit=crop',
  bible: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1400&auto=format&fit=crop',
};

export default function Contact() {
  const t = useTranslations('Contact');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 6000);
    setForm({ name: '', email: '', message: '' });
  };

  const infoCards = [
    {
      icon: MapPin, bg: 'bg-red-950/50', c: 'text-red-400', titleKey: 'address_title',
      lines: ['address_l1', 'address_l2', 'address_l3'],
    },
    {
      icon: Clock, bg: 'bg-blue-950/50', c: 'text-blue-400', titleKey: 'hours_title',
      lines: ['hours_l1', 'hours_l2', 'hours_l3'],
    },
    {
      icon: Phone, bg: 'bg-emerald-950/50', c: 'text-emerald-400', titleKey: 'phone_title',
      lines: ['phone_l1', 'phone_l2'],
    },
    {
      icon: Mail, bg: 'bg-purple-950/50', c: 'text-purple-400', titleKey: 'email_title',
      lines: ['email_l1', 'email_l2'],
    },
  ];

  return (
    <div className="pt-20 min-h-screen" style={{ background: 'var(--church-cream)' }}>

      {/* HERO */}
      <section className="relative h-56 sm:h-72 overflow-hidden">
        <img src={IMG.hero} alt="" className="img-section"
          onError={(e) => { (e.target as HTMLImageElement).src = IMG.bg; }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(7,10,20,.90) 0%, rgba(7,10,20,.45) 70%, transparent 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 pb-8 max-w-5xl mx-auto">
          <span className="badge-gold mb-3 inline-flex">{t('badge')}</span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-white">{t('title')}</h1>
          <p className="text-white/65 mt-2 max-w-lg text-sm sm:text-base">{t('subtitle')}</p>
        </div>
      </section>

      {/* INFOS + FORMULAIRE */}
      <section className="relative py-16 sm:py-24 overflow-hidden dark-bg">
        <div className="absolute inset-0">
          <img src={IMG.bg} alt="" className="img-section"
            onError={(e) => { (e.target as HTMLImageElement).src = IMG.bible; }} />
          <div className="absolute inset-0" style={{ background: 'rgba(7,10,20,.88)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            {/* Infos */}
            <div className="space-y-4">
              {/* Cards info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {infoCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div key={card.titleKey} className="card-glass p-5">
                      <div className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center mb-3`}>
                        <Icon className={`w-5 h-5 ${card.c}`} />
                      </div>
                      <h3 className="font-semibold text-white text-sm mb-2">{t(card.titleKey as any)}</h3>
                      {card.lines.map((l) => (
                        <p key={l} className="text-white/60 text-xs leading-relaxed">{t(l as any)}</p>
                      ))}
                    </div>
                  );
                })}
              </div>

              {/* Comment venir */}
              <div className="card-glass p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-900/40 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Bus className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-2">{t('how_title')}</h3>
                    <ul className="space-y-1">
                      {['how_l1', 'how_l2', 'how_l3'].map(k => (
                        <li key={k} className="text-white/60 text-xs flex items-start gap-1.5">
                          <span className="text-[var(--church-gold)] mt-0.5">•</span>
                          {t(k as any)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="card-glass p-5 border border-emerald-800/30">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#25D366]/20 flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-sm mb-1">{t('wa_title')}</h3>
                    <p className="text-white/60 text-xs mb-3 leading-relaxed">{t('wa_desc')}</p>
                    <Link href="https://wa.me/+237699000000" target="_blank"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white text-xs font-semibold rounded-lg hover:bg-[#22c55e] transition-colors">
                      <MessageCircle className="w-3.5 h-3.5" />
                      {t('wa_btn')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <div className="card-glass p-6 sm:p-8">
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 rounded-full bg-emerald-950/50 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">{t('sent_title')}</h3>
                  <p className="text-white/60 text-sm">{t('sent_desc')}</p>
                </div>
              ) : (
                <>
                  <h3 className="font-heading text-xl font-bold text-white mb-6">{t('form_title')}</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-white/60 mb-1.5">{t('form_name')}</label>
                      <input type="text" placeholder={t('form_name_ph')} required
                        className="w-full px-4 py-3 rounded-xl text-white outline-none transition-all text-sm"
                        style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.14)' }}
                        value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/60 mb-1.5">{t('form_email')}</label>
                      <input type="email" placeholder="exemple@email.com"
                        className="w-full px-4 py-3 rounded-xl text-white outline-none transition-all text-sm"
                        style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.14)' }}
                        value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/60 mb-1.5">{t('form_message')}</label>
                      <textarea rows={5} placeholder={t('form_message_ph')} required
                        className="w-full px-4 py-3 rounded-xl text-white outline-none transition-all text-sm resize-none"
                        style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.14)' }}
                        value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                    </div>
                    <button type="submit" className="w-full btn-gold">
                      <Send className="w-4 h-4" />
                      {t('form_submit')}
                    </button>
                    <p className="text-center text-white/35 text-xs">{t('form_note')}</p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CARTE */}
      <section>
        <div style={{ background: 'var(--church-navy)' }} className="px-4 sm:px-6 py-6 max-w-7xl mx-auto text-center">
          <h2 className="font-bold text-white text-lg">{t('map_title')}</h2>
          <p className="text-white/50 text-sm mt-1">{t('map_sub')}</p>
        </div>
        <div className="h-[400px] sm:h-[480px] relative">
          <iframe
            src="https://maps.google.com/maps?q=Nkoabang+Yaound%C3%A9+Cameroun&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
            referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 w-full h-full"
            title="ÉPUC Nkoabang" />
          <div className="absolute top-3 left-3 card-soft px-3 py-2 text-xs font-medium text-[var(--church-blue)] flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            ÉPUC Nkoabang
          </div>
        </div>
      </section>
    </div>
  );
}
