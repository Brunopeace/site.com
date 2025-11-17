// Forçar ativação imediata do SW novo
self.addEventListener('install', (event) => {
  self.skipWaiting(); // força ativação imediata

  const CACHE_NAME = 'gerenciador-de-clientes-v2';

  const urlsToCache = [
      '/',
      '/index.html',
      '/css/styles.css',
      '/img/icon192.png',
      '/img/icon512.png',
      '/img/iconpadrao1024.png',
      '/javascript/script.js'
  ];

  event.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Service Worker: fazendo cache dos arquivos');
            return cache.addAll(urlsToCache);
        })
  );
});

// Ativar imediatamente e assumir controle das abas abertas
self.addEventListener('activate', (event) => {
  event.waitUntil(
      caches.keys().then((cacheNames) => {
          return Promise.all(
              cacheNames.map((cache) => {
                  if (cache !== 'gerenciador-de-clientes-v2') {
                      console.log('Service Worker: removendo cache antigo', cache);
                      return caches.delete(cache);
                  }
              })
          );
      })
  );

  clients.claim(); // força assumir o controle
});

// Responder com o cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
      caches.match(event.request)
          .then((response) => {
              if (response) {
                  return response;
              }
              console.log('Service Worker: arquivo não encontrado no cache:', event.request.url);
              return fetch(event.request);
          }).catch(() => {
              return caches.match('/index.html');
          })
  );
});
