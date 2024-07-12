const CACHE_NAME = 'clientes-cache-v1';
const urlsToCache = [
  '/',
  '/css/estilo.css',
  '/javascript/script.js',
  '/img/logo-padrao.png',
  '/service-worker.js',
  '/index.html'
];

// Evento de instalação do Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de ativação do Service Worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Evento de fetch para interceptar requisições e servir arquivos do cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Arquivo encontrado no cache
        }
        return fetch(event.request); // Arquivo não encontrado no cache, fazer requisição à rede
      })
  );
});