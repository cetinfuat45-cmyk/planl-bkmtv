const CACHE_NAME = 'bakim-tv-v4';
const ASSETS = [
  './',
  './index.html',
  './planl-bkmtv.html',
  './manifest.json',
  './pwa_icon_192_1777960576531.png',
  './pwa_icon_512_1777956810565.png'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Anında devreye gir
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim(); // Tüm sekmelerin kontrolünü anında al
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
