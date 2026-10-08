const CACHE_NAME = "ana-laura-propuestas-v11";
const APP_SHELL = [
  "./",
  "./index.html",
  "./propuesta-01.html",
  "./propuesta-02.html",
  "./propuesta-03.html",
  "./propuesta-04.html",
  "./propuesta-05.html",
  "./qr-propuesta-01.html",
  "./qr-propuesta-02.html",
  "./qr-propuesta-03.html",
  "./qr-propuesta-04.html",
  "./qr-propuesta-05.html",
  "./manifests/manifest-propuesta-01.json",
  "./manifests/manifest-propuesta-02.json",
  "./manifests/manifest-propuesta-03.json",
  "./manifests/manifest-propuesta-04.json",
  "./manifests/manifest-propuesta-05.json",
  "../../assets/css/propuestas-mobile.css",
  "../../assets/js/propuestas-mobile.js",
  "../../assets/js/qr-prototypes.js",
  "../../assets/js/propuestas-pwa.js",
  "../../assets/icons/whatsapp.svg",
  "../../assets/icons/call.svg",
  "../../assets/icons/email.svg",
  "../../assets/icons/linkedin.svg",
  "../../assets/icons/copy.svg",
  "../assets/img/qr-propuesta-01.png",
  "../assets/img/qr-propuesta-02.png",
  "../assets/img/qr-propuesta-03.png",
  "../assets/img/qr-propuesta-04.png",
  "../assets/img/qr-propuesta-05.png",
  "../assets/img/icon-ana-laura-modern-180.png",
  "../assets/img/icon-ana-laura-modern-192.png",
  "../assets/img/icon-ana-laura-modern-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME && key.startsWith("ana-laura-propuestas-")).map((key) => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(fetch(event.request).then((response) => {
    const copy = response.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html"))));
});
