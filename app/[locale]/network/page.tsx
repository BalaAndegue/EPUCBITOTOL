'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin, Phone, Mail, CheckCircle, ArrowRight,
  Building2, ChevronDown, ChevronUp, Star,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────
   CHURCH DATA — bilingual fields stay in data, UI strings use t()
───────────────────────────────────────────────────────────────── */
type Church = {
  id: string;
  name_fr: string;
  name_en: string;
  address_fr: string;
  address_en: string;
  phone: string;
  email: string;
  leader_name_fr: string;
  leader_name_en: string;
  leader_role_fr: string;
  leader_role_en: string;
  leader_image: string;
  church_image: string;
  is_current?: boolean;
  is_hq?: boolean;
  reg?: string;
  motto_fr: string;
  motto_en: string;
};

type CityData = {
  id: string;
  name_fr: string;
  name_en: string;
  region_fr: string;
  region_en: string;
  lat: number;
  lng: number;
  color: string;
  dot: string;
  churches: Church[];
};

const CITIES: CityData[] = [
  {
    id: 'yaounde',
    name_fr: 'Yaoundé', name_en: 'Yaounde',
    region_fr: 'Région du Centre', region_en: 'Centre Region',
    lat: 3.848, lng: 11.502, color: '#D4A843', dot: '#D4A843',
    churches: [
      {
        id: 'nkoabang',
        name_fr: 'ÉPUC Nkoabang', name_en: 'UPCI Nkoabang',
        address_fr: 'Entrée École, Bittotol, Nkoabang\nAvant le 10ème arrêt depuis Biteng, Yaoundé',
        address_en: 'School Entrance, Bittotol, Nkoabang\nBefore the 10th stop from Biteng, Yaounde',
        phone: '+237 678 346 011', email: 'descieux758@gmail.com',
        leader_name_fr: 'Pasteur de l\'Assemblée', leader_name_en: 'Assembly Pastor',
        leader_role_fr: 'Berger de Nkoabang', leader_role_en: 'Shepherd of Nkoabang',
        leader_image: '/church-1.webp', church_image: '/epuc-church-1.jpg',
        is_current: true,
        reg: 'N° 00382/L/CF/MINADT/DAP/SAC — 21 déc. 2006',
        motto_fr: 'Édifier · Équiper · Autonomiser', motto_en: 'Edify · Equip · Empower',
      },
      {
        id: 'yaounde-centrale',
        name_fr: 'ÉPUI Yaoundé — Assemblée Centrale', name_en: 'UPCI Yaounde — Central Assembly',
        address_fr: 'B.P. 14751, Yaoundé, Cameroun\nLes Pentecôtistes Unicitaires de Yaoundé',
        address_en: 'P.O. Box 14751, Yaounde, Cameroon\nThe Oneness Pentecostals of Yaounde',
        phone: '+237 696 714 925 / +237 673 093 234', email: 'ydeonenesspentecostals@gmail.com',
        leader_name_fr: 'Pasteur Secteur Yaoundé', leader_name_en: 'Yaounde Section Pastor',
        leader_role_fr: 'Responsable Secteur', leader_role_en: 'Section Leader',
        leader_image: '/church-2.webp', church_image: '/epuc-church-2.jpg',
        reg: 'N° 00382/L/CF/MINADT/DAP/SAC — 21 déc. 2006',
        motto_fr: 'Édifier · Équiper · Autonomiser', motto_en: 'Edify · Equip · Empower',
      },
      {
        id: 'yaounde-mendong',
        name_fr: 'ÉPUI Yaoundé — Assemblée de Mendong', name_en: 'UPCI Yaounde — Mendong Assembly',
        address_fr: 'Quartier Mendong, Yaoundé, Cameroun', address_en: 'Mendong District, Yaounde, Cameroon',
        phone: '+237 673 871 025', email: 'ydeonenesspentecostals@gmail.com',
        leader_name_fr: 'Pasteur de l\'Assemblée', leader_name_en: 'Assembly Pastor',
        leader_role_fr: 'Berger local', leader_role_en: 'Local Shepherd',
        leader_image: '/church-3.webp', church_image: '/epuc-church-3.jpg',
        motto_fr: 'Édifier · Équiper · Autonomiser', motto_en: 'Edify · Equip · Empower',
      },
      {
        id: 'yaounde-essos',
        name_fr: 'ÉPUI Yaoundé — Assemblée d\'Essos', name_en: 'UPCI Yaounde — Essos Assembly',
        address_fr: 'Quartier Essos, Yaoundé, Cameroun', address_en: 'Essos District, Yaounde, Cameroon',
        phone: '+237 678 346 011', email: 'ydeonenesspentecostals@gmail.com',
        leader_name_fr: 'Pasteur de l\'Assemblée', leader_name_en: 'Assembly Pastor',
        leader_role_fr: 'Berger local', leader_role_en: 'Local Shepherd',
        leader_image: '/church-1.webp', church_image: '/epuc-church-1.jpg',
        motto_fr: 'Édifier · Équiper · Autonomiser', motto_en: 'Edify · Equip · Empower',
      },
    ],
  },
  {
    id: 'douala',
    name_fr: 'Douala', name_en: 'Douala',
    region_fr: 'Région du Littoral', region_en: 'Littoral Region',
    lat: 4.051, lng: 9.767, color: '#3B82F6', dot: '#60A5FA',
    churches: [
      {
        id: 'douala-centrale',
        name_fr: 'ÉPUI Douala — Assemblée Centrale', name_en: 'UPCI Douala — Central Assembly',
        address_fr: 'Douala, Région du Littoral, Cameroun', address_en: 'Douala, Littoral Region, Cameroon',
        phone: '+237 678 346 011', email: 'upci.douala@gmail.com',
        leader_name_fr: 'Pasteur de l\'Assemblée', leader_name_en: 'Assembly Pastor',
        leader_role_fr: 'Berger de Douala', leader_role_en: 'Douala Shepherd',
        leader_image: '/church-2.webp', church_image: '/epuc-church-2.jpg',
        motto_fr: 'Édifier · Équiper · Autonomiser', motto_en: 'Edify · Equip · Empower',
      },
      {
        id: 'douala-bonaberi',
        name_fr: 'ÉPUI Douala — Assemblée de Bonabéri', name_en: 'UPCI Douala — Bonaberi Assembly',
        address_fr: 'Bonabéri, Douala, Cameroun', address_en: 'Bonaberi, Douala, Cameroon',
        phone: '+237 673 093 234', email: 'upci.douala@gmail.com',
        leader_name_fr: 'Pasteur de l\'Assemblée', leader_name_en: 'Assembly Pastor',
        leader_role_fr: 'Berger local', leader_role_en: 'Local Shepherd',
        leader_image: '/church-3.webp', church_image: '/epuc-church-3.jpg',
        motto_fr: 'Édifier · Équiper · Autonomiser', motto_en: 'Edify · Equip · Empower',
      },
      {
        id: 'douala-kotto',
        name_fr: 'ÉPUI Douala — Assemblée de Kotto', name_en: 'UPCI Douala — Kotto Assembly',
        address_fr: 'Kotto, Douala, Cameroun', address_en: 'Kotto, Douala, Cameroon',
        phone: '+237 673 871 025', email: 'upci.douala@gmail.com',
        leader_name_fr: 'Pasteur de l\'Assemblée', leader_name_en: 'Assembly Pastor',
        leader_role_fr: 'Berger local', leader_role_en: 'Local Shepherd',
        leader_image: '/church-1.webp', church_image: '/epuc-church-1.jpg',
        motto_fr: 'Édifier · Équiper · Autonomiser', motto_en: 'Edify · Equip · Empower',
      },
    ],
  },
  {
    id: 'buea',
    name_fr: 'Buea', name_en: 'Buea',
    region_fr: 'Région du Sud-Ouest', region_en: 'South West Region',
    lat: 4.154, lng: 9.241, color: '#10B981', dot: '#34D399',
    churches: [
      {
        id: 'buea-hq',
        name_fr: 'ÉPUI Buea — Siège National', name_en: 'UPCI Buea — National Headquarters',
        address_fr: 'B.P. 411, Buea, Région du Sud-Ouest, Cameroun\nBureau Exécutif National ÉPUI CMR',
        address_en: 'P.O. Box 411, Buea, South West Region, Cameroon\nUPCI CMR National Executive Office',
        phone: '+237 673 871 025', email: 'upci.cameroon@gmail.com',
        leader_name_fr: 'Surintendant National', leader_name_en: 'National Superintendent',
        leader_role_fr: 'Directeur Exécutif National', leader_role_en: 'National Executive Director',
        leader_image: '/church-2.webp', church_image: '/epuc-church-2.jpg',
        is_hq: true,
        reg: 'UPCI/EPUI CMR — Siège National',
        motto_fr: 'Édifier · Équiper · Autonomiser', motto_en: 'Edify · Equip · Empower',
      },
      {
        id: 'buea-molyko',
        name_fr: 'ÉPUI Buea — Assemblée de Molyko', name_en: 'UPCI Buea — Molyko Assembly',
        address_fr: 'Molyko, Buea, Région du Sud-Ouest, Cameroun',
        address_en: 'Molyko, Buea, South West Region, Cameroon',
        phone: '+237 673 871 025', email: 'upci.cameroon@gmail.com',
        leader_name_fr: 'Pasteur de l\'Assemblée', leader_name_en: 'Assembly Pastor',
        leader_role_fr: 'Berger local', leader_role_en: 'Local Shepherd',
        leader_image: '/church-3.webp', church_image: '/epuc-church-3.jpg',
        motto_fr: 'Édifier · Équiper · Autonomiser', motto_en: 'Edify · Equip · Empower',
      },
    ],
  },
  {
    id: 'bamenda',
    name_fr: 'Bamenda', name_en: 'Bamenda',
    region_fr: 'Région du Nord-Ouest', region_en: 'North West Region',
    lat: 5.962, lng: 10.159, color: '#8B5CF6', dot: '#A78BFA',
    churches: [
      {
        id: 'bamenda-mile4',
        name_fr: 'ÉPUI Bamenda — Assemblée Mile 4', name_en: 'UPCI Bamenda — Mile 4 Assembly',
        address_fr: 'Mile 4, Bamenda, Région du Nord-Ouest, Cameroun',
        address_en: 'Mile 4, Bamenda, North West Region, Cameroon',
        phone: '+237 673 093 234', email: 'upci.bamenda@gmail.com',
        leader_name_fr: 'Pasteur de l\'Assemblée', leader_name_en: 'Assembly Pastor',
        leader_role_fr: 'Berger de Bamenda', leader_role_en: 'Bamenda Shepherd',
        leader_image: '/church-1.webp', church_image: '/epuc-church-1.jpg',
        motto_fr: 'Édifier · Équiper · Autonomiser', motto_en: 'Edify · Equip · Empower',
      },
      {
        id: 'bamenda-ntarikon',
        name_fr: 'ÉPUI Bamenda — Assemblée de Ntarikon', name_en: 'UPCI Bamenda — Ntarikon Assembly',
        address_fr: 'Ntarikon, Bamenda, Région du Nord-Ouest, Cameroun',
        address_en: 'Ntarikon, Bamenda, North West Region, Cameroon',
        phone: '+237 673 093 234', email: 'upci.bamenda@gmail.com',
        leader_name_fr: 'Pasteur de l\'Assemblée', leader_name_en: 'Assembly Pastor',
        leader_role_fr: 'Berger local', leader_role_en: 'Local Shepherd',
        leader_image: '/church-2.webp', church_image: '/epuc-church-3.jpg',
        motto_fr: 'Édifier · Équiper · Autonomiser', motto_en: 'Edify · Equip · Empower',
      },
    ],
  },
];

