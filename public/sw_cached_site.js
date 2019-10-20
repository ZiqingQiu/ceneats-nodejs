const cacheName = 'v2';

// Call Install Event
self.addEventListener('install', e => {
  self.skipWaiting();
  console.log('Service Worker: Installed');
});

// Call Activate Event
self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event
self.addEventListener('fetch', e => {
  if (e.request.clone().method === 'GET') {
    console.log('Service Worker: Fetching -- GET');
    e.respondWith(
      fetch(e.request)
        .then(res => {
          // Make copy/clone of response
          const resClone = res.clone();
          // Open cahce
          caches.open(cacheName).then(cache => {
            // Add response to cache
            cache.put(e.request, resClone);
          });
          return res;
        })
        .catch(err => caches.match(e.request).then(res => res))
    );
  }
  else if (e.request.clone().method === 'POST') {
    console.log('Service Worker: Fetching -- POST');
        // attempt to send request normally
        e.respondWith(fetch(e.request.clone()).catch(function
          (error) {
            // only save post requests in browser, if an error occurs
            //savePostRequests(e.request.clone().url, form_data)
          }))
  }
});
