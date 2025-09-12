'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    title: 'Téléphone',
    details: ['01 23 45 67 89', '06 12 34 56 78'],
    color: 'text-green-500'
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['contact@eglise-foi.fr', 'pasteur@eglise-foi.fr'],
    color: 'text-blue-500'
  },
  {
    icon: MapPin,
    title: 'Adresse',
    details: ['123 Rue de la Paix', '75001 Btitol, Cameroun'],
    color: 'text-red-500'
  },
  {
    icon: Clock,
    title: 'Horaires d\'ouverture',
    details: ['Lun-Ven: 9h-17h', 'Dim: 8h-13h'],
    color: 'text-purple-500'
  }
];

const socialLinks = [
  { name: 'Facebook', href: '#', icon: Facebook, color: 'hover:text-blue-600' },
  { name: 'Instagram', href: '#', icon: Instagram, color: 'hover:text-pink-600' },
  { name: 'YouTube', href: '#', icon: Youtube, color: 'hover:text-red-600' },
  { name: 'Twitter', href: '#', icon: Twitter, color: 'hover:text-blue-400' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    visitType: 'premiere-visite'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Merci pour votre message ! Nous vous contacterons très bientôt.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      visitType: 'premiere-visite'
    });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Phone className="w-20 h-20 mx-auto mb-6 text-accent" />
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              Contactez-Nous
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Nous serions ravis de vous accueillir et de répondre à toutes vos questions
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-primary mb-6">
              Nos Coordonnées
            </h2>
            <p className="text-xl text-muted-foreground">
              Plusieurs moyens pour nous joindre et nous rencontrer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={info.title}
                  className={`card-hover bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-16 h-16 mx-auto mb-6 bg-gray-50 rounded-2xl flex items-center justify-center ${info.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-4">{info.title}</h3>
                  <div className="space-y-2">
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-muted-foreground">{detail}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="animate-slide-up">
              <h2 className="text-4xl font-heading font-bold text-primary mb-8">
                Envoyez-nous un Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-primary mb-2">
                      Nom Complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                      placeholder="Votre nom complet"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                      placeholder="votre@email.fr"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-primary mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                      placeholder="01 23 45 67 89"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="visitType" className="block text-sm font-semibold text-primary mb-2">
                      Type de Visite
                    </label>
                    <select
                      id="visitType"
                      name="visitType"
                      value={formData.visitType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                    >
                      <option value="premiere-visite">Première visite</option>
                      <option value="membre">Membre actuel</option>
                      <option value="information">Demande d'information</option>
                      <option value="priere">Demande de prière</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-primary mb-2">
                    Sujet *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                    placeholder="Sujet de votre message"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-primary mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Écrivez votre message ici..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Envoi en cours...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Send className="w-5 h-5" />
                      <span>Envoyer le Message</span>
                    </div>
                  )}
                </button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="animate-scale-in space-y-8">
              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="h-80 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 mx-auto mb-4 text-accent" />
                    <h3 className="text-xl font-semibold text-primary mb-2">Notre Localisation</h3>
                    <p className="text-muted-foreground">123 Rue de la Paix, 75001 Paris</p>
                    <button className="mt-4 btn-secondary text-sm">
                      Voir sur Google Maps
                    </button>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-primary mb-6 text-center">
                  Suivez-Nous
                </h3>
                <div className="flex justify-center space-x-6">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        className={`w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-600 transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color}`}
                      >
                        <Icon className="w-6 h-6" />
                      </a>
                    );
                  })}
                </div>
                <p className="text-center text-muted-foreground mt-4">
                  Restez connectés à notre communauté
                </p>
              </div>

              {/* WhatsApp Contact */}
              <div className="bg-green-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Contact WhatsApp
                </h3>
                <p className="text-muted-foreground mb-4">
                  Pour une réponse rapide, contactez-nous sur WhatsApp
                </p>
                <a
                  href="https://wa.me/33123456789"
                  className="inline-flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  <span>Ouvrir WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold mb-6">
            Besoin d'Aide Urgente ?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            En cas d'urgence spirituelle ou de besoin de prière immédiate, n'hésitez pas à nous contacter
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+33123456789" className="bg-accent text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent/90 transition-all duration-300 hover:scale-105 shadow-lg">
              Appel d'Urgence
            </a>
            <a href="mailto:urgence@eglise-foi.fr" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105">
              Email d'Urgence
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}