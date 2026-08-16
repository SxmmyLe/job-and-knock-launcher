const CACHE='job-knock-launcher-v5';
const SHELL=['./','./index.html','./manifest.webmanifest','./icons/job-and-knock-icon-v2.png'];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)));
  self.skipWaiting();
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.mode==='navigate'){
    event.respondWith(fetch(req).catch(()=>caches.match('./index.html')));
    return;
  }
  if(new URL(req.url).origin===self.location.origin){
    event.respondWith(caches.match(req).then(hit=>hit||fetch(req)));
  }
});
