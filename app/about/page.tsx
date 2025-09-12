'use client';

import { Heart, Users, Target, Award, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const values = [
  {
    icon: Heart,
    title: 'Amour',
    description: 'L\'amour de Dieu est au centre de tout ce que nous faisons',
    color: 'text-red-500'
  },
  {
    icon: Users,
    title: 'Communauté',
    description: 'Nous croyons en la force de la communion fraternelle',
    color: 'text-blue-500'
  },
  {
    icon: Target,
    title: 'Mission',
    description: 'Évangéliser et servir notre communauté avec passion',
    color: 'text-green-500'
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Nous nous efforçons d\'honorer Dieu en toutes choses',
    color: 'text-purple-500'
  }
];

const pastors = [
  {
    name: 'Pasteur DIDIER MBOM',
    role: 'Pasteur Principal',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Servant de Dieu depuis plus de 20 ans, le Pasteur DIDIER guide notre communauté avec sagesse et compassion.'
  },
  {
    name: 'ANCIEN NORIS',
    role: 'Pasteur Associée',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Passionnée par l\'accompagnement des familles et l\'évangélisation, elle apporte une perspective unique à notre ministère.'
  },
  {
    name: 'ANCIEN NORIS',
    role: 'Pasteur Associée',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Passionnée par l\'accompagnement des familles et l\'évangélisation, elle apporte une perspective unique à notre ministère.'
  },
  {
    name: 'ANCIEN NORIS',
    role: 'Pasteur Associée',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Passionnée par l\'accompagnement des familles et l\'évangélisation, elle apporte une perspective unique à notre ministère.'
  },
  {
    name: 'ANCIEN NORIS',
    role: 'Pasteur Associée',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Passionnée par l\'accompagnement des familles et l\'évangélisation, elle apporte une perspective unique à notre ministère.'
  }
];

const milestones = [
  { year: '2009', event: 'Fondation de l\'église avec 25 membres' },
  { year: '2012', event: 'Inauguration de notre premier bâtiment' },
  { year: '2015', event: 'Lancement des programmes jeunesse' },
  { year: '2018', event: 'Ouverture du centre communautaire' },
  { year: '2021', event: 'Célébration des 500 membres' },
  { year: '2024', event: 'Expansion internationale prévue' }
];

export default function About() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center">
                <Heart className="w-10 h-10 text-white" fill="currentColor" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              À Propos de Notre Église
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Une communauté pentecôtiste fondée sur l'amour, la foi et le service
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <div className="flex items-center mb-4">
                <Sparkles className="w-6 h-6 text-accent mr-2" />
                <span className="text-accent font-semibold">Notre Mission</span>
              </div>
              <h2 className="text-4xl font-heading font-bold text-primary mb-6">
                Faire Connaître l'Amour de Dieu
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Notre mission est de proclamer l'Évangile de Jésus-Christ, de former des disciples 
                authentiques et de servir notre communauté avec l'amour inconditionnel de Dieu. 
                Nous croyons que chaque personne a une valeur inestimable aux yeux de Dieu.
              </p>
              
              <div className="bg-muted/30 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-semibold text-primary mb-4">Notre Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  "Être une église où chaque personne peut découvrir sa destinée en Dieu, 
                  grandir dans la foi et impact er positivement sa communauté."
                </p>
              </div>
            </div>
            
            <div className="animate-scale-in">
              <img
                src="https://images.pexels.com/photos/8468687/pexels-photo-8468687.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Culte en communauté"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
              Nos Valeurs Fondamentales
            </h2>
            <p className="text-xl text-muted-foreground">
              Les piliers qui guident notre communauté au quotidien
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className={`card-hover bg-white rounded-2xl p-8 shadow-lg text-center animate-fade-in`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`w-16 h-16 mx-auto mb-6 bg-gray-50 rounded-2xl flex items-center justify-center ${value.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pastors */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
              Notre Équipe Pastorale
            </h2>
            <p className="text-xl text-muted-foreground">
              Des serviteurs de Dieu dévoués à votre croissance spirituelle
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {pastors.map((pastor, index) => (
              <div
                key={pastor.name}
                className={`card-hover bg-white rounded-2xl p-8 shadow-lg text-center animate-fade-in`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                  <img
                    src={pastor.image}
                    alt={pastor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-primary mb-2">{pastor.name}</h3>
                <p className="text-accent font-medium mb-4">{pastor.role}</p>
                <p className="text-muted-foreground leading-relaxed">{pastor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Notre Histoire
            </h2>
            <p className="text-xl text-white/80">
              Les étapes marquantes de notre croissance en foi
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-accent"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 ${
                      index % 2 === 0 ? 'text-right' : 'text-left'
                    }`}>
                      <div className="text-2xl font-bold text-accent mb-2">{milestone.year}</div>
                      <p className="text-white/90">{milestone.event}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-accent rounded-full border-4 border-primary"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Venez Faire Partie de Notre Histoire
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Rejoignez une communauté où votre foi peut grandir et s'épanouir
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-accent px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg">
              Nous Rencontrer
            </Link>
            <Link href="/activities" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-accent transition-all duration-300 hover:scale-105">
              Nos Activités
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}