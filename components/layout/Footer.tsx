import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, MessageCircle, Flame } from 'lucide-react';
import NewsletterForm from '../NewsletterForm';
import { getTranslations } from 'next-intl/server';

export default async function Footer() {
  const t = await getTranslations('Footer');
  const nt = await getTranslations('Navigation');

  const quickLinks = ['home', 'about', 'activities', 'messages', 'community', 'contact', 'donate'] as const;
  const hrefs = ['/', '/about', '/activities', '/messages', '/community', '/contact', '/donate'];

  const schedule = [
    { name: t('s1_name'), time: t('s1_time') },
    { name: t('s2_name'), time: t('s2_time') },
    { name: t('s3_name'), time: t('s3_time') },
    { name: t('s4_name'), time: t('s4_time') },
    { name: t('s5_name'), time: t('s5_time') },
  ];

  return (
    <footer style={{ background: 'var(--church-dark)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Logo & Description */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,var(--church-gold),var(--church-gold-light))' }}>
                <Flame className="w-5 h-5 text-[#1C1917]" />
              </div>
              <div>
                <p className="font-heading font-bold text-white text-base leading-tight">ÉPUC NKOABANG</p>
                <p className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(201,151,58,0.55)' }}>Église Pentecôtiste Unie</p>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">{t('description')}</p>
            <div className="flex gap-2.5">
              {[
                { icon: Facebook,     href: '#' },
                { icon: Instagram,    href: '#' },
                { icon: Youtube,      href: '#' },
                { icon: MessageCircle,href: 'https://wa.me/+237699000000' },
              ].map(({ icon: Icon, href }) => (
                <Link key={href} href={href} target={href.startsWith('http') ? '_blank' : undefined}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white/35 hover:text-white hover:bg-[rgba(201,151,58,0.20)] bg-white/[0.06] transition-all duration-200">
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[var(--church-gold)] inline-block" />
              {t('nav_title')}
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((k, i) => (
                <li key={k}>
                  <Link href={hrefs[i]}
                    className="text-white/70 hover:text-[var(--church-gold)] transition-colors text-sm">
                    {nt(k)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Horaires */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[var(--church-gold)] inline-block" />
              {t('hours_title')}
            </h4>
            <ul className="space-y-3">
              {schedule.map(s => (
                <li key={s.name} className="flex justify-between items-start gap-2 border-b pb-2.5 last:border-0 last:pb-0"
                  style={{ borderColor: 'rgba(255,255,255,.06)' }}>
                  <span className="text-white/75 text-xs font-medium">{s.name}</span>
                  <span className="text-xs flex-shrink-0" style={{ color: 'rgba(201,151,58,0.75)' }}>{s.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="space-y-5">
            <div>
              <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-5 flex items-center gap-2">
                <span className="w-4 h-0.5 bg-[var(--church-gold)] inline-block" />
                {t('contact_title')}
              </h4>
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[var(--church-gold)] mt-0.5 flex-shrink-0" />
                  <div className="text-white/70 leading-relaxed">
                    <p className="text-white/90 font-medium">{t('address1')}</p>
                    <p>{t('address2')}</p>
                    <p>{t('address3')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[var(--church-gold)] flex-shrink-0" />
                  <p className="text-white/70">+237 6 99 00 00 00</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[var(--church-gold)] flex-shrink-0" />
                  <p className="text-white/70">contact@epuc-nkoabang.cm</p>
                </div>
              </div>
            </div>
            <NewsletterForm />
          </div>
        </div>

        {/* Bas */}
        <div className="mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/60"
          style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}>
          <p>© {new Date().getFullYear()} ÉPUC Nkoabang. {t('rights')}</p>
          <p className="text-white/50 italic text-center hidden sm:block">
            {t('verse')} <span className="not-italic ml-1" style={{ color: 'rgba(201,151,58,0.70)' }}>{t('verse_ref')}</span>
          </p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white/60 transition-colors">{t('privacy')}</Link>
            <Link href="#" className="hover:text-white/60 transition-colors">{t('legal')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
