const CACHE_NAME = "chordbook-lite-v87";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./styles.css?v=87",
  "./app.js?v=87",
  "./vendor/peerjs.min.js",
  "./privacy.html",
  "./instalar.html",
  "./comprar.html",
  "./sale.js",
  "./loja/01-biblioteca.png",
  "./loja/02-cifra.png",
  "./loja/03-palco.png",
  "./manifest.webmanifest",
  "./icons/favicon.png",
  "./icons/Icon-192.png",
  "./icons/Icon-512.png",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(
        ASSETS.map((url) =>
          fetch(url, { cache: "reload" }).then((response) => cache.put(url, response)),
        ),
      ),
    ),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
    ).then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request).then((response) => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      }
      return response;
    }).catch(() => caches.match(event.request)),
  );
});
