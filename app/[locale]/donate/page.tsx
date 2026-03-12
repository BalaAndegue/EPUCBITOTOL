'use client';

import { Heart, CreditCard, Smartphone, Check } from 'lucide-react';

const paymentMethods = [
  {
    name: 'Mobile Money / Orange Money',
    description: 'Le moyen le plus simple pour soutenir l\'œuvre depuis le Cameroun.',
    icon: Smartphone,
    color: 'bg-orange-500',
    details: [
      { provider: 'MTN MoMo', number: '+237 6 70 00 00 00', name: 'EPUC Bitotol' },
      { provider: 'Orange Money (OM)', number: '#150*...#', name: 'Code Marchand: 123456' }
    ]
  },
  {
    name: 'Virement Bancaire',
    description: 'Pour les dons plus importants ou depuis l\'étranger.',
    icon: CreditCard,
    color: 'bg-blue-600',
    details: [
      { provider: 'Banque', number: 'UBA Cameroun', name: '' },
      { provider: 'RIB', number: '10033 05214 ...', name: '' }
    ]
  }
];

export default function Donate() {
  return (
    <div className="pt-20 bg-[var(--color-background)] min-h-screen">

      {/* Hero */}
      <section className="bg-[var(--color-primary)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-16 h-16 text-white/20 mx-auto mb-6 animate-pulse" fill="currentColor" />
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Soutenir l'Œuvre de Dieu
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            "Que chacun donne comme il l'a résolu en son cœur, sans tristesse ni contrainte; car Dieu aime celui qui donne avec joie." (2 Cor 9:7)
          </p>
        </div>
      </section>

      {/* Methods */}
      <section className="py-20 relative -mt-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div key={method.name} className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 overflow-hidden relative">
                  <div className={`absolute top-0 right-0 p-4 opacity-5 pointer-events-none`}>
                    <Icon className="w-32 h-32" />
                  </div>

                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-12 h-12 ${method.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">{method.name}</h3>
                  </div>

                  <p className="text-[var(--color-text-secondary)] mb-8">{method.description}</p>

                  <div className="space-y-4 bg-gray-50 rounded-xl p-6">
                    {method.details.map((detail, idx) => (
                      <div key={idx} className="flex flex-col border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                        <span className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-1">{detail.provider}</span>
                        <span className="text-lg font-mono font-bold text-[var(--color-text-primary)]">{detail.number}</span>
                        {detail.name && <span className="text-sm text-[var(--color-primary)] font-medium">{detail.name}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-[var(--color-text-primary)] mb-12">À quoi servent vos dons ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"><Check className="w-6 h-6" /></div>
              <h3 className="font-bold text-lg mb-2">Évangélisation</h3>
              <p className="text-gray-500 text-sm">Soutenir les campagnes et les missions.</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"><Check className="w-6 h-6" /></div>
              <h3 className="font-bold text-lg mb-2">Entretien du Temple</h3>
              <p className="text-gray-500 text-sm">Loyer, électricité, sonorisation.</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><Check className="w-6 h-6" /></div>
              <h3 className="font-bold text-lg mb-2">Social</h3>
              <p className="text-gray-500 text-sm">Aider les veuves et orphelins de Bitotol.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}