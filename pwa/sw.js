const CACHE_NAME = "chordbook-lite-v86";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./styles.css?v=86",
  "./app.js?v=86",
  "./vendor/peerjs.min.js",
  "./privacy.html",
  "./instalar.html",
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
