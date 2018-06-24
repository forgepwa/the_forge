const dataCacheName = 'template-pwa';
const cacheName = 'template-pwa';
const filesToCache = [
  '/',
  './fonts',
  './fonts/roboto',
  './fonts/roboto/Roboto-Bold.woff',
  './fonts/roboto/Roboto-Bold.woff2',
  './fonts/roboto/Roboto-Light.woff',
  './fonts/roboto/Roboto-Light.woff2',
  './fonts/roboto/Roboto-Medium.woff',
  './fonts/roboto/Roboto-Medium.woff2',
  './fonts/roboto/Roboto-Regular.woff',
  './fonts/roboto/Roboto-Regular.woff2',
  './fonts/roboto/Roboto-Thin.woff',
  './fonts/roboto/Roboto-Thin.woff2',
  './images',
  './images/icons',
  './images/icons/icon-128x128.png',
  './images/icons/icon-144x144.png',
  './images/icons/icon-152x152.png',
  './images/icons/icon-192x192.png',
  './images/icons/icon-256x256.png',
  './index.html',
  './manifest.json',
  './scripts',
  './scripts/app.js',
  './service-worker.js',
  './styles',
  './styles/style.css',
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

self.addEventListener('fetch', (event) => {
  console.log('[Service Worker] Fetch', event.request.url);
  event.respondWith(fetch(event.request).catch(() => (caches.match(event.request))));
});
