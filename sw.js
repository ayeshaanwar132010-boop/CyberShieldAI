const C="cs-v2",F=["./","index.html","css/style.css","js/config.js","js/i18n.js","js/data.js","js/rules.js","js/app.js","manifest.json","assets/icon.svg"];
self.addEventListener("install",e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F))));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
