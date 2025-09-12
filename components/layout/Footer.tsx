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
  { name: 'Activités', href: '/activities' },
  { name: 'Messages', href: '/messages' },
  { name: 'Communauté', href: '/community' },
  { name: 'Contact', href: '/contact' },
  { name: 'Faire un Don', href: '/donate' },
];

const services = [
  { name: 'Culte Dominical', time: 'Dimanche 10h00' },
  { name: 'Prière du Mercredi', time: 'Mercredi 18h00' },
  { name: 'École du Dimanche', time: 'Dimanche 9h00' },
  { name: 'Jeunes', time: 'Vendredi 19h30' },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" fill="currentColor" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold">ÉPUC</h3>
                <p className="text-sm text-primary-foreground/80">Eglise Pentecotiste Unie du Cameroun</p>
              </div>
            </Link>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Une communauté de foi vivante où chacun peut grandir spirituellement, 
              trouver l'amour de Dieu et servir avec passion.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-accent hover:scale-110 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Liens Rapides */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Liens Rapides</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Nos Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <div className="text-primary-foreground/80">
                    <div className="font-medium">{service.name}</div>
                    <div className="text-sm text-primary-foreground/60">{service.time}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div className="text-primary-foreground/80">
                  <p>123 Nkoabang 10eme Arret</p>
                  <p>75001 Yaounde, Cameroun</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <p className="text-primary-foreground/80">+237 6 23 45 67 89</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <p className="text-primary-foreground/80">contact@eglise-foi.fr</p>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="font-semibold mb-3">Newsletter</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-3 py-2 bg-primary-foreground/10 rounded-l-lg border border-primary-foreground/20 focus:outline-none focus:border-accent text-sm"
                />
                <button className="px-4 py-2 bg-accent text-white rounded-r-lg hover:bg-accent/90 transition-colors duration-300">
                  S'inscrire
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/60">
            © 2024 Église Pentecôtiste. Tous droits réservés. Fait avec ❤️ pour la gloire de Dieu.
          </p>
        </div>
      </div>
    </footer>
  );
}