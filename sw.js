const CACHE_NAME = 'bytetrip-agent-v1';
const urlsToCache = [
  './bytetripagent-app.html',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Instalasi Service Worker dan simpan file ke cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache for ByteTrip Agent');
        return cache.addAll(urlsToCache);
      })
  );
});

// Mengambil file (Intercept Request) dari Cache terlebih dahulu
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Berikan dari cache (Bisa jalan offline)
        }
        return fetch(event.request); // Ambil dari internet jika belum ada di cache
      })
  );
});