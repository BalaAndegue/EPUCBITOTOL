'use client';

import { Users, Heart, Sparkles, Calendar, Book, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const communityGroups = [
  {
    title: 'Groupe de Prière',
    description: 'Joignez-vous à nos réunions hebdomadaires pour prier et partager dans un esprit de communion.',
    icon: Heart,
    color: 'text-red-500',
    link: '/activities#prayer',
  },
  {
    title: 'Études Bibliques',
    description: 'Approfondissez votre foi à travers nos sessions d’étude de la Parole de Dieu.',
    icon: Book,
    color: 'text-blue-500',
    link: '/activities#bible-study',
  },
  {
    title: 'Ministère des Jeunes',
    description: 'Un espace vibrant pour les jeunes afin de grandir dans la foi et s’épanouir.',
    icon: Sparkles,
    color: 'text-purple-500',
    link: '/activities#youth',
  },
  {
    title: 'Service Communautaire',
    description: 'Participez à nos actions de bénévolat pour soutenir ceux dans le besoin.',
    icon: Users,
    color: 'text-green-500',
    link: '/activities#volunteer',
  },
];

const bibleResources = [
  {
    title: 'Bible Louis Segond (PDF)',
    description: 'Téléchargez la version Louis Segond en format PDF.',
    link: 'https://www.bible.com/fr/bible/2/GEN.1.LSG',
    color: 'text-blue-500',
  },
  {
    title: 'Application YouVersion',
    description: 'Accédez à la Bible sur votre smartphone avec YouVersion.',
    link: 'https://www.youversion.com/fr/la-bible-app',
    color: 'text-green-500',
  },
  {
    title: 'Bible en Ligne',
    description: 'Lisez la Bible en ligne avec différentes traductions.',
    link: 'https://www.biblegateway.com',
    color: 'text-purple-500',
  },
];

const events = [
  {
    date: 'Chaque Dimanche',
    title: 'Culte Dominical',
    description: 'Rejoignez-nous à 10h pour un moment de louange et d’enseignement.',
    link: '/activities#services',
  },
  {
    date: 'Mercredi 19 Juillet 2025',
    title: 'Soirée de Prière',
    description: 'Une soirée dédiée à la prière et à l’intercession.',
    link: '/activities#prayer',
  },
  {
    date: 'Samedi 26 Juillet 2025',
    title: 'Journée Communautaire',
    description: 'Participez à notre journée de partage et de convivialité.',
    link: '/activities#community-day',
  },
];

const galleryImages = [
  'https://images.pexels.com/photos/8468687/pexels-photo-8468687.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/6969826/pexels-photo-6969826.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/6146913/pexels-photo-6146913.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/5412159/pexels-photo-5412159.jpeg?auto=compress&cs=tinysrgb&w=400',
];

export default function Community() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center">
                <Users className="w-10 h-10 text-white" fill="currentColor" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              Notre Communauté EPUC
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Une famille unie par la foi, l’amour et l’engagement envers Dieu et les uns envers les autres.
            </p>
            <Link
              href="/about"
              className="inline-block mt-6 text-accent hover:underline"
            >
              En savoir plus sur notre histoire
            </Link>
          </div>
        </div>
      </section>

      {/* History of EPUC */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
              L’Histoire de Notre Communauté
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Fondée sur les valeurs de l’Église Protestante Unie du Cameroun, notre communauté est un phare de foi et de service.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Depuis sa fondation en 2009, notre communauté EPUC s’est développée autour de la vision d’une église vivante, ancrée dans l’amour de Dieu et le service aux autres. De nos débuts modestes avec 25 membres à notre expansion actuelle, nous avons toujours cherché à glorifier Dieu à travers nos actions. <Link href="/about#history" className="text-accent hover:underline">Découvrez les étapes clés de notre histoire</Link>.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Aujourd’hui, nous sommes une communauté dynamique qui soutient les familles, les jeunes et les plus démunis à travers des initiatives comme notre centre communautaire et nos programmes d’évangélisation. Rejoignez-nous pour écrire la suite de cette belle aventure ! <Link href="/contact" className="text-accent hover:underline">Contactez-nous</Link>.
              </p>
            </div>
            <div className="animate-scale-in">
              <img
                src="https://images.pexels.com/photos/8468687/pexels-photo-8468687.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Communauté EPUC"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bible Resources */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
              Ressources Bibliques
            </h2>
            <p className="text-xl text-muted-foreground">
              Accédez à la Parole de Dieu où que vous soyez
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bibleResources.map((resource, index) => (
              <div
                key={resource.title}
                className={`card-hover bg-white rounded-2xl p-8 shadow-lg text-center animate-fade-in`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`w-16 h-16 mx-auto mb-6 bg-gray-50 rounded-2xl flex items-center justify-center ${resource.color}`}>
                  <Book className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-4">{resource.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{resource.description}</p>
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-accent font-semibold hover:underline"
                >
                  Télécharger ou Accéder
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Groups */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
              Nos Groupes Communautaires
            </h2>
            <p className="text-xl text-muted-foreground">
              Trouvez votre place dans notre famille spirituelle
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {communityGroups.map((group, index) => {
              const Icon = group.icon;
              return (
                <div
                  key={group.title}
                  className={`card-hover bg-white rounded-2xl p-8 shadow-lg text-center animate-fade-in`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`w-16 h-16 mx-auto mb-6 bg-gray-50 rounded-2xl flex items-center justify-center ${group.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-4">{group.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{group.description}</p>
                  <Link href={group.link} className="text-accent font-semibold hover:underline">
                    En savoir plus
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Événements à Venir
            </h2>
            <p className="text-xl text-white/80">
              Participez à nos rassemblements pour renforcer votre foi et vos liens
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div
                key={event.title}
                className={`card-hover bg-white/10 backdrop-blur-sm rounded-2xl p-6 animate-fade-in`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center mb-4">
                  <Calendar className="w-6 h-6 text-accent mr-2" />
                  <span className="text-accent font-semibold">{event.date}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                <p className="text-white/90 mb-4">{event.description}</p>
                <Link href={event.link} className="text-accent font-semibold hover:underline">
                  Plus de détails
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
              Moments Partagés
            </h2>
            <p className="text-xl text-muted-foreground">
              Revivez les moments forts de notre communauté
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl shadow-lg animate-scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <img
                  src={image}
                  alt={`Moment communautaire ${index + 1}`}
                  className="w-full h-64 object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Faites Partie de Notre Famille
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Rejoignez une communauté où votre foi peut s’épanouir et vos liens se renforcer.
            Suivez-nous sur <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-accent">Facebook</a> ou <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-accent">Instagram</a> pour rester connecté.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-accent px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Nous Contacter
            </Link>
            <Link
              href="/activities"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-accent transition-all duration-300 hover:scale-105"
            >
              Découvrir Nos Activités
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}