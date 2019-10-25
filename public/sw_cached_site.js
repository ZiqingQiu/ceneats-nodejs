// Cache
const cacheName = 'v2.95';
// Index DB
const INDEX_DB_NAME = 'ceneats_form';
const OBJSTORE_POST_REQ_NAME = 'post_requests';
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
    console.log('index db success inited...');
  }
}


function deletePostRequests(post_msg_id) {
  let indexedDBOpenRequest = indexedDB.open(INDEX_DB_NAME, 1);
  indexedDBOpenRequest.onsuccess = function(event) {
    let indexdb = this.result;
    let indexT = indexdb.transaction(OBJSTORE_POST_REQ_NAME,'readwrite');
    let indexO = indexT.objectStore(OBJSTORE_POST_REQ_NAME);
    indexO.delete(post_msg_id);
  }
}

function savePostRequests(url, payload) {
  let indexedDBOpenRequest = indexedDB.open(INDEX_DB_NAME, 1);
  indexedDBOpenRequest.onsuccess = function(event) {
    let indexdb = this.result;
    let indexT = indexdb.transaction(OBJSTORE_POST_REQ_NAME,'readwrite');
    let indexO = indexT.objectStore(OBJSTORE_POST_REQ_NAME);
    indexO.add({
      url: url,
      payload: payload,
      method: 'POST'
    })
  }
}

function sendPostToServer() {
  let indexedDBOpenRequest = indexedDB.open(INDEX_DB_NAME, 1);
  indexedDBOpenRequest.onsuccess = function(event) {
    let indexdb = this.result;
    let indexT = indexdb.transaction(OBJSTORE_POST_REQ_NAME,'readwrite');
    let indexO = indexT.objectStore(OBJSTORE_POST_REQ_NAME);

    let req = indexO.openCursor();
    let savedRequests = [];

    req.onsuccess = function (event) {
      let cursor = event.target.result
      if (cursor) {
        // Keep moving the cursor forward and collecting saved requests.
        savedRequests.push(cursor.value)
        cursor.continue()
      }
      else {
        for (let savedRequest of savedRequests) {
          let requestUrl = savedRequest.url
          let payload = JSON.stringify(savedRequest.payload)
          let method = savedRequest.method
          let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
          fetch(requestUrl, {
            headers: headers,
            method: method,
            body: payload
          }).then(function (response) {
            console.log('SyncSend to Server success with response:', response)
            if (response.ok) {
              // If sending the POST request was successful, then
              // remove it from the IndexedDB.
              deletePostRequests(savedRequest.id);
            }
          }).catch(function (error) {
            console.error('SyncSend to Server failed:', error);
            throw error;
          })
        }
      }
    }
  }
}


// Call Install Event
self.addEventListener('install', e => {
  self.skipWaiting();
  console.log('Service Worker: Installed');
  // always cache offline page and index page
  let offlineRequest = new Request('/offline');
  e.waitUntil(
    fetch(offlineRequest).then(function (response) {
      return caches.open(cacheName).then(function (cache) {
        return cache.put(offlineRequest, response);
      });
    })
  );
  let indexRequest = new Request('/');
  e.waitUntil(
    fetch(indexRequest).then(function (response) {
      return caches.open(cacheName).then(function (cache) {
        return cache.put(indexRequest, response);
      });
    })
  );
});

// Call Activate Event
self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  // Create Index DB
  e.waitUntil(createIndexDB());
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
    let faster_fail = new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('waited 3s and fail faster')), 3000);
    });
    e.respondWith(
      Promise.race([faster_fail, fetch(e.request)])
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
        .catch(() => caches.match(e.request)
          .then(res => {
            if (res.status < 400) {
              return res;
            }
            else {
              // redirect to offline
              return caches.open(cacheName).then(cache => {
                return cache.match('/offline');
              });
            }
          })
          .catch(() => {
            // redirect to offline
            return caches.open(cacheName).then(cache => {
              return cache.match('/offline');
            });
          }))
    );
  }
  else if (e.request.clone().method === 'POST') {
    console.log('Service Worker: Fetching -- POST');
    let faster_fail = new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('waited 3s and fail faster')), 3000);
    });
    e.respondWith(
      // attempt to send request normally
      Promise.race([faster_fail, fetch(e.request.clone())])
        .then(res => res)
        .catch(() => {
          // only save post requests in browser, if an error occurs
          savePostRequests(e.request.clone().url, form_data);
          // redirect to index
          return caches.open(cacheName).then(cache => {
            return cache.match('/offline');
          });
        }))
  }
});

// Capture message event
self.addEventListener('message', e => {
  console.log('form data', e.data)
  if (e.data.hasOwnProperty('form_data')) {
    // receives form data from post js upon submission
    form_data = e.data.form_data;
  }
});


self.addEventListener('sync', function (event) {
  console.log('now online')
  if (event.tag === 'sendFormData') {
    event.waitUntil(
      // Send our POST request to the server, now that the user is online
      sendPostToServer()
    )
  }
});