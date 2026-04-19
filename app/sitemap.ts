import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://epuc-nkoabang.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['fr', 'en'];

  const staticRoutes = [
    { path: '',               freq: 'daily'  as const, priority: 1.0 },
    { path: '/about',         freq: 'weekly' as const, priority: 0.8 },
    { path: '/activities',    freq: 'weekly' as const, priority: 0.8 },
    { path: '/community',     freq: 'weekly' as const, priority: 0.7 },
    { path: '/contact',       freq: 'weekly' as const, priority: 0.7 },
    { path: '/announcements', freq: 'daily'  as const, priority: 0.9 },
    { path: '/messages',      freq: 'weekly' as const, priority: 0.7 },
    { path: '/donate',        freq: 'monthly' as const, priority: 0.6 },
    { path: '/bibles',        freq: 'monthly' as const, priority: 0.6 },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const { path, freq, priority } of staticRoutes) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: freq,
        priority,
      });
    }
  }

  return entries;
}
