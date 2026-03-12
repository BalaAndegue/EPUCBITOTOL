'use client';

import { Users, Heart, Coffee, Baby, Shield } from 'lucide-react';

const groups = [
  {
    title: 'Hommes de Valeur',
    description: 'Les pères et jeunes hommes se réunissent pour s\'encourager à être des leaders spirituels dans leurs familles et au travail.',
    icon: Shield,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    title: 'Femmes de Destinée',
    description: 'Un espace de soutien, de prière et d\'entraide pratique pour les femmes de Bitotol.',
    icon: Heart,
    color: 'text-pink-600',
    bg: 'bg-pink-50'
  },
  {
    title: 'École du Dimanche',
    description: 'Vos enfants (3-12 ans) reçoivent un enseignement biblique adapté pendant le culte, dans un cadre sécurisé.',
    icon: Baby,
    color: 'text-yellow-600',
    bg: 'bg-yellow-50'
  },
  {
    title: 'Accueil & Intégration',
    description: 'Pour les nouveaux venus : un café fraternel après le culte pour mieux vous connaître.',
    icon: Coffee,
    color: 'text-green-600',
    bg: 'bg-green-50'
  }
];

export default function Community() {
  return (
    <div className="pt-20 bg-[var(--color-background)] min-h-screen">

      {/* Header */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-[var(--color-exercise-bg)] rounded-xl mb-6">
            <Users className="w-8 h-8 text-[var(--color-exercise)]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-[var(--color-text-primary)] mb-4">
            Vie Communautaire
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            À ÉPUC Bitotol, nous sommes plus qu'une foule le dimanche : nous sommes une famille qui partage la vie.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {groups.map((group) => {
              const Icon = group.icon;
              return (
                <div key={group.title} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className={`w-14 h-14 ${group.bg} rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon className={`w-7 h-7 ${group.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">{group.title}</h3>
                  <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed mb-6">
                    {group.description}
                  </p>
                  <button className="text-[var(--color-primary)] font-semibold text-sm hover:underline">
                    Rejoindre ce groupe
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote / Highlight */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <blockquote className="text-2xl md:text-3xl font-heading italic text-gray-700 mb-8">
            "Voici, oh! qu'il est agréable, qu'il est doux pour des frères de demeurer ensemble!"
          </blockquote>
          <cite className="text-[var(--color-primary)] font-bold not-italic">- Psaume 133:1</cite>
        </div>
      </section>

    </div>
  );
}