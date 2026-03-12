import Link from 'next/link';
import { Heart, Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

const socialLinks = [
  { name: 'Facebook', href: '#', icon: Facebook },
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'YouTube', href: '#', icon: Youtube },
  { name: 'Twitter', href: '#', icon: Twitter },
];

const quickLinks = [
  { name: 'À Propos', href: '/about' },
  { name: 'Nos Activités', href: '/activities' },
  { name: 'Prédications', href: '/messages' },
  { name: 'Vie Communautaire', href: '/community' },
  { name: 'Contactez-nous', href: '/contact' },
];

const services = [
  { name: 'Culte Dominical', time: 'Dimanche 09h00' },
  { name: 'Étude Biblique', time: 'Mercredi 18h00' },
  { name: 'Réunion des Jeunes', time: 'Vendredi 18h30' },
  { name: 'Intercession', time: 'Samedi 06h00' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-[var(--color-primary)] rounded-lg flex items-center justify-center group-hover:bg-[var(--color-primary-hover)] transition-colors">
                <Heart className="w-6 h-6 text-white" fill="currentColor" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-white">ÉPUC BITOTOL</h3>
                <p className="text-xs text-slate-400">Eglise Pentecôtiste Unie</p>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Une communauté vibrante à Yaoundé, dédiée à l'enseignement des apôtres,
              à la communion fraternelle, à la fraction du pain et aux prières.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Liens Rapides */}
          <div>
            <h4 className="text-white font-semibold mb-6">Navigation</h4>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-[var(--color-primary)] transition-colors duration-200 block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-6">Nos Horaires</h4>
            <ul className="space-y-4 text-sm">
              {services.map((service) => (
                <li key={service.name} className="flex justify-between items-start border-b border-slate-800 pb-2 last:border-0">
                  <span className="text-slate-300 font-medium">{service.name}</span>
                  <span className="text-slate-500 text-right">{service.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">Nous Trouver</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                <div className="text-slate-400">
                  <p className="text-white font-medium">Quartier Bitotol</p>
                  <p>Melen, Yaoundé, Cameroun</p>
                  <p className="text-xs mt-1">(Carrefour des Sœurs)</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0" />
                <p className="text-slate-400">+237 6 99 00 00 00</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0" />
                <p className="text-slate-400">contact@epuc-bitotol.cm</p>
              </div>
            </div>

            {/* Newsletter Simple */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              <Link href="/contact" className="text-xs text-[var(--color-primary)] hover:underline flex items-center">
                Besoin de prière ? Écrivez-nous →
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ÉPUC Bitotol. Tous droits réservés.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white">Confidentialité</Link>
            <Link href="#" className="hover:text-white">Mentions Légales</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}