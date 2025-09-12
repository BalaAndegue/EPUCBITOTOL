'use client';

import { useState } from 'react';
import { Heart, CreditCard, Smartphone, Globe, Shield, ArrowRight } from 'lucide-react';

const paymentMethods = [
  { id: 'orange', name: 'Orange Money', icon: '🟠', color: 'bg-orange-500' },
  { id: 'mtn', name: 'MTN Money', icon: '🟡', color: 'bg-yellow-500' },
  { id: 'card', name: 'Carte Visa/Mastercard', icon: '💳', color: 'bg-blue-500' },
  { id: 'bank', name: 'Virement Bancaire', icon: '🏦', color: 'bg-green-500' }
];

const donationAmounts = [
  { amount: 5000, label: '5 000 FCFA' },
  { amount: 10000, label: '10 000 FCFA' },
  { amount: 20000, label: '20 000 FCFA' },
  { amount: 50000, label: '50 000 FCFA' },
  { amount: 100000, label: '100 000 FCFA' },
  { amount: 0, label: 'Autre montant' }
];

const donationPurposes = [
  { id: 'general', name: 'Fonds Général', description: 'Soutien général aux activités de l\'église' },
  { id: 'missions', name: 'Missions', description: 'Soutien aux missions locales et internationales' },
  { id: 'building', name: 'Fonds Bâtiment', description: 'Construction et entretien des locaux' },
  { id: 'social', name: 'Action Sociale', description: 'Aide aux personnes dans le besoin' },
  { id: 'youth', name: 'Ministère Jeunesse', description: 'Activités pour les jeunes' },
  { id: 'media', name: 'Médias', description: 'Équipement audio-visuel et streaming' }
];

export default function Donate() {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [selectedAmount, setSelectedAmount] = useState(10000);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState('general');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: '',
    anonymous: false
  });

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de traitement du don à implémenter
    console.log({
      amount: selectedAmount === 0 ? parseInt(customAmount) : selectedAmount,
      method: selectedMethod,
      purpose: selectedPurpose,
      donor: donorInfo
    });
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    if (amount !== 0) {
      setCustomAmount('');
    }
  };

  const totalAmount = selectedAmount === 0 ? parseInt(customAmount) || 0 : selectedAmount;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Heart className="w-20 h-20 mx-auto mb-6 text-accent" />
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              Soutenez Notre Ministère
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Votre générosité nous permet de continuer à servir la communauté et à répandre la Parole
            </p>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Donation Options */}
            <div>
              <h2 className="text-3xl font-heading font-bold text-primary mb-8">
                Faire un Don
              </h2>

              {/* Purpose Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-primary mb-4">
                  Choisissez la destination de votre don
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {donationPurposes.map((purpose) => (
                    <button
                      key={purpose.id}
                      onClick={() => setSelectedPurpose(purpose.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all duration-300 ${
                        selectedPurpose === purpose.id
                          ? 'border-accent bg-accent/10'
                          : 'border-gray-200 hover:border-accent/50'
                      }`}
                    >
                      <div className="font-semibold text-primary mb-1">
                        {purpose.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {purpose.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-primary mb-4">
                  Montant du don
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {donationAmounts.map((item) => (
                    <button
                      key={item.amount}
                      onClick={() => handleAmountSelect(item.amount)}
                      className={`py-3 rounded-lg border-2 font-semibold transition-all duration-300 ${
                        selectedAmount === item.amount
                          ? 'border-accent bg-accent text-white'
                          : 'border-gray-200 text-primary hover:border-accent'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {selectedAmount === 0 && (
                  <div className="mt-4">
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="Entrez le montant"
                      className="w-full px-4 py-3 border-2 border-accent rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-primary mb-4">
                  Méthode de paiement
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 flex items-center space-x-3 ${
                        selectedMethod === method.id
                          ? 'border-accent bg-accent/10'
                          : 'border-gray-200 hover:border-accent/50'
                      }`}
                    >
                      <span className="text-2xl">{method.icon}</span>
                      <span className="font-semibold">{method.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Donor Info & Summary */}
            <div>
              <div className="bg-muted/30 rounded-2xl p-8 sticky top-8">
                <h3 className="text-2xl font-semibold text-primary mb-6">
                  Résumé du Don
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Montant:</span>
                    <span className="font-semibold text-xl text-accent">
                      {totalAmount.toLocaleString()} FCFA
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Destination:</span>
                    <span className="font-semibold">
                      {donationPurposes.find(p => p.id === selectedPurpose)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Méthode:</span>
                    <span className="font-semibold">
                      {paymentMethods.find(m => m.id === selectedMethod)?.name}
                    </span>
                  </div>
                </div>

                <form onSubmit={handleDonate} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      value={donorInfo.name}
                      onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={donorInfo.email}
                      onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={donorInfo.phone}
                      onChange={(e) => setDonorInfo({...donorInfo, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={donorInfo.anonymous}
                      onChange={(e) => setDonorInfo({...donorInfo, anonymous: e.target.checked})}
                      className="rounded border-gray-300 text-accent focus:ring-accent"
                    />
                    <label className="ml-2 text-sm text-muted-foreground">
                      Faire un don anonyme
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-accent text-white py-4 rounded-lg font-semibold hover:bg-accent/90 transition-all duration-300 flex items-center justify-center"
                  >
                    Faire le don
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </form>

                <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span>Paiement sécurisé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-primary mb-6">
              Paiement Sécurisé
            </h2>
            <p className="text-xl text-muted-foreground">
              Votre sécurité est notre priorité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <Shield className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-4">
                  Cryptage SSL
                </h3>
                <p className="text-muted-foreground">
                  Toutes vos données sont cryptées et protégées contre toute intrusion
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <CreditCard className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-4">
                  Paiements Sécurisés
                </h3>
                <p className="text-muted-foreground">
                  Transactions certifiées et conformes aux standards internationaux
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <Globe className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-4">
                  Confidentialité
                </h3>
                <p className="text-muted-foreground">
                  Vos informations personnelles ne sont jamais partagées avec des tiers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-primary mb-6">
              Questions Fréquentes
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-muted/30 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">
                Comment sont utilisés les dons ?
              </h3>
              <p className="text-muted-foreground">
                Vos dons sont utilisés pour soutenir les différentes activités de l'église, 
                les missions, l'entretien des locaux, et les actions sociales envers les plus démunis.
              </p>
            </div>

            <div className="bg-muted/30 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">
                Puis-je obtenir un reçu pour mon don ?
              </h3>
              <p className="text-muted-foreground">
                Oui, nous fournissons des reçus pour tous les dons. Un reçu officiel vous sera 
                envoyé par email après traitement de votre don.
              </p>
            </div>

            <div className="bg-muted/30 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">
                Les dons sont-ils déductibles d'impôts ?
              </h3>
              <p className="text-muted-foreground">
                Dans la plupart des pays, les dons aux organisations religieuses sont déductibles 
                d'impôts. Veuillez consulter votre conseiller fiscal pour plus de détails.
              </p>
            </div>

            <div className="bg-muted/30 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">
                Puis-je faire un don mensuel récurrent ?
              </h3>
              <p className="text-muted-foreground">
                Oui, nous proposons des options de dons récurrents. Contactez-nous pour 
                mettre en place un don automatique mensuel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Merci pour Votre Soutien
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Chaque don, quel que soit son montant, fait une différence dans notre ministère
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-accent px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg">
              Faire un Don Maintenant
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-accent transition-all duration-300 hover:scale-105">
              Nous Contacter
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}