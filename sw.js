const C="cs-v3",F=["./","index.html","css/style.css","js/config.js","js/i18n.js","js/data.js","js/rules.js","js/app.js","manifest.json","assets/icon.svg","assets/icon-192.png","assets/icon-512.png"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(F)))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)).catch(()=>caches.match("index.html")))});
