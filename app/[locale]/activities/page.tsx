'use client';

import { Calendar, Music, BookOpen, Users, Clock, MapPin, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

const weeklyActivities = [
  {
    day: 'Dimanche',
    title: 'Culte de Célébration',
    time: '09h00 - 11h30',
    description: 'Le sommet de notre semaine. Louange vibrante avec la chorale Écho Céleste, prédication ointe et prière pour les malades.',
    icon: Star,
    color: 'text-yellow-500'
  },
  {
    day: 'Mercredi',
    title: 'Étude Biblique',
    time: '18h00 - 19h30',
    description: 'Un temps d\'approfondissement de la Parole de Dieu pour bâtir des fondements solides.',
    icon: BookOpen,
    color: 'text-blue-500'
  },
  {
    day: 'Vendredi',
    title: 'Réunion de Prière',
    time: '18h30 - 20h00',
    description: 'Intercession pour le pays (Cameroun), l\'église et les besoins personnels. La puissance de la prière en action.',
    icon: Users,
    color: 'text-purple-500'
  }
];

const specialGroups = [
  {
    title: 'J-FIRE (Jeunesse)',
    description: 'La jeunesse de Bitotol en feu pour Christ. Rencontres dynamiques, évangélisation de rue et concerts.',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800',
    meeting: 'Samedi 16h00'
  },
  {
    title: 'Chorale Écho Céleste',
    description: 'Le ministère de louange qui nous conduit dans la présence de Dieu chaque dimanche avec des cantiques locaux et contemporains.',
    image: 'https://images.pexels.com/photos/7109276/pexels-photo-7109276.jpeg?auto=compress&cs=tinysrgb&w=800',
    meeting: 'Répétition Samedi 14h00'
  }
];

export default function Activities() {
  return (
    <div className="pt-20 bg-[var(--color-background)] min-h-screen">

      {/* Hero */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-[var(--color-course-bg)] rounded-xl mb-6">
            <Calendar className="w-8 h-8 text-[var(--color-course)]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-[var(--color-text-primary)] mb-4">
            Nos Activités Hebdomadaires
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Il se passe toujours quelque chose à ÉPUC Bitotol. Rejoignez-nous pour grandir ensemble !
          </p>
        </div>
      </section>

      {/* Weekly Schedule */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {weeklyActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.day} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex flex-col items-center justify-center text-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Jours</span>
                      <span className={`text-sm font-bold ${activity.color}`}>{activity.day.substring(0, 3)}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{activity.title}</h3>
                      <div className="flex items-center text-sm font-medium text-[var(--color-text-muted)] bg-gray-50 px-3 py-1 rounded-full">
                        <Clock className="w-4 h-4 mr-2" />
                        {activity.time}
                      </div>
                    </div>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">{activity.description}</p>
                    <div className="flex items-center text-[var(--color-primary)] font-medium text-sm cursor-pointer hover:underline">
                      En savoir plus <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Special Groups */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-[var(--color-text-primary)]">Départements & Groupes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {specialGroups.map((group) => (
              <div key={group.title} className="group relative overflow-hidden rounded-2xl aspect-[16/9] md:aspect-[21/9]">
                <img
                  src={group.image}
                  alt={group.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <div className="flex items-center space-x-2 mb-2 text-sm font-medium text-yellow-400">
                    <Calendar className="w-4 h-4" />
                    <span>{group.meeting}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{group.title}</h3>
                  <p className="text-white/80 max-w-lg">{group.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--color-primary)] text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Envie de servir avec nous ?</h2>
          <p className="text-white/80 mb-8 text-lg">La chorale, l'accueil, la technique... Il y a une place pour chacun à ÉPUC Bitotol.</p>
          <Link href="/contact" className="inline-block bg-white text-[var(--color-primary)] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
            Rejoindre une équipe
          </Link>
        </div>
      </section>

    </div>
  );
}