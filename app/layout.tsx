import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Église Pentecôtiste UNie du Camroun',
  description: 'Rejoignez notre communauté de foi. Découvrez nos oeuvres, événements et messages inspirants. Église Pentecôtiste  Unie du Cameroun- Un lieu d\'amour, de prière et de croissance spirituelle.',
  keywords: 'église, pentecôtiste Unie du Cameroun, foi, prière, communauté, spiritualité, culte, témoignage',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}