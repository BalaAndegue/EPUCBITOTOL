'use client';

import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Filter, ArrowRight } from 'lucide-react';

const categories = [
  { id: 'all', name: 'Toutes', color: 'bg-gray-500' },
  { id: 'worship', name: 'Culte', color: 'bg-blue-500' },
  { id: 'prayer', name: 'Prière', color: 'bg-purple-500' },
  { id: 'youth', name: 'Jeunesse', color: 'bg-green-500' },
  { id: 'community', name: 'Communauté', color: 'bg-orange-500' },
  { id: 'formation', name: 'Formation', color: 'bg-red-500' }
];

const activities = [
  {
    id: 1,
    title: 'Culte Dominical',
    category: 'worship',
    date: '2024-02-04',
    time: '10:00',
    duration: '2h',
    location: 'Sanctuaire Principal',
    attendees: 200,
    description: 'Notre célébration hebdomadaire avec louange, adoration et prédication inspirante.',
    recurring: 'Chaque dimanche',
    image: 'https://images.pexels.com/photos/8468754/pexels-photo-8468754.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 2,
    title: 'Soirée de Prière',
    category: 'prayer',
    date: '2024-02-07',
    time: '19:00',
    duration: '1h30',
    location: 'Salle de Prière',
    attendees: 50,
    description: 'Moment d\'intercession communautaire pour les besoins de l\'église et du monde.',
    recurring: 'Chaque mercredi',
    image: 'https://images.pexels.com/photos/5206040/pexels-photo-5206040.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 3,
    title: 'Groupe Jeunes',
    category: 'youth',
    date: '2024-02-09',
    time: '19:30',
    duration: '2h',
    location: 'Centre Jeunesse',
    attendees: 35,
    description: 'Rencontre dynamique pour les 16-30 ans : jeux, louange et enseignement adapté.',
    recurring: 'Chaque vendredi',
    image: 'https://images.pexels.com/photos/7551667/pexels-photo-7551667.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 4,
    title: 'École du Dimanche',
    category: 'formation',
    date: '2024-02-04',
    time: '09:00',
    duration: '1h',
    location: 'Salles de Classe',
    attendees: 80,
    description: 'Formation biblique pour tous les âges avec classes adaptées.',
    recurring: 'Chaque dimanche',
    image: 'https://images.pexels.com/photos/8468687/pexels-photo-8468687.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 5,
    title: 'Marché de Charité',
    category: 'community',
    date: '2024-02-15',
    time: '14:00',
    duration: '4h',
    location: 'Cour de l\'Église',
    attendees: 150,
    description: 'Événement caritatif avec vente d\'artisanat local au profit des plus démunis.',
    recurring: 'Mensuel',
    image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 6,
    title: 'Conférence Prophétique',
    category: 'formation',
    date: '2024-02-20',
    time: '18:00',
    duration: '3h',
    location: 'Auditorium',
    attendees: 300,
    description: 'Soirée spéciale avec invité prophétique international.',
    recurring: 'Événement spécial',
    image: 'https://images.pexels.com/photos/8468757/pexels-photo-8468757.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

const weeklySchedule = [
  { day: 'Dimanche', events: [
    { time: '09:00', name: 'École du Dimanche', type: 'Formation' },
    { time: '10:00', name: 'Culte Principal', type: 'Culte' }
  ]},
  { day: 'Mardi', events: [
    { time: '19:00', name: 'Étude Biblique', type: 'Formation' }
  ]},
  { day: 'Mercredi', events: [
    { time: '19:00', name: 'Soirée de Prière', type: 'Prière' }
  ]},
  { day: 'Vendredi', events: [
    { time: '19:30', name: 'Groupe Jeunes', type: 'Jeunesse' }
  ]},
  { day: 'Samedi', events: [
    { time: '15:00', name: 'Visiteurs/Nouveaux', type: 'Accueil' }
  ]}
];

export default function Activities() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredActivities = selectedCategory === 'all' 
    ? activities 
    : activities.filter(activity => activity.category === selectedCategory);

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Calendar className="w-20 h-20 mx-auto mb-6 text-accent" />
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              Activités & Événements
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Découvrez nos activités régulières et événements spéciaux pour grandir ensemble dans la foi
            </p>
          </div>
        </div>
      </section>

      {/* Weekly Schedule */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-primary mb-6">
              Programme Hebdomadaire
            </h2>
            <p className="text-xl text-muted-foreground">
              Notre emploi du temps régulier pour vous accompagner tout au long de la semaine
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {weeklySchedule.map((day, index) => (
              <div
                key={day.day}
                className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-xl font-semibold text-primary mb-4 text-center border-b border-gray-100 pb-3">
                  {day.day}
                </h3>
                <div className="space-y-3">
                  {day.events.map((event, eventIndex) => (
                    <div key={eventIndex} className="bg-muted/30 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <Clock className="w-4 h-4 text-accent" />
                        <span className="font-semibold text-sm">{event.time}</span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-1">{event.name}</div>
                      <div className="text-xs text-accent font-medium">{event.type}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activity Filters */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.id
                    ? `${category.color} text-white shadow-lg`
                    : 'bg-white text-muted-foreground hover:bg-gray-50 shadow-md'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActivities.map((activity, index) => {
              const categoryInfo = getCategoryInfo(activity.category);
              return (
                <div
                  key={activity.id}
                  className={`card-hover bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-semibold ${categoryInfo.color}`}>
                      {categoryInfo.name}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-primary mb-3">
                      {activity.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {activity.description}
                    </p>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 text-accent" />
                        <span>{new Date(activity.date).toLocaleDateString('fr-FR', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 text-accent" />
                        <span>{activity.time} ({activity.duration})</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-accent" />
                        <span>{activity.location}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4 text-accent" />
                        <span>~{activity.attendees} participants</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-accent">
                        {activity.recurring}
                      </span>
                      <button className="btn-primary text-sm px-4 py-2">
                        Participer
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Rejoignez-Nous !
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Participez à nos activités et vivez des moments de communion enrichissants
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-accent px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg">
              S'inscrire aux Activités
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-accent transition-all duration-300 hover:scale-105">
              Calendrier Complet
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}