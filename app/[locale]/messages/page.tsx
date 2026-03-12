'use client';

import { Play, Clock, Calendar, Download, Search } from 'lucide-react';

const messages = [
  {
    id: 1,
    title: 'La Puissance de la Résurrection',
    preacher: 'Pasteur Samuel Eko',
    date: '2024-03-31',
    duration: '1h 15min',
    category: 'Pâques',
    image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 2,
    title: 'Vaincre la peur par la Foi',
    preacher: 'Ancien Pierre',
    date: '2024-03-24',
    duration: '45min',
    category: 'Foi',
    image: 'https://images.pexels.com/photos/161154/church-building-religion-christian-161154.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 3,
    title: 'Bâtir une famille solide',
    preacher: 'Pasteur Samuel Eko',
    date: '2024-03-17',
    duration: '55min',
    category: 'Famille',
    image: 'https://images.pexels.com/photos/415571/pexels-photo-415571.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export default function Messages() {
  return (
    <div className="pt-20 bg-[var(--color-background)] min-h-screen">

      {/* Header */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-[var(--color-text-primary)] mb-4">
              Nos Prédications
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)]">Reécoutez les messages qui ont béni notre assemblée.</p>
          </div>

          {/* Search Bar - Visual Only */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un message, un thème..."
              className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div className="relative aspect-video overflow-hidden">
                  <img src={msg.image} alt={msg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center text-[var(--color-primary)] hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 ml-1" fill="currentColor" />
                    </button>
                  </div>
                  <div className="absolute top-4 left-4 bg-[var(--color-primary)] text-white text-xs font-bold px-3 py-1 rounded-full">
                    {msg.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2 line-clamp-1">{msg.title}</h3>
                  <p className="text-[var(--color-text-secondary)] text-sm mb-4">{msg.preacher}</p>

                  <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {msg.date}</span>
                      <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {msg.duration}</span>
                    </div>
                    <button className="hover:text-[var(--color-primary)]"><Download className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}