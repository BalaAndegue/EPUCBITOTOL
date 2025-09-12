'use client';

import { useState } from 'react';
import { Play, Calendar, Clock, User, Heart, Download, Share2, Filter } from 'lucide-react';

export const dynamic = 'force-static';

const categories = [
  { id: 'all', name: 'Tous', color: 'bg-gray-500' },
  { id: 'sermon', name: 'Sermons', color: 'bg-blue-500' },
  { id: 'teaching', name: 'Enseignements', color: 'bg-green-500' },
  { id: 'testimony', name: 'Témoignages', color: 'bg-purple-500' },
  { id: 'conference', name: 'Conférences', color: 'bg-orange-500' },
  { id: 'prayer', name: 'Prières', color: 'bg-red-500' }
];

const messages = [
  {
    id: 1,
    title: 'La Puissance de la Foi',
    category: 'sermon',
    speaker: 'Pasteur Jean Dupont',
    date: '2024-01-28',
    duration: '45 min',
    description: 'Un message puissant sur comment la foi peut transformer nos vies et nous donner la victoire dans toutes les situations.',
    thumbnail: 'https://images.pexels.com/photos/8468754/pexels-photo-8468754.jpeg?auto=compress&cs=tinysrgb&w=600',
    videoUrl: '#',
    audioUrl: '#',
    views: 1250,
    featured: true
  },
  {
    id: 2,
    title: 'Marcher dans l\'Amour de Dieu',
    category: 'teaching',
    speaker: 'Pasteur Marie Leblanc',
    date: '2024-01-21',
    duration: '38 min',
    description: 'Découvrez comment vivre quotidiennement dans l\'amour inconditionnel de Dieu et le partager avec les autres.',
    thumbnail: 'https://images.pexels.com/photos/5206040/pexels-photo-5206040.jpeg?auto=compress&cs=tinysrgb&w=600',
    videoUrl: '#',
    audioUrl: '#',
    views: 890,
    featured: false
  },
  {
    id: 3,
    title: 'Témoignage de Guérison Miraculeuse',
    category: 'testimony',
    speaker: 'Sœur Catherine Martin',
    date: '2024-01-14',
    duration: '25 min',
    description: 'Un témoignage bouleversant de guérison divine qui fortifiera votre foi en la puissance de Dieu.',
    thumbnail: 'https://images.pexels.com/photos/8468687/pexels-photo-8468687.jpeg?auto=compress&cs=tinysrgb&w=600',
    videoUrl: '#',
    audioUrl: '#',
    views: 2100,
    featured: true
  },
  {
    id: 4,
    title: 'Les Dons Spirituels dans l\'Église',
    category: 'conference',
    speaker: 'Pasteur Jean Dupont',
    date: '2024-01-07',
    duration: '52 min',
    description: 'Une conférence approfondie sur les dons du Saint-Esprit et leur manifestation dans l\'église locale.',
    thumbnail: 'https://images.pexels.com/photos/8468757/pexels-photo-8468757.jpeg?auto=compress&cs=tinysrgb&w=600',
    videoUrl: '#',
    audioUrl: '#',
    views: 1560,
    featured: false
  },
  {
    id: 5,
    title: 'Prière pour la Restauration',
    category: 'prayer',
    speaker: 'Équipe Pastorale',
    date: '2023-12-31',
    duration: '30 min',
    description: 'Une prière collective puissante pour la restauration dans tous les domaines de votre vie.',
    thumbnail: 'https://images.pexels.com/photos/7551667/pexels-photo-7551667.jpeg?auto=compress&cs=tinysrgb&w=600',
    videoUrl: '#',
    audioUrl: '#',
    views: 980,
    featured: false
  },
  {
    id: 6,
    title: 'La Prospérité selon Dieu',
    category: 'sermon',
    speaker: 'Pasteur Marie Leblanc',
    date: '2023-12-24',
    duration: '41 min',
    description: 'Comprenez la véritable prospérité selon les principes bibliques et comment l\'obtenir.',
    thumbnail: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600',
    videoUrl: '#',
    audioUrl: '#',
    views: 1780,
    featured: true
  }
];

export default function Messages() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredMessages = selectedCategory === 'all' 
    ? messages 
    : messages.filter(message => message.category === selectedCategory);

  const featuredMessages = messages.filter(message => message.featured);

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Play className="w-20 h-20 mx-auto mb-6 text-accent" />
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              Messages & Enseignements
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Découvrez nos sermons, enseignements et témoignages pour nourrir votre âme et fortifier votre foi
            </p>
          </div>
        </div>
      </section>

      {/* Featured Messages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-primary mb-6">
              Messages à la Une
            </h2>
            <p className="text-xl text-muted-foreground">
              Nos messages les plus impactants et inspirants
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMessages.map((message, index) => {
              const categoryInfo = getCategoryInfo(message.category);
              return (
                <div
                  key={message.id}
                  className={`card-hover bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">
                    <img
                      src={message.thumbnail}
                      alt={message.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <button className="w-16 h-16 bg-accent rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                        <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                      </button>
                    </div>
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-semibold ${categoryInfo.color}`}>
                      {categoryInfo.name}
                    </div>
                    <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                      {message.duration}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-primary mb-3 line-clamp-2">
                      {message.title}
                    </h3>
                    
                    <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{message.speaker}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(message.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {message.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {message.views.toLocaleString()} vues
                      </span>
                      <div className="flex space-x-2">
                        <button className="p-2 text-muted-foreground hover:text-accent transition-colors duration-300">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-muted-foreground hover:text-accent transition-colors duration-300">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Category Filters */}
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

      {/* All Messages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-primary mb-6">
              Tous les Messages
            </h2>
            <p className="text-xl text-muted-foreground">
              Explorez notre bibliothèque complète de messages spirituels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMessages.map((message, index) => {
              const categoryInfo = getCategoryInfo(message.category);
              return (
                <div
                  key={message.id}
                  className={`card-hover bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">
                    <img
                      src={message.thumbnail}
                      alt={message.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <button className="w-16 h-16 bg-accent rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                        <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                      </button>
                    </div>
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-semibold ${categoryInfo.color}`}>
                      {categoryInfo.name}
                    </div>
                    <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                      {message.duration}
                    </div>
                    {message.featured && (
                      <div className="absolute bottom-4 right-4">
                        <Heart className="w-6 h-6 text-accent" fill="currentColor" />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-primary mb-3 line-clamp-2">
                      {message.title}
                    </h3>
                    
                    <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{message.speaker}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(message.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {message.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {message.views.toLocaleString()} vues
                      </span>
                      <div className="flex space-x-2">
                        <button className="btn-primary text-sm px-4 py-2">
                          Écouter
                        </button>
                      </div>
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
            Abonnez-vous à nos Messages
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Recevez nos derniers messages et enseignements directement dans votre boîte mail
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/50 text-gray-900"
            />
            <button className="bg-white text-accent px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg">
              S'abonner
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}