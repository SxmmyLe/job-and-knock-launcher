const CACHE='job-knock-launcher-v6';
const SHELL=['./','./index.html','./manifest.webmanifest','./icons/job-and-knock-icon-v2.png'];
const PROFILE_ROUTE='/install/Job-and-Knock.mobileconfig';

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
  const url=new URL(req.url);

  // GitHub Pages serves .mobileconfig as ordinary text. For this virtual route,
  // fetch the real profile and re-serve it with Apple's required MIME type so
  // Safari recognises it as a configuration profile instead of displaying XML.
  if(url.origin===self.location.origin && url.pathname.endsWith(PROFILE_ROUTE)){
    event.respondWith((async()=>{
      const sourceUrl=new URL('./Job-and-Knock.mobileconfig',self.registration.scope);
      const source=await fetch(sourceUrl,{cache:'no-store'});
      if(!source.ok) return new Response('Profile file unavailable',{status:502});
      const profile=await source.text();
      return new Response(profile,{
        status:200,
        headers:{
          'Content-Type':'application/x-apple-aspen-config',
          'Content-Disposition':'attachment; filename="Job-and-Knock.mobileconfig"',
          'Cache-Control':'no-store'
        }
      });
    })());
    return;
  }

  if(req.mode==='navigate'){
    event.respondWith(fetch(req).catch(()=>caches.match('./index.html')));
    return;
  }
  if(url.origin===self.location.origin){
    event.respondWith(caches.match(req).then(hit=>hit||fetch(req)));
  }
});
