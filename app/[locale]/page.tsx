'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Heart,
  Users,
  Calendar,
  MessageSquare,
  ArrowRight,
  Play,
  Clock,
  MapPin,
  Sparkles,
  Star,
  Send,
  Bell
} from 'lucide-react';

// REMPLACEZ CETTE URL PAR L'URL DE VOTRE IMAGE D'ÉGLISE
const CHURCH_IMAGE_URL = 'https://i.pinimg.com/736x/b0/46/9b/b0469bb885471469662ce3d43db484d2.jpg';

const features = [
  {
    icon: Heart,
    title: 'Communauté Aimante',
    description: 'Rejoignez une famille spirituelle à Bitotol où l\'amour et l\'entraide sont au cœur de nos valeurs.',
    color: 'text-[var(--color-notion)]'
  },
  {
    icon: MessageSquare,
    title: 'Messages Inspirants',
    description: 'Découvrez des enseignements bibliques qui transforment et encouragent votre foi.',
    color: 'text-[var(--color-course)]'
  },
  {
    icon: Users,
    title: 'Croissance Spirituelle',
    description: 'Grandissez dans votre relation avec Dieu à travers nos groupes et activités.',
    color: 'text-[var(--color-chapter)]'
  },
  {
    icon: Calendar,
    title: 'Événements Réguliers',
    description: 'Participez à nos cultes, conférences et activités communautaires enrichissantes.',
    color: 'text-[var(--color-section)]'
  }
];

const upcomingEvents = [
  {
    date: '2024-02-04',
    title: 'Culte Dominical',
    time: '09h00',
    description: 'Venez adorer en communauté à EPUC Bitotol'
  },
  {
    date: '2024-02-07',
    title: 'Soirée de Prière',
    time: '18h30',
    description: 'Un moment de recueillement et d\'intercession'
  },
  {
    date: '2024-02-10',
    title: 'Réunion des Jeunes',
    time: '16h00',
    description: 'Thème: "Vivre sa foi au Cameroun"'
  }
];

