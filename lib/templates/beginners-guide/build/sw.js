const dataCacheName = 'beginners-guide';
const cacheName = 'beginners-guide';
const filesToCache = [
  '/',
  './index.html',
  './sw.js',
  './manifest.json',
  './styles.css',
  './forge-bg.jpg',
  './img/forge-48.png',
  './img/forge-96.png',
  './img/forge-144.png',
  './img/forge-196.png',
  './img/forge-384.png',
];

self.addEventListener('install', (e) => {
  console.log('[ServiceWorker] Install');
  e.waitUntil(caches.open(cacheName).then((cache) => {
    console.log('[ServiceWorker] Caching app shell');
    return cache.addAll(filesToCache);
  }));
});

self.addEventListener('activate', (e) => {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(caches.keys().then((keyList) => {
    return Promise.all(keyList.map((key) => {
      if (key !== cacheName && key !== dataCacheName) {
        console.log('[ServiceWorker] Removing old cache', key);
        return caches.delete(key);
      }
    }));
  }));
  return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  console.log('[Service Worker] Fetch', e.request.url);
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
