const cacheName = 'v2';
const INDEX_DB_NAME = 'ceneats_form'
const OBJSTORE_POST_REQ_NAME = 'post_requests'

// Index DB
let post_req_db;
let form_data;
function createIndexDB() {
  let indexedDBOpenRequest = indexedDB.open(INDEX_DB_NAME, 1);
  indexedDBOpenRequest.onerror = function (error) {
    // error creating db
    console.error('IndexedDB error:', error)
  }
  indexedDBOpenRequest.onupgradeneeded = function () {
    // This should only executes if there's a need to 
    // create/update db.
    this.result.createObjectStore(OBJSTORE_POST_REQ_NAME, {
      autoIncrement: true, keyPath: 'id'
    })
  }
  // This will execute each time the database is opened.
  indexedDBOpenRequest.onsuccess = function () {
    console.log('post_req_db success inited...');
    post_req_db = this.result
  }
}

function getObjectStore(objStoreName, mode) {
  // retrieve our object store
  return post_req_db.transaction(objStoreName, mode
  ).objectStore(objStoreName)
}

function savePostRequests(url, payload) {
  // get object_store and save our payload inside it
  var request = getObjectStore(OBJSTORE_POST_REQ_NAME, 'readwrite').add({
    url: url,
    payload: payload,
    method: 'POST'
  })
  request.onsuccess = function (event) {
    console.log('a new pos_ request has been added to indexedb')
  }
  request.onerror = function (error) {
    console.error(error)
  }
}

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
  // Create Index DB
  e.waitUntil(createIndexDB());
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
        e.respondWith(fetch(e.request.clone())
        .catch(err => {
            // only save post requests in browser, if an error occurs
            savePostRequests(e.request.clone().url, form_data)
          }))
  }
});

// Capture message event
self.addEventListener('message', e => {
  console.log('form data', e.data)
  if (e.data.hasOwnProperty('form_data')) {
    // receives form data from post js upon submission
    form_data = e.data.form_data
  }
})
