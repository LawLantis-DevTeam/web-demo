const cacheName = "LawlantisDevTeam-Lawlantis-0.1.0";
const contentToCache = [
    "Build/7876ff803724b5efce7eb8cf10ae2561.loader.js",
    "Build/5abc13a973568f463c6d3a3a5100e0bf.framework.js.unityweb",
    "Build/9efff7b3c909bac75430b0f339335a51.data.unityweb",
    "Build/55da5f509369042631127d9c0e6d3444.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
