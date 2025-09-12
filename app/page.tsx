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
  Star
} from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: 'Communauté Aimante',
    description: 'Rejoignez une famille spirituelle où l\'amour et l\'entraide sont au cœur de nos valeurs.',
    color: 'text-red-500'
  },
  {
    icon: MessageSquare,
    title: 'Messages Inspirants',
    description: 'Découvrez des enseignements bibliques qui transforment et encouragent votre foi.',
    color: 'text-blue-500'
  },
  {
    icon: Users,
    title: 'Croissance Spirituelle',
    description: 'Grandissez dans votre relation avec Dieu à travers nos groupes et activités.',
    color: 'text-green-500'
  },
  {
    icon: Calendar,
    title: 'Événements Réguliers',
    description: 'Participez à nos cultes, conférences et activités communautaires enrichissantes.',
    color: 'text-purple-500'
  }
];

const upcomingEvents = [
  {
    date: '2024-02-04',
    title: 'Culte Dominical',
    time: '10h00',
    description: 'Venez adorer en communauté'
  },
  {
    date: '2024-02-07',
    title: 'Soirée de Prière',
    time: '19h00',
    description: 'Un moment de recueillement et d\'intercession'
  },
  {
    date: '2024-02-10',
    title: 'Conférence Jeunes',
    time: '19h30',
    description: 'Thème: "Vivre sa foi au quotidien"'
  }
];

const testimonials = [
  {
    name: 'Marie Dubois',
    role: 'Membre depuis 5 ans',
    content: 'Cette église a transformé ma vie. J\'ai trouvé une famille spirituelle merveilleuse et un sens profond à mon existence.',
    rating: 5
  },
  {
    name: 'Pierre Martin',
    role: 'Responsable groupe jeunes',
    content: 'L\'atmosphère de bienveillance et les enseignements profonds m\'ont aidé à grandir dans ma foi de manière extraordinaire.',
    rating: 5
  },
  {
    name: 'Sarah Johnson',
    role: 'Nouvelle convertie',
    content: 'Accueillie avec tant d\'amour et de patience. Chaque dimanche est une nouvelle bénédiction pour moi.',
    rating: 5
  }
];

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/161154/church-building-religion-christian-161154.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
          }}
        />
        <div className="absolute inset-0 hero-overlay" />
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
           
            
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight mt-20">
              Bienvenue A EPUC DE BITOTOL
              <span className="block text-accent">Eglise Pentecotiste Unie du Cameroun</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Un lieu où l'amour de Dieu transforme les cœurs, où la communion fraternelle 
              nourrit l'âme, et où chaque personne trouve sa place dans Sa grande famille.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/about" className="btn-secondary text-lg px-8 py-4">
                Découvrir Notre Église
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <button className="flex items-center space-x-3 text-white hover:text-accent transition-colors duration-300 group">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-all duration-300">
                  <Play className="w-6 h-6 ml-1" fill="currentColor" />
                </div>
                <span className="text-lg font-semibold">Message du Pasteur</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-white/80">Membres Actifs</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold mb-2">15</div>
                <div className="text-white/80">Années de Service</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-white/80">Programmes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
              Pourquoi Nous Rejoindre ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Découvrez les piliers de notre communauté et comment nous pouvons 
              vous accompagner dans votre cheminement spirituel.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={`card-hover bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center animate-fade-in`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`w-16 h-16 mx-auto mb-6 bg-gray-50 rounded-2xl flex items-center justify-center ${feature.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="flex items-center mb-4">
                <Sparkles className="w-6 h-6 text-accent mr-2" />
                <span className="text-accent font-semibold">Notre Histoire</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
                Une Église Fondée sur l'Amour de Dieu
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Depuis plus de 15 ans, notre église grandit dans la foi et l'amour mutuel. 
                Nous sommes une communauté pentecôtiste vivante qui croit en la puissance 
                transformatrice de l'Évangile et en l'œuvre du Saint-Esprit dans nos vies.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-muted-foreground">Enseignement biblique authentique</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-muted-foreground">Communion fraternelle chaleureuse</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-muted-foreground">Service communautaire engagé</span>
                </div>
              </div>
              <Link href="/about" className="btn-primary">
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
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-12 h-12 text-white" fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
              Prochains Événements
            </h2>
            <p className="text-xl text-muted-foreground">
              Rejoignez-nous pour nos prochaines célébrations et activités
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <div
                key={event.title}
                className={`card-hover bg-white rounded-2xl p-8 shadow-lg border border-gray-100 animate-fade-in`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-accent mb-2">
                    {new Date(event.date).getDate()}
                  </div>
                  <div className="text-muted-foreground">
                    {new Date(event.date).toLocaleDateString('fr-FR', { month: 'long' })}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-primary mb-3 text-center">
                  {event.title}
                </h3>
                
                <div className="flex items-center justify-center space-x-4 mb-4 text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-center mb-6">
                  {event.description}
                </p>
                
                <button className="w-full btn-primary">
                  Participer
                </button>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/activities" className="btn-secondary">
              Voir Tous les Événements
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Témoignages de Foi
            </h2>
            <p className="text-xl text-primary-foreground/80">
              Découvrez comment Dieu transforme des vies dans notre communauté
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className={`bg-white/10 backdrop-blur-sm rounded-2xl p-8 animate-fade-in`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent" fill="currentColor" />
                  ))}
                </div>
                
                <p className="text-primary-foreground/90 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div>
                  <div className="font-semibold text-primary-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-primary-foreground/70 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Prêt à Nous Rejoindre ?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Venez découvrir une communauté où vous pourrez grandir dans la foi, 
            tisser des liens durables et servir avec passion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-accent px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg">
              Nous Contacter
            </Link>
            <Link href="/activities" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-accent transition-all duration-300 hover:scale-105">
              Voir nos Activités
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}