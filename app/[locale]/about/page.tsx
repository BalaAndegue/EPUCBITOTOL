'use client';

import { Heart, Users, Target, Award, Sparkles, MapPin } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Adoration',
    description: 'Une adoration fervente qui monte vers le Trône de Dieu.',
    color: 'text-[var(--color-notion)]',
    bg: 'bg-[var(--color-notion-bg)]'
  },
  {
    icon: Users,
    title: 'Fraternité',
    description: 'Une communion sincère où chaque frère et sœur est soutenu.',
    color: 'text-[var(--color-course)]',
    bg: 'bg-[var(--color-course-bg)]'
  },
  {
    icon: Target,
    title: 'Évangélisation',
    description: 'Gagner Bitotol et ses environs pour Jésus-Christ.',
    color: 'text-[var(--color-chapter)]',
    bg: 'bg-[var(--color-chapter-bg)]'
  },
  {
    icon: Award,
    title: 'Sainteté',
    description: 'Vivre une vie consacrée et agréable à Dieu au quotidien.',
    color: 'text-[var(--color-section)]',
    bg: 'bg-[var(--color-section-bg)]'
  }
];

const pastors = [
  {
    name: 'Pasteur Samuel Eko',
    role: 'Pasteur Principal',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Visionnaire dévoué, le Pasteur Eko conduit l\'assemblée de Bitotol avec un cœur de père et une onction d\'enseignement.'
  },
  {
    name: 'Ancien Pierre Mvondo',
    role: 'Responsable Évangélisation',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Passionné par les âmes, l\'Ancien Pierre coordonne nos sorties d\'évangélisation dans tout le quartier.'
  },
  {
    name: 'Diaconesse Marthe Abena',
    role: 'Responsable des Dames',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Maman Marthe veille sur le département des femmes avec sagesse, organisant prières et entraide.'
  }
];

const milestones = [
  { year: '2010', event: 'Début de l\'œuvre dans une salle de classe à Melen' },
  { year: '2015', event: 'Acquisition du terrain actuel à Bitotol' },
  { year: '2018', event: 'Pose de la première pierre du temple' },
  { year: '2023', event: 'Dédicace du nouveau bâtiment' },
];

export default function About() {
  return (
    <div className="pt-20 bg-[var(--color-background)] min-h-screen">

      {/* Hero Header */}
      <section className="relative py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-[var(--color-section-bg)] rounded-xl mb-6">
            <Heart className="w-8 h-8 text-[var(--color-section)]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-[var(--color-text-primary)]">
            Qui Sommes-Nous ?
          </h1>
          <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">
            L'Église Pentecôtiste Unie de Bitotol : Une famille, une foi, une espérance au cœur de Yaoundé.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className="space-y-8">
              <div>
                <div className="flex items-center mb-4 space-x-2">
                  <Sparkles className="w-5 h-5 text-[var(--color-primary)]" />
                  <span className="text-[var(--color-primary)] font-bold tracking-wide text-sm uppercase">Notre Vision</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-[var(--color-text-primary)] mb-4">
                  Bâtir une Église Glorieuse
                </h2>
                <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                  Nous aspirons à être un phare spirituel à Bitotol, où la Parole de Dieu est prêchée sans compromis,
                  où les miracles sont le quotidien, et où chaque membre est équipé pour servir.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-lg text-[var(--color-text-primary)] mb-2">Enseignement Apostolique</h3>
                  <p className="text-[var(--color-text-secondary)]">Nous restons fidèles aux fondements posés par les apôtres.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-lg text-[var(--color-text-primary)] mb-2">Amour Fraternel</h3>
                  <p className="text-[var(--color-text-secondary)]">Nul n'est étranger parmi nous. Nous sommes membres les uns des autres.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-[var(--color-primary)]/10 rounded-[2rem] transform rotate-3 scale-105"></div>
              <img
                src="https://images.pexels.com/photos/8468687/pexels-photo-8468687.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Assemblée en prière"
                className="relative rounded-[2rem] shadow-xl w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-lg max-w-xs hidden md:block">
                <div className="flex items-center space-x-3 text-[var(--color-primary)] mb-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-bold">Localisation</span>
                </div>
                <p className="text-sm text-gray-600">Situé à Bitotol, Carrefour des Sœurs, un lieu accessible pour tous.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[var(--color-text-primary)] mb-6">
              Nos Piliers
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Ce qui fait vibrer notre communauté chaque semaine
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="group bg-[var(--color-background)] hover:bg-white rounded-2xl p-8 border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-14 h-14 ${value.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 ${value.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">{value.title}</h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-[var(--color-background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[var(--color-text-primary)] mb-6">
              Serviteurs de Dieu
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pastors.map((pastor) => (
              <div
                key={pastor.name}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={pastor.image}
                    alt={pastor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">{pastor.name}</h3>
                  <p className="text-[var(--color-primary)] font-medium text-sm mb-4 uppercase tracking-wider">{pastor.role}</p>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{pastor.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-[var(--color-text-primary)]">Notre Parcours</h2>
          </div>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-gray-50 group-hover:bg-[var(--color-primary)] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors">
                  <span className="w-3 h-3 bg-[var(--color-primary)] rounded-full group-hover:bg-white"></span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[var(--color-background)] p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-[var(--color-text-primary)]">{milestone.year}</div>
                  </div>
                  <div className="text-[var(--color-text-secondary)] text-sm">{milestone.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}