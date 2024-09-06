// service-worker.js

const CACHE_NAME = 'trackmytube-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/planner.html',
  '/station.html',
  '/status.html',
  '/css/styles.css',
  '/css/about.css',
  '/css/index.css',
  '/css/planner.css',
  '/css/station.css',
  '/css/status.css',
  '/js/script.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
