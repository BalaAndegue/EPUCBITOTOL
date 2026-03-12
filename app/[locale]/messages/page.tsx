import { Search, Calendar, Play } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import SermonCard from '@/components/SermonCard';

export default async function Messages() {
  const messages = await prisma.sermon.findMany({
    orderBy: { date: 'desc' },
  });

  return (
    <div className="pt-20 bg-[var(--color-background)] min-h-screen">
      {/* Header */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-[var(--color-text-primary)] mb-4">
              Nos Prédications
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)]">Réécoutez les messages qui ont béni notre assemblée.</p>
          </div>

          {/* Search Bar - Visual Only for now */}
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
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              Aucune prédication n'a encore été publiée.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {messages.map((msg: any) => (
                <SermonCard key={msg.id} sermon={msg} />
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}