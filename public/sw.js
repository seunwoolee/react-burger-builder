const CACHE_NAME = 'pwa-task-manager';
const urlsToCache = [
    '/'
];

// Install a service worker
// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', event => {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Cache and return requests
// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                    // Cache hit - return response
                    if (response) {
                        return response;
                    }
                    return fetch(event.request);
                }
            )
    );
});

// Update a service worker
// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', event => {
    var cacheWhitelist = ['pwa-task-manager'];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('notificationclick', event => {

    let notification = event.notification;
    let action = event.action;


    if (action === 'confirm'){
        console.log('confirm was chosone');
        notification.close();
    } else {
        console.log(action);
    }
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('push', event => {
    const data = event.data.json();
    console.log('New notification', data);
    const options = {
        body: data.body,
    };
    event.waitUntil(
        // eslint-disable-next-line no-restricted-globals
        self.registration.showNotification(data.title, options)
    );
});