const VALUE_KEYS = ['v1','v2','v3','v4','v5','v6','v7','v8','v9','v10','v11','v12','v13','v14'] as const;
const WOMEN_POLICY_KEYS = ['policy_w1','policy_w2','policy_w3','policy_w4','policy_w5'] as const;
const MEN_POLICY_KEYS   = ['policy_m1','policy_m2','policy_m3','policy_m4','policy_m5'] as const;

/* ─────────────────────────────────────────────────────────────────
   CHURCH CARD
───────────────────────────────────────────────────────────────── */
function ChurchCard({ church, locale, cityColor }: { church: Church; locale: string; cityColor: string }) {
  const t = useTranslations('Network');
  const [expanded, setExpanded] = useState(false);
  const isFr  = locale === 'fr';
  const name    = isFr ? church.name_fr    : church.name_en;
  const address = isFr ? church.address_fr : church.address_en;
  const role    = isFr ? church.leader_role_fr : church.leader_role_en;
  const motto   = isFr ? church.motto_fr   : church.motto_en;

  return (
    <div className={`rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-xl ${
      church.is_current ? 'ring-2' : 'border border-[var(--border)]'
    }`}
      style={{
        background: 'var(--white)',
        ...(church.is_current ? { boxShadow: `0 0 0 2px ${cityColor}` } : {}),
      }}
    >
      <div className="relative h-44 overflow-hidden">
        <img src={church.church_image} alt={name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).src = '/epuc-church-1.jpg'; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/70 via-transparent to-transparent" />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {church.is_current && (
            <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-[var(--ink)]"
              style={{ background: cityColor }}>
              ★ {t('our_church')}
            </span>
          )}
          {church.is_hq && (
            <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-white bg-emerald-600">
              {t('national_hq')}
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-heading text-base font-bold text-[var(--text)] mb-0.5 leading-snug">{name}</h3>
        <p className="text-xs font-semibold mb-3" style={{ color: cityColor }}>{motto}</p>

        <div className="flex items-center gap-3 mb-4 p-3 rounded-xl" style={{ background: 'var(--cream-deep)' }}>
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 flex-shrink-0" style={{ borderColor: cityColor }}>
            <img src={church.leader_image} alt={role}
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = '/church-1.webp'; }} />
          </div>
          <div>
            <p className="text-xs font-bold text-[var(--text)]">{role}</p>
            <p className="text-[11px] text-[var(--text-soft)]">{isFr ? church.leader_name_fr : church.leader_name_en}</p>
          </div>
        </div>

        <div className="flex items-start gap-2 mb-3">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: cityColor }} />
          <p className="text-sm text-[var(--text-mid)] whitespace-pre-line leading-relaxed">{address}</p>
        </div>

        <button onClick={() => setExpanded(p => !p)}
          className="flex items-center gap-1 text-xs font-semibold mb-3 transition-colors"
          style={{ color: cityColor }}>
          {expanded
            ? <><ChevronUp className="w-3.5 h-3.5" />{t('show_less')}</>
            : <><ChevronDown className="w-3.5 h-3.5" />{t('see_contacts')}</>}
        </button>

        {expanded && (
          <div className="space-y-2 pt-2 border-t border-[var(--border-soft)]">
            <a href={`tel:${church.phone.replace(/\s/g,'')}`}
              className="flex items-center gap-2 text-sm text-[var(--text-mid)] hover:text-[var(--text)] transition-colors">
              <Phone className="w-4 h-4" style={{ color: cityColor }} />
              {church.phone}
            </a>
            <a href={`mailto:${church.email}`}
              className="flex items-center gap-2 text-sm text-[var(--text-mid)] hover:text-[var(--text)] transition-colors">
              <Mail className="w-4 h-4" style={{ color: cityColor }} />
              {church.email}
            </a>
            {church.reg && (
              <div className="flex items-start gap-2 text-xs text-[var(--text-soft)]">
                <Building2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: cityColor }} />
                <span>{church.reg}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────── */
export default function Network() {
  const t      = useTranslations('Network');
  const locale = (useParams()?.locale as string) || 'fr';
  const isFr   = locale === 'fr';
  const [activeCity, setActiveCity] = useState('yaounde');

  const currentCity   = CITIES.find(c => c.id === activeCity) ?? CITIES[0];
  const totalChurches = CITIES.reduce((s, c) => s + c.churches.length, 0);

  const cityNameMap: Record<string, string> = {
    yaounde: t('city_yaounde'),
    douala:  t('city_douala'),
    buea:    t('city_buea'),
    bamenda: t('city_bamenda'),
  };

  return (
    <div className="pt-20 min-h-screen" style={{ background: 'var(--cream)' }}>

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden" style={{ background: 'var(--ink)', minHeight: 380 }}>
        <div className="absolute inset-0 opacity-10"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, var(--gold) 0%, transparent 60%), radial-gradient(ellipse at 75% 20%, var(--forest-mid) 0%, transparent 50%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="flex items-center justify-center gap-8 sm:gap-14 mb-10">
            <div className="text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[var(--gold)]/40 mx-auto mb-2 bg-white/10 flex items-center justify-center">
                <Image src="/epu-logo.png" alt="ÉPUI International" width={96} height={96}
                  className="w-full h-full object-contain p-1" />
              </div>
              <p className="text-white/50 text-[10px] tracking-widest uppercase">{t('mother_church')}</p>
              <p className="text-white/80 text-xs font-bold mt-0.5">ÉPUI CMR</p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-px h-8 sm:h-12" style={{ background: 'var(--gold)', opacity: .4 }} />
              <Star className="w-5 h-5" style={{ color: 'var(--gold)' }} />
              <div className="w-px h-8 sm:h-12" style={{ background: 'var(--gold)', opacity: .4 }} />
            </div>

            <div className="text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[var(--gold)] mx-auto mb-2 bg-white/10 flex items-center justify-center"
                style={{ boxShadow: 'var(--shadow-gold)' }}>
                <Image src="/yaounde-church-logo.png" alt="ÉPUC Nkoabang" width={96} height={96}
                  className="w-full h-full object-contain p-1" />
              </div>
              <p className="text-[11px] tracking-widest uppercase" style={{ color: 'var(--gold)' }}>{t('our_church')}</p>
              <p className="text-white font-bold text-xs mt-0.5">ÉPUC Nkoabang</p>
            </div>
          </div>

          <div className="text-center">
            <span className="badge-gold mb-4 inline-flex">{t('badge')}</span>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
              {t('title')}
            </h1>
            <p className="text-white/65 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
          </div>
        </div>
      </section>

      {/* ══ STATS BAR ══ */}
      <section style={{ background: 'var(--gold)', color: 'var(--ink)' }}>
        <div className="max-w-5xl mx-auto px-4 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { num: CITIES.length,  label: t('stat_cities')     },
              { num: totalChurches,  label: t('stat_assemblies') },
              { num: '2000+',        label: t('stat_members')    },
              { num: '2006',         label: t('stat_since')      },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-3xl sm:text-4xl font-heading font-bold text-[var(--ink)]">{s.num}</p>
                <p className="text-sm font-semibold text-[var(--ink)]/70 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MISSION + VALUES ══ */}
      <section className="py-16 sm:py-24" style={{ background: 'var(--cream)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            <div>
              <span className="badge-gold mb-5 inline-flex">{t('mission_badge')}</span>
              <blockquote className="font-display italic text-xl sm:text-2xl text-[var(--text-mid)] leading-relaxed mb-6"
                style={{ borderLeft: '4px solid var(--gold)', paddingLeft: '1.25rem' }}>
                {t('mission_text')}
              </blockquote>
              <div className="rounded-2xl p-5" style={{ background: 'var(--ink)', color: 'white' }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--gold)' }}>
                  {t('motto_badge')}
                </p>
                <p className="text-2xl font-heading font-bold text-white">{t('motto')}</p>
              </div>
            </div>

            <div>
              <span className="badge-blue mb-5 inline-flex">{t('values_badge')}</span>
              <div className="space-y-2.5">
                {VALUE_KEYS.map(key => (
                  <div key={key} className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-[var(--gold-bg)]">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--gold)' }} />
                    <p className="text-sm text-[var(--text-mid)] leading-relaxed">{t(key)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ MAP + CITY TABS ══ */}
      <section className="py-16 sm:py-20" style={{ background: 'var(--cream-deep)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="badge-gold mb-4 inline-flex">{t('geo_badge')}</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[var(--text)] mb-3">
              {t('geo_title')}
            </h2>
            <p className="text-[var(--text-soft)] max-w-xl mx-auto">{t('geo_subtitle')}</p>
          </div>

          <div className="rounded-3xl overflow-hidden border border-[var(--border)] shadow-lg mb-8" style={{ height: 380 }}>
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=8.2%2C1.6%2C16.5%2C12.5&amp;layer=mapnik"
              className="w-full h-full border-0"
              title={t('geo_title')}
              loading="lazy"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {CITIES.map(city => {
              const cityName   = cityNameMap[city.id] ?? (isFr ? city.name_fr : city.name_en);
              const regionName = isFr ? city.region_fr : city.region_en;
              return (
                <button key={city.id} onClick={() => setActiveCity(city.id)}
                  className={`rounded-xl p-4 text-left transition-all duration-200 border-2 ${
                    activeCity === city.id ? 'shadow-md scale-[1.02]' : 'border-transparent hover:border-[var(--border)]'
                  }`}
                  style={{
                    background: activeCity === city.id ? city.color + '15' : 'var(--white)',
                    borderColor: activeCity === city.id ? city.color : undefined,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: city.color }} />
                    <p className="font-bold text-sm text-[var(--text)]">{cityName}</p>
                  </div>
                  <p className="text-xs text-[var(--text-soft)]">{regionName}</p>
                  <p className="text-xs font-semibold mt-1" style={{ color: city.color }}>
                    {t('assembly_count', { count: city.churches.length })}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ CHURCHES PER CITY ══ */}
      <section className="py-16 sm:py-20" style={{ background: 'var(--cream)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-3 h-12 rounded-full" style={{ background: currentCity.color }} />
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--text)]">
                {cityNameMap[currentCity.id] ?? (isFr ? currentCity.name_fr : currentCity.name_en)}
              </h2>
              <p className="text-[var(--text-soft)] text-sm">
                {isFr ? currentCity.region_fr : currentCity.region_en}
                {' · '}
                <strong style={{ color: currentCity.color }}>
                  {t('assembly_count', { count: currentCity.churches.length })}
                </strong>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {CITIES.map(city => (
              <button key={city.id} onClick={() => setActiveCity(city.id)}
                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
                style={activeCity === city.id
                  ? { background: city.color, color: '#0F1117' }
                  : { background: 'var(--white)', color: 'var(--text-soft)', border: '1px solid var(--border)' }
                }>
                {cityNameMap[city.id] ?? (isFr ? city.name_fr : city.name_en)} ({city.churches.length})
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {currentCity.churches.map(church => (
              <ChurchCard key={church.id} church={church} locale={locale} cityColor={currentCity.color} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ PLATFORM POLICY ══ */}
      <section className="py-16 sm:py-20" style={{ background: 'var(--navy)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="badge-gold mb-4 inline-flex">{t('policy_badge')}</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">{t('policy_title')}</h2>
            <p className="text-white/60 max-w-2xl mx-auto text-sm leading-relaxed">{t('policy_intro')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-glass p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-[var(--ink)] text-base"
                  style={{ background: 'var(--gold)' }}>♀</div>
                <h3 className="font-heading text-lg font-bold text-white">{t('policy_women_title')}</h3>
              </div>
              <ul className="space-y-3">
                {WOMEN_POLICY_KEYS.map(key => (
                  <li key={key} className="flex items-start gap-3 text-sm text-white/75">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--gold)]" />
                    {t(key)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-glass p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-base"
                  style={{ background: 'var(--forest-mid)' }}>♂</div>
                <h3 className="font-heading text-lg font-bold text-white">{t('policy_men_title')}</h3>
              </div>
              <ul className="space-y-3">
                {MEN_POLICY_KEYS.map(key => (
                  <li key={key} className="flex items-start gap-3 text-sm text-white/75">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--forest-light)]" />
                    {t(key)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="py-20" style={{ background: 'var(--ink)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="divider-gold" />
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white my-8">{t('cta_title')}</h2>
          <p className="text-white/60 text-base mb-8 max-w-xl mx-auto">{t('cta_desc')}</p>
          <Link href={`/${locale}/contact`}
            className="btn-gold inline-flex items-center gap-2 text-base px-8 py-4">
            {t('cta_btn')} <ArrowRight className="w-5 h-5" />
          </Link>
          <div className="divider-gold mt-8" />
        </div>
      </section>
    </div>
  );
}
