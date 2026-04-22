import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PWAInstaller from '@/components/PWAInstaller';
import { Toaster } from 'sonner';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'ÉPUC Nkoabang — Église Pentecôtiste Unie du Cameroun',
  description: 'Église Pentecôtiste Unie du Cameroun — Assemblée de Nkoabang, Yaoundé. Cultes, prédications et vie communautaire.',
  manifest: '/manifest.json',
  themeColor: '#070A14',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'ÉPUC Nkoabang',
  },
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials" />
        <meta name="theme-color" content="#070A14" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ÉPUC Nkoabang" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/icons/icon-144x144.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-96x96.png" />
      </head>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <PWAInstaller />
          <Header locale={locale} />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Toaster richColors position="top-center" />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}