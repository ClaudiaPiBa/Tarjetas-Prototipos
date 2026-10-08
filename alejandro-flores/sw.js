const CACHE_NAME = "alejandro-flores-pwa-v8";

const APP_SHELL = [
  "./",
  "./qr.html",
  "./index.html",
  "./css/styles.css",
  "./js/main.js",
  "./js/pwa.js",
  "./json/manifest.json",
  "./assets/img/back.png",
  "./assets/img/foto-ale.jpeg",
  "./assets/img/code-qr.png",
  "./assets/img/icon-alejandro-final-180.png",
  "./assets/img/icon-alejandro-final-192.png",
  "./assets/img/icon-alejandro-final-512.png",
  "./assets/img/icon-alejandro-final-maskable-512.png",
  "./assets/cv/CV_Alejandro_Flores_Patino.pdf",
  "../assets/icons/whatsapp.svg",
  "../assets/icons/call.svg",
  "../assets/icons/email.svg",
  "../assets/icons/linkedin.svg",
  "../assets/icons/copy.svg",
  "../assets/icons/cel.svg",
  "../assets/icons/deskphone.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames
        .filter((cacheName) =>
          cacheName.startsWith("alejandro-flores-pwa-") && cacheName !== CACHE_NAME
        )
        .map((cacheName) => caches.delete(cacheName))
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match("./qr.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(request).then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
