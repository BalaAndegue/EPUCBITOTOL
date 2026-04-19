const CACHE_NAME = 'epuc-nkoabang-v1';
const STATIC_ASSETS = [
  '/fr',
  '/fr/about',
  '/fr/activities',
  '/fr/contact',
  '/fr/bibles',
  '/manifest.json',
];

/* Installation — mise en cache des ressources statiques */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {});
    })
  );
  self.skipWaiting();
});

/* Activation — suppression des anciens caches */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

/* Fetch — stratégie Network First, fallback cache */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  /* Ignorer les requêtes non-GET et les API Prisma */
  if (request.method !== 'GET') return;
  if (request.url.includes('/api/') && !request.url.includes('/api/verse')) return;
  if (request.url.includes('/_next/webpack-hmr')) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        /* Mettre en cache la réponse fraîche */
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => {
        /* Fallback depuis le cache si offline */
        return caches.match(request).then((cached) => {
          if (cached) return cached;
          /* Page offline par défaut */
          return caches.match('/fr') || new Response(
            '<html><body style="font-family:sans-serif;text-align:center;padding:40px"><h2>ÉPUC Nkoabang</h2><p>Vous êtes hors ligne. Reconnectez-vous pour accéder à tout le contenu.</p></body></html>',
            { headers: { 'Content-Type': 'text/html' } }
          );
        });
      })
  );
});

/* Synchronisation en arrière-plan (Background Sync) */
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-testimonial') {
    /* Synchroniser les témoignages en attente si la connexion revient */
    event.waitUntil(syncPendingData());
  }
});

async function syncPendingData() {
  /* Logique de synchronisation offline → online */
  try {
    const cache = await caches.open(CACHE_NAME);
    const keys = await cache.keys();
    const pendingKeys = keys.filter((k) => k.url.includes('pending-'));
    for (const key of pendingKeys) {
      const data = await cache.match(key);
      if (data) {
        const json = await data.json();
        await fetch('/api/sync', { method: 'POST', body: JSON.stringify(json), headers: { 'Content-Type': 'application/json' } });
        await cache.delete(key);
      }
    }
  } catch (e) {
    console.error('Sync failed:', e);
  }
}