const testimonials = [
  {
    name: 'Maman Marie Ngongo',
    role: 'Diaconesse',
    content: 'Cette église a transformé ma vie. J\'ai trouvé une famille spirituelle merveilleuse ici à Bitotol et un sens profond à mon existence.',
    rating: 5
  },
  {
    name: 'Ancien Pierre Abena',
    role: 'Responsable des Hommes',
    content: 'L\'atmosphère de bienveillance et les enseignements profonds m\'ont aidé à grandir dans ma foi. C\'est une bénédiction pour notre quartier.',
    rating: 5
  },
  {
    name: 'Sœur Sarah Mballa',
    role: 'Choriste',
    content: 'Accueillie avec tant d\'amour et de patience. Chaque dimanche est une nouvelle bénédiction pour moi et ma famille.',
    rating: 5
  }
];

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [review, setReview] = useState({ name: '', comment: '', rating: 5 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Merci pour votre témoignage ! Il sera visible après modération.');
    setReview({ name: '', comment: '', rating: 5 });
  };

  return (
    <>
      {/* Floating Alert Button for Announcements */}
      <Link href="/announcements" className="fixed bottom-8 right-8 z-[100] animate-bounce">
        <div className="bg-[var(--color-secondary)] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform cursor-pointer border-4 border-white flex items-center justify-center relative">
          <Bell className="w-8 h-8" fill="currentColor" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">3</span>
        </div>
      </Link>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${CHURCH_IMAGE_URL}')`
          }}
        />
        {/* Custom Hero Gradient Overlay (Black/Yellow/Purple) */}
        <div className="absolute inset-0 hero-gradient-overlay" />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight mt-20 drop-shadow-lg">
              Bienvenue A EPUC DE BITOTOL
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 text-4xl md:text-5xl mt-4 drop-shadow-sm filter">Eglise Pentecôtiste Unie du Cameroun</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Un lieu où l'amour de Dieu transforme les cœurs, où la communion fraternelle
              nourrit l'âme, et où chaque personne trouve sa place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/about" className="btn-cameroon text-lg px-8 py-4">
                Découvrir Notre Église
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Link>
              <Link href="/messages" className="flex items-center space-x-3 text-white hover:text-yellow-400 transition-colors duration-300 group">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/30">
                  <Play className="w-6 h-6 ml-1" fill="currentColor" />
                </div>
                <span className="text-lg font-semibold">Message du Pasteur</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="bg-black/30 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:bg-black/40 transition-all">
                <div className="text-3xl font-bold mb-2 text-yellow-400">500+</div>
                <div className="text-white/90">Membres Actifs</div>
              </div>
              <div className="bg-black/30 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:bg-black/40 transition-all">
                <div className="text-3xl font-bold mb-2 text-yellow-400">15</div>
                <div className="text-white/90">Années de Service</div>
              </div>
              <div className="bg-black/30 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:bg-black/40 transition-all">
                <div className="text-3xl font-bold mb-2 text-yellow-400">50+</div>
                <div className="text-white/90">Départements</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[var(--color-background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[var(--color-primary)] mb-6">
              Pourquoi Nous Rejoindre ?
            </h2>
            <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto">
              Découvrez les piliers de notre communauté.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={`card-hover rounded-2xl p-8 text-center animate-fade-in border border-[var(--color-border)]`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`w-16 h-16 mx-auto mb-6 bg-[var(--color-background)] rounded-2xl flex items-center justify-center ${feature.color} shadow-sm`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">{feature.title}</h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Preview section... (keeping existing structure but ensure colors apply) */}
      <section className="py-20 bg-[var(--color-surface-elevated)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-secondary)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-primary)]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="flex items-center mb-4">
                <Sparkles className="w-6 h-6 text-[var(--color-secondary)] mr-2" />
                <span className="text-[var(--color-secondary)] font-semibold">Notre Histoire</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-[var(--color-text-primary)] mb-6">
                Une Église Fondée sur l'Amour de Dieu
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)] mb-8 leading-relaxed">
                Depuis plus de 15 ans, notre église à Bitotol grandit dans la foi et l'amour mutuel.
              </p>
              <Link href="/about" className="btn-primary inline-flex items-center">
                En Savoir Plus
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
            <div className="animate-scale-in">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/5206040/pexels-photo-5206040.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Communauté en prière"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[var(--color-primary)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white">
              Témoignages de Foi
            </h2>
            <p className="text-xl text-white/90">
              Découvrez comment Dieu transforme des vies dans notre communauté
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className={`bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 animate-fade-in`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  ))}
                </div>

                <p className="text-white/90 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div>
                  <div className="font-semibold text-white text-lg">
                    {testimonial.name}
                  </div>
                  <div className="text-white/70 text-sm font-medium">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Section (New) */}
      <section className="py-20 bg-[var(--color-background)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-[var(--color-border)]">
            <div className="text-center mb-8">
              <MessageSquare className="w-12 h-12 mx-auto text-[var(--color-primary)] mb-4" />
              <h2 className="text-3xl font-heading font-bold text-[var(--color-text-primary)]">Laissez un Témoignage</h2>
              <p className="text-[var(--color-text-secondary)]">Partagez ce que Dieu a fait pour vous à EPUC Bitotol.</p>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Votre Nom</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                    value={review.name}
                    onChange={(e) => setReview({ ...review, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Note</label>
                  <select
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                    value={review.rating}
                    onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })}
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (Excellent)</option>
                    <option value="4">⭐⭐⭐⭐ (Très Bien)</option>
                    <option value="3">⭐⭐⭐ (Bien)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Votre Message</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                  value={review.comment}
                  onChange={(e) => setReview({ ...review, comment: e.target.value })}
                ></textarea>
              </div>
              <button type="submit" className="w-full btn-primary flex items-center justify-center">
                <Send className="w-4 h-4 mr-2" />
                Envoyer le Témoignage
              </button>
            </form>
          </div>
        </div>
      </section>

    </>
  );
}