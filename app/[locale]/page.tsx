'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Play, Clock, MapPin, Star, Send,
  MessageCircle, Facebook, ChevronDown,
  BookOpen, Flame, HandHeart, Users, Calendar,
  MessageSquare, Sparkles, Heart, Zap, Globe
} from 'lucide-react';
import { toast } from 'sonner';
import { getEvents, getTestimonials, submitTestimonial } from '@/app/actions';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

/* ── Images — Contexte africain & foi ───────────────────────── */
const IMG = {
  hero1: '/epuc-church-1.jpg',
  hero2: '/epuc-church-2.jpg',
  hero3: '/epuc-church-3.jpg',
  hero4: '/church-cover.webp',
  /* Unsplash — Afrique noire, communauté, foi */
  prayer:    'https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?q=80&w=1400&auto=format&fit=crop',
  bible:     'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1400&auto=format&fit=crop',
  worship:   'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=1400&auto=format&fit=crop',
  community: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1400&auto=format&fit=crop',
  africa:    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=1400&auto=format&fit=crop',
};

const features = [
  { icon: Flame,     key: 'f1', color: 'text-orange-400', bg: 'bg-orange-950/40',  border: 'border-orange-800/30' },
  { icon: BookOpen,  key: 'f2', color: 'text-blue-400',   bg: 'bg-blue-950/40',   border: 'border-blue-800/30'  },
  { icon: Users,     key: 'f3', color: 'text-[#22C55E]',  bg: 'bg-green-950/40',  border: 'border-green-800/30' }, // Vert Espérance
  { icon: HandHeart, key: 'f4', color: 'text-[#F87171]',  bg: 'bg-red-950/40',    border: 'border-red-800/30'   }, // Rouge Sang
];

const promiseIcons = [
  { icon: Flame,     color: 'text-orange-500',           bg: 'bg-orange-50'   },
  { icon: BookOpen,  color: 'text-blue-600',             bg: 'bg-blue-50'     },
  { icon: Sparkles,  color: 'text-amber-500',            bg: 'bg-amber-50'    },
  { icon: Heart,     color: 'text-[#B91C1C]',            bg: 'bg-[#FFF1F2]'   }, // Rouge Sang — Rédemption
  { icon: Zap,       color: 'text-yellow-500',           bg: 'bg-yellow-50'   },
  { icon: Globe,     color: 'text-[#16803A]',            bg: 'bg-[#F0FDF4]'   }, // Vert Espérance — Mission
];

export default function Home() {
  const locale = useParams()?.locale as string || 'fr';
  const t = useTranslations('Home');
  const [visible, setVisible]     = useState(false);
  const [imgIdx, setImgIdx]       = useState(0);
  const [review, setReview]       = useState({ name: '', comment: '', rating: 5 });
  const [events, setEvents]       = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const heroImgs = [IMG.hero1, IMG.hero2, IMG.hero3, IMG.hero4];

  useEffect(() => {
    setVisible(true);
    (async () => {
      const [ev, te] = await Promise.all([getEvents(), getTestimonials()]);
      if (ev.success && ev.data)   setEvents(ev.data);
      if (te.success && te.data)   setTestimonials(te.data);
    })();
    const id = setInterval(() => setImgIdx(p => (p + 1) % heroImgs.length), 5000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await submitTestimonial({ name: review.name, comment: review.comment, rating: review.rating });
    if (res.success) {
      toast.success(t('toast_success'));
      setReview({ name: '', comment: '', rating: 5 });
      const te = await getTestimonials();
      if (te.success && te.data) setTestimonials(te.data);
    } else {
      toast.error(t('toast_error'));
    }
  };

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          HERO — Plein écran, images africaines, texte minimal
      ══════════════════════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
        {heroImgs.map((src, i) => (
          <div key={src} className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: imgIdx === i ? 1 : 0 }}>
            <img src={src} alt="" className="img-section"
              onError={(e) => { (e.target as HTMLImageElement).src = IMG.worship; }} />
          </div>
        ))}
        {/* Overlay dégradé vers le bas */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(7,10,20,.96) 0%, rgba(7,10,20,.55) 50%, rgba(7,10,20,.20) 100%)' }} />

        {/* Contenu centré */}
        <div className="relative z-10 w-full pb-16 sm:pb-20 px-4 sm:px-8 max-w-5xl mx-auto">
          <div className={`transition-all duration-1000 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <span className="badge-white mb-5 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8B84B] animate-pulse-soft" />
              {t('badge')}
            </span>

            <h1 className="font-display text-5xl sm:text-6xl md:text-8xl font-semibold text-white leading-none mb-2">
              {t('hero_title')}
            </h1>
            <p className="text-[#C9973A] font-heading text-lg sm:text-xl md:text-2xl mb-6 font-medium tracking-wide">
              {t('hero_subtitle')}
            </p>
            <p className="text-white/70 text-base sm:text-lg max-w-xl mb-10 leading-relaxed font-light">
              {t('hero_desc')}
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link href={`/${locale}/about`} className="btn-gold text-sm sm:text-base">
                {t('hero_cta1')} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={`/${locale}/messages`} className="btn-outline-white text-sm sm:text-base">
                <Play className="w-4 h-4" fill="currentColor" />
                {t('hero_cta2')}
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-4">
              {[
                { num: t('stat1_num'), label: t('stat1_label') },
                { num: t('stat2_num'), label: t('stat2_label') },
                { num: t('stat3_num'), label: t('stat3_label') },
              ].map(s => (
                <div key={s.label} className="card-glass px-5 py-3">
                  <div className="text-[#E8B84B] font-bold text-xl sm:text-2xl">{s.num}</div>
                  <div className="text-white/65 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Indicateurs image */}
        <div className="absolute bottom-6 right-6 flex gap-1.5 z-20">
          {heroImgs.map((_, i) => (
            <button key={i} onClick={() => setImgIdx(i)}
              className={`h-1 rounded-full transition-all ${imgIdx === i ? 'w-8 bg-[#E8B84B]' : 'w-2 bg-white/30'}`} />
          ))}
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 animate-bounce hidden md:block">
          <ChevronDown className="w-5 h-5" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          BANDE VERSET — Or sur Sombre
      ══════════════════════════════════════════════════════════ */}
      <section className="relative py-10 overflow-hidden dark-bg" style={{ background: 'var(--church-navy)' }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #C9973A 0, #C9973A 1px, transparent 0, transparent 50%)', backgroundSize: '24px 24px' }} />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <p className="font-display italic text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed">
            {t('verse_text')}
          </p>
          <span className="block mt-3 text-[#C9973A] font-semibold text-sm">{t('verse_ref')}</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          POURQUOI NOUS — Image bg + Cards verre
      ══════════════════════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 overflow-hidden dark-bg">
        {/* Fond image africain adoration */}
        <div className="absolute inset-0">
          <img src={IMG.worship} alt="" className="img-section"
            onError={(e) => { (e.target as HTMLImageElement).src = IMG.prayer; }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(7,10,20,.90) 0%, rgba(13,20,37,.82) 100%)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="badge-gold mb-4 inline-flex">{t('why_badge')}</span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
              {t('why_title')}
            </h2>
            <p className="text-white/60 max-w-xl mx-auto text-base sm:text-lg">{t('why_desc')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={f.key} className={`card-glass border ${f.border} p-6 animate-fade-in`}
                  style={{ animationDelay: `${i * .12}s` }}>
                  <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-5`}>
                    <Icon className={`w-6 h-6 ${f.color}`} />
                  </div>
                  <h3 className="font-semibold text-white mb-2 leading-snug">{t(`${f.key}_title` as any)}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{t(`${f.key}_desc` as any)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          GALERIE — Bento Grid avec vraies images
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24" style={{ background: 'var(--church-cream)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="badge-gold mb-4 inline-flex">{t('gallery_badge')}</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[var(--church-text)] mb-2">
              {t('gallery_title')}
            </h2>
            <p className="text-[var(--church-text-soft)] max-w-lg mx-auto text-sm sm:text-base">{t('gallery_desc')}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {[
              { src: '/church-1.webp', cls: 'row-span-2', h: 'h-72 sm:h-auto' },
              { src: '/church-2.webp', cls: '', h: 'h-36 sm:h-48' },
              { src: '/church-3.webp', cls: '', h: 'h-36 sm:h-48' },
              { src: '/church-cover.webp', cls: 'col-span-2', h: 'h-48 sm:h-56' },
              { src: IMG.bible, cls: 'hidden md:block', h: 'h-56' },
            ].map((img, i) => (
              <div key={i} className={`relative overflow-hidden rounded-2xl group ${img.cls}`}>
                <img src={img.src} alt="ÉPUC Nkoabang"
                  className={`w-full ${img.h} object-cover transition-transform duration-700 group-hover:scale-105`}
                  onError={(e) => { (e.target as HTMLImageElement).src = IMG.prayer; }} />
                <div className="absolute inset-0 bg-[var(--church-gold)]/0 group-hover:bg-[var(--church-gold)]/10 transition-colors duration-500 rounded-2xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          À PROPOS — Image pleine largeur + Texte
      ══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
          {/* Image */}
          <div className="relative h-72 sm:h-96 lg:h-auto">
            <img src={IMG.prayer} alt="Assemblée en prière"
              className="img-section"
              onError={(e) => { (e.target as HTMLImageElement).src = '/church-cover.webp'; }} />
            <div className="absolute inset-0 bg-[var(--church-navy)]/30" />
          </div>

          {/* Texte */}
          <div className="bg-[var(--church-navy)] px-8 sm:px-12 lg:px-16 py-14 sm:py-20 flex flex-col justify-center dark-bg">
            <span className="badge-gold mb-5 inline-flex w-fit">{t('about_badge')}</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-2 leading-tight">
              {t('about_title_1')}
            </h2>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gradient-gold mb-6 leading-tight">
              {t('about_title_2')}
            </h2>
            <p className="text-white/70 text-base leading-relaxed mb-8">{t('about_desc')}</p>

            <div className="verse-card mb-8 bg-white/5 border-l-[var(--church-gold)]">
              <p className="verse-text text-white/85 text-sm sm:text-base">{t('about_verse')}</p>
              <span className="block mt-2 text-[var(--church-gold)] text-xs font-semibold">{t('about_verse_ref')}</span>
            </div>

            {/* Localisation card */}
            <div className="flex items-start gap-3 mb-8 p-4 rounded-xl border border-white/10 bg-white/5">
              <MapPin className="w-5 h-5 text-[var(--church-gold)] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-semibold text-sm">{t('location_title')}</p>
                <p className="text-white/60 text-sm mt-0.5">{t('location_desc')}</p>
              </div>
            </div>

            <Link href={`/${locale}/about`} className="btn-gold w-fit">
              {t('about_cta')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          NOS ENGAGEMENTS — Crème + image Bible
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24" style={{ background: 'var(--church-cream)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="badge-gold mb-5 inline-flex">{t('promises_badge')}</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[var(--church-text)] leading-tight mb-2">
                {t('promises_title_1')}
              </h2>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gradient-gold leading-tight mb-6">
                {t('promises_title_2')}
              </h2>
              <p className="text-[var(--church-text-mid)] text-base leading-relaxed mb-10">
                {t('promises_desc')}
              </p>
              <Link href={`/${locale}/activities`} className="btn-outline">
                {t('promises_cta')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {promiseIcons.map(({ icon: Icon, color, bg }, i) => (
                <div key={i} className="card-soft p-4 flex items-start gap-3">
                  <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <p className="text-[var(--church-text-mid)] text-sm leading-relaxed">
                    {t(`p${i + 1}` as any)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          ÉVÉNEMENTS — Fond sombre + image croix
      ══════════════════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-24 overflow-hidden dark-bg">
        <div className="absolute inset-0">
          <img src={IMG.africa} alt="" className="img-section"
            onError={(e) => { (e.target as HTMLImageElement).src = IMG.worship; }} />
          <div className="absolute inset-0" style={{ background: 'rgba(7,10,20,.88)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <span className="badge-gold mb-4 inline-flex">{t('events_badge')}</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">{t('events_title')}</h2>
            <p className="text-white/60 max-w-xl mx-auto">{t('events_desc')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {events.length === 0 ? (
              <div className="col-span-3 text-center py-14">
                <Calendar className="w-10 h-10 text-white/25 mx-auto mb-3" />
                <p className="text-white/50">{t('no_events')}</p>
                <p className="text-white/30 text-sm mt-1">{t('no_events_sub')}</p>
              </div>
            ) : events.map((ev, i) => (
              <div key={ev.id} className="card-glass overflow-hidden animate-fade-in flex flex-col" style={{ animationDelay: `${i * .1}s` }}>
                {ev.coverImage && (
                  <div className="w-full h-48 overflow-hidden flex-shrink-0">
                    <img src={ev.coverImage} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" alt={ev.title} />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-[#C9973A] font-semibold text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    {new Date(ev.date).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">{ev.title}</h3>
                  <p className="text-white/60 text-sm mb-4 line-clamp-2">{ev.description}</p>
                  <div className="mt-auto flex gap-4 text-xs text-white/40">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{ev.time}</span>
                    {ev.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{ev.location}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TÉMOIGNAGES — Crème, cartes propres
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24" style={{ background: 'var(--church-cream-deep)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="badge-gold mb-4 inline-flex">{t('testi_badge')}</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[var(--church-text)] mb-3">
              {t('testi_title')}
            </h2>
            <p className="text-[var(--church-text-soft)] max-w-xl mx-auto">{t('testi_desc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.length === 0 ? (
              <div className="col-span-3 text-center py-12">
                <MessageSquare className="w-10 h-10 text-[var(--church-text-soft)] mx-auto mb-3 opacity-40" />
                <p className="text-[var(--church-text-soft)]">{t('no_testi')}</p>
                <p className="text-[var(--church-text-soft)] text-sm mt-1 opacity-60">{t('no_testi_sub')}</p>
              </div>
            ) : testimonials.map((te, i) => (
              <div key={te.id} className="card-soft p-6 animate-fade-in" style={{ animationDelay: `${i * .15}s` }}>
                <div className="flex mb-3">
                  {[...Array(te.rating)].map((_, j) => <Star key={j} className="w-4 h-4 text-[var(--church-gold)]" fill="currentColor" />)}
                </div>
                <p className="text-[var(--church-text-mid)] text-sm italic leading-relaxed mb-5">"{te.content}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[var(--church-text)] text-sm">{te.name}</p>
                    {te.role && <p className="text-[var(--church-text-soft)] text-xs mt-0.5">{te.role}</p>}
                  </div>
                  <div className="flex gap-2">
                    <a href={`https://wa.me/?text=${encodeURIComponent(`"${te.content}" — ÉPUC Nkoabang`)}`} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-[var(--church-border-soft)] hover:bg-[#25D366] flex items-center justify-center text-[var(--church-text-soft)] hover:text-white transition-all">
                      <MessageCircle className="w-4 h-4" />
                    </a>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=https://epuc-nkoabang.cm`} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-[var(--church-border-soft)] hover:bg-[#1877F2] flex items-center justify-center text-[var(--church-text-soft)] hover:text-white transition-all">
                      <Facebook className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FORMULAIRE TÉMOIGNAGE
      ══════════════════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-24 overflow-hidden dark-bg">
        <div className="absolute inset-0">
          <img src={IMG.community} alt="" className="img-section"
            onError={(e) => { (e.target as HTMLImageElement).src = IMG.bible; }} />
          <div className="absolute inset-0" style={{ background: 'rgba(7,10,20,.82)' }} />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
          <div className="card-glass p-7 sm:p-10">
            <div className="text-center mb-8">
              <span className="badge-gold mb-4 inline-flex">{t('form_badge')}</span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2">{t('form_title')}</h2>
              <p className="text-white/60 text-sm">{t('form_desc')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">{t('form_name')}</label>
                  <input type="text" required placeholder={t('form_name_ph')}
                    className="w-full px-4 py-3 rounded-xl border text-white text-sm outline-none transition-all"
                    style={{ background:'rgba(255,255,255,0.08)', borderColor:'rgba(255,255,255,0.15)' }}
                    value={review.name} onChange={e => setReview({ ...review, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">{t('form_rating')}</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border text-white outline-none transition-all text-sm"
                    style={{ background:'rgba(255,255,255,0.08)', borderColor:'rgba(255,255,255,0.15)' }}
                    value={review.rating} onChange={e => setReview({ ...review, rating: Number(e.target.value) })}>
                    <option value="5" style={{ background:'#1a2035' }}>{t('form_rating5')}</option>
                    <option value="4" style={{ background:'#1a2035' }}>{t('form_rating4')}</option>
                    <option value="3" style={{ background:'#1a2035' }}>{t('form_rating3')}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">{t('form_message')}</label>
                <textarea required rows={4} placeholder={t('form_message_ph')}
                  className="w-full px-4 py-3 rounded-xl border text-white outline-none transition-all text-sm resize-none"
                  style={{ background:'rgba(255,255,255,0.08)', borderColor:'rgba(255,255,255,0.15)' }}
                  value={review.comment} onChange={e => setReview({ ...review, comment: e.target.value })} />
              </div>
              <button type="submit" className="btn-gold w-full">
                <Send className="w-4 h-4" />
                {t('form_submit')}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
