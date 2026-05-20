import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getLocale } from 'next-intl/server';
import Link from 'next/link';
import {
  Calendar, MessageSquare, Users, Bell, BookOpen,
  Heart, ArrowRight, Play, Megaphone, Mail, Shield,
  Sparkles,
} from 'lucide-react';
import { getDepartments } from '@/app/actions/departments';
import { getSermons } from '@/app/actions/sermons';
import { getEvents } from '@/app/actions';

// ─── types ────────────────────────────────────────────────────────────────────
type Department = { id: string; name: string; description: string; leader?: string | null; coverImage?: string | null };
type Sermon     = { id: string; title: string; preacher: string; date: Date; description?: string | null; videoUrl?: string | null; audioUrl?: string | null };
type Event      = { id: string; title: string; description: string; date: Date; time: string; location?: string | null; coverImage?: string | null };

export async function generateMetadata() {
  const t = await getTranslations('Marketplace');
  return { title: t('meta_title') };
}

export default async function MarketplacePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t      = await getTranslations('Marketplace');
  const locale = await getLocale();
  const loc    = (p: string) => `/${locale}${p}`;

  const [deptRes, sermonRes, eventRes] = await Promise.all([
    getDepartments(),
    getSermons(),
    getEvents(),
  ]);

  const departments: Department[] = deptRes.success && deptRes.data ? deptRes.data as Department[] : [];
  const sermons:     Sermon[]     = sermonRes.success && sermonRes.data ? (sermonRes.data as Sermon[]).slice(0, 3) : [];
  const events:      Event[]      = eventRes.success && eventRes.data ? (eventRes.data as Event[]).slice(0, 3) : [];

  const fmtDate = (d: Date) =>
    new Date(d).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="pt-20 min-h-screen" style={{ background: 'var(--church-cream)' }}>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 overflow-hidden dark-bg">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=1400&auto=format&fit=crop"
            alt=""
            className="img-section"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg,rgba(7,10,20,.92) 0%,rgba(13,20,37,.85) 100%)' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="badge-gold mb-5 inline-flex">
            <Sparkles className="w-3.5 h-3.5" />
            {t('badge')}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-white mb-4 leading-none">
            {t('hero_title')}
          </h1>
          <p className="text-white/65 max-w-xl mx-auto text-base sm:text-lg leading-relaxed mb-8">
            {t('hero_desc')}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={loc('/activities')} className="btn-gold text-sm">
              {t('cta_activities')} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href={loc('/contact')} className="btn-outline-white text-sm">
              {t('cta_contact')}
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICE CARDS ────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="badge-gold mb-4 inline-flex">{t('services_badge')}</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[var(--church-text)]">
            {t('services_title')}
          </h2>
          <p className="text-[var(--church-text-soft)] max-w-lg mx-auto mt-2 text-sm sm:text-base">
            {t('services_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Events */}
          <ServiceCard
            icon={Calendar}
            color="text-orange-500"
            bg="bg-orange-50"
            border="border-orange-100"
            title={t('svc_events_title')}
            desc={t('svc_events_desc')}
            count={events.length}
            countLabel={t('svc_events_count')}
            href={loc('/activities')}
            cta={t('svc_cta_view')}
          />
          {/* Sermons */}
          <ServiceCard
            icon={Play}
            color="text-blue-600"
            bg="bg-blue-50"
            border="border-blue-100"
            title={t('svc_sermons_title')}
            desc={t('svc_sermons_desc')}
            count={sermons.length}
            countLabel={t('svc_sermons_count')}
            href={loc('/messages')}
            cta={t('svc_cta_listen')}
          />
          {/* Community */}
          <ServiceCard
            icon={Users}
            color="text-green-600"
            bg="bg-green-50"
            border="border-green-100"
            title={t('svc_community_title')}
            desc={t('svc_community_desc')}
            count={departments.length || undefined}
            countLabel={t('svc_community_count')}
            href={loc('/community')}
            cta={t('svc_cta_join')}
          />
          {/* Announcements */}
          <ServiceCard
            icon={Megaphone}
            color="text-red-500"
            bg="bg-red-50"
            border="border-red-100"
            title={t('svc_announce_title')}
            desc={t('svc_announce_desc')}
            href={loc('/announcements')}
            cta={t('svc_cta_read')}
          />
          {/* Bible */}
          <ServiceCard
            icon={BookOpen}
            color="text-amber-600"
            bg="bg-amber-50"
            border="border-amber-100"
            title={t('svc_bible_title')}
            desc={t('svc_bible_desc')}
            href={loc('/bibles')}
            cta={t('svc_cta_open')}
          />
          {/* Donate */}
          <ServiceCard
            icon={Heart}
            color="text-pink-600"
            bg="bg-pink-50"
            border="border-pink-100"
            title={t('svc_donate_title')}
            desc={t('svc_donate_desc')}
            href={loc('/donate')}
            cta={t('svc_cta_give')}
          />
        </div>
      </section>

      {/* ── RECENT SERMONS ───────────────────────────────────────────────────── */}
      {sermons.length > 0 && (
        <section className="py-14 sm:py-20 dark-bg" style={{ background: 'var(--church-navy)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="badge-gold mb-3 inline-flex">{t('sermons_badge')}</span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                  {t('sermons_title')}
                </h2>
              </div>
              <Link href={loc('/messages')} className="text-[#C9973A] text-sm font-semibold hover:underline flex items-center gap-1">
                {t('see_all')} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sermons.map((s, i) => (
                <Link key={s.id} href={loc('/messages')}
                  className="card-glass p-5 flex flex-col gap-3 hover:border-[rgba(201,151,58,0.40)] transition-colors animate-fade-in"
                  style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: '#C9973A' }}>
                      {fmtDate(s.date)}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[rgba(201,151,58,0.15)] flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 text-[#E8B84B]" fill="currentColor" />
                    </div>
                  </div>
                  <h3 className="font-bold text-white text-sm leading-snug line-clamp-2">{s.title}</h3>
                  <p className="text-white/55 text-xs">{s.preacher}</p>
                  {s.description && (
                    <p className="text-white/45 text-[11px] leading-relaxed line-clamp-2">{s.description}</p>
                  )}
                  <div className="mt-auto flex gap-2 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    {s.videoUrl && (
                      <span className="text-[11px] text-[#C9973A] font-medium flex items-center gap-1">
                        <Play className="w-3 h-3" fill="currentColor" /> Vidéo
                      </span>
                    )}
                    {s.audioUrl && (
                      <span className="text-[11px] text-white/50 font-medium flex items-center gap-1">
                        🎧 Audio
                      </span>
                    )}
                    {!s.videoUrl && !s.audioUrl && (
                      <span className="text-[11px] text-white/40 italic">{t('text_only')}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── UPCOMING EVENTS ──────────────────────────────────────────────────── */}
      {events.length > 0 && (
        <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="badge-gold mb-3 inline-flex">{t('events_badge')}</span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--church-text)]">
                {t('events_title')}
              </h2>
            </div>
            <Link href={loc('/activities')} className="text-[#C9973A] text-sm font-semibold hover:underline flex items-center gap-1">
              {t('see_all')} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((ev, i) => (
              <div key={ev.id} className="card-soft overflow-hidden flex flex-col animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}>
                {ev.coverImage && (
                  <div className="w-full h-40 overflow-hidden">
                    <img src={ev.coverImage} alt={ev.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-[#C9973A] text-xs font-semibold mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    {fmtDate(ev.date)} · {ev.time}
                  </div>
                  <h3 className="font-bold text-[var(--church-text)] text-sm leading-snug mb-1">{ev.title}</h3>
                  <p className="text-[var(--church-text-soft)] text-xs leading-relaxed line-clamp-2">{ev.description}</p>
                  {ev.location && (
                    <p className="text-[var(--church-text-soft)] text-[11px] mt-2 opacity-70">{ev.location}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── DEPARTMENTS ──────────────────────────────────────────────────────── */}
      {departments.length > 0 && (
        <section className="py-14 sm:py-20 dark-bg" style={{ background: 'var(--church-navy)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="badge-gold mb-3 inline-flex">{t('dept_badge')}</span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                  {t('dept_title')}
                </h2>
              </div>
              <Link href={loc('/community')} className="text-[#C9973A] text-sm font-semibold hover:underline flex items-center gap-1">
                {t('see_all')} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {departments.slice(0, 6).map((dept, i) => (
                <div key={dept.id} className="card-glass p-5 animate-fade-in" style={{ animationDelay: `${i * 0.08}s` }}>
                  {dept.coverImage && (
                    <div className="w-full h-32 rounded-xl overflow-hidden mb-4">
                      <img src={dept.coverImage} alt={dept.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(201,151,58,0.15)', border: '1px solid rgba(201,151,58,0.25)' }}>
                      <Users className="w-4 h-4 text-[#E8B84B]" />
                    </div>
                    <h3 className="font-bold text-white text-sm leading-snug">{dept.name}</h3>
                  </div>
                  <p className="text-white/60 text-xs leading-relaxed line-clamp-3">{dept.description}</p>
                  {dept.leader && (
                    <p className="text-[#C9973A] text-[11px] font-semibold mt-3 flex items-center gap-1">
                      <Shield className="w-3 h-3" /> {dept.leader}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA BOTTOM ───────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24" style={{ background: 'var(--church-cream-deep)' }}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <span className="badge-gold mb-4 inline-flex">{t('cta_badge')}</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[var(--church-text)] mb-3">
            {t('cta_title')}
          </h2>
          <p className="text-[var(--church-text-soft)] text-sm sm:text-base leading-relaxed mb-8">
            {t('cta_desc')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={loc('/contact')} className="btn-gold">
              <Mail className="w-4 h-4" />
              {t('cta_contact')}
            </Link>
            <Link href={loc('/donate')} className="btn-outline">
              <Heart className="w-4 h-4" />
              {t('cta_donate')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── ServiceCard ──────────────────────────────────────────────────────────────
function ServiceCard({
  icon: Icon, color, bg, border,
  title, desc, count, countLabel, href, cta,
}: {
  icon: React.ElementType;
  color: string; bg: string; border: string;
  title: string; desc: string;
  count?: number; countLabel?: string;
  href: string; cta: string;
}) {
  return (
    <Link
      href={href}
      className="card-soft p-6 flex flex-col gap-4 group hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center border ${border}`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        {count !== undefined && count > 0 && (
          <span
            className="text-[11px] font-bold px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(201,151,58,0.12)', color: '#C9973A', border: '1px solid rgba(201,151,58,0.25)' }}
          >
            {count} {countLabel}
          </span>
        )}
      </div>
      <div>
        <h3 className="font-bold text-[var(--church-text)] mb-1.5 text-base">{title}</h3>
        <p className="text-[var(--church-text-soft)] text-sm leading-relaxed">{desc}</p>
      </div>
      <div className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-[var(--church-gold)] group-hover:gap-2.5 transition-all">
        {cta} <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
}
