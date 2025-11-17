self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  clients.claim();
});

// Nome do cache
const CACHE_NAME = 'gerenciador-de-clientes-v2';

// Arquivos a serem cacheados
const urlsToCache = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/img/icon192.png',
    '/img/icon512.png',
    '/img/iconpadrao1024.png.png',
    '/js/script.js'
];

// Instala o Service Worker e faz o cache dos arquivos estáticos
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: fazendo cache dos arquivos');
                return cache.addAll(urlsToCache);
            })
    );
});

// Ativa o Service Worker e remove caches antigos
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: removendo cache antigo', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Intercepta requisições e responde com os arquivos do cache
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response; // Se encontrar no cache, retorna o cache
                }
                console.log('Service Worker: arquivo não encontrado no cache, fazendo requisição:', event.request.url);
                return fetch(event.request); // Se não encontrar no cache, faz a requisição normalmente
            }).catch(() => {
                // Aqui você pode adicionar uma página offline personalizada
                return caches.match('/index.html');
            })
    );
});
