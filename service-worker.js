const CACHE_NAME = 'clientes-cache-v1';
const urlsToCache = [
  '/',
  '/css/estilo.css',
  '/manifest.json',
  // adicione outros recursos que deseja armazenar em cache
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});