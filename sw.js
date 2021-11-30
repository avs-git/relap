const CACHE = 'network-or-cache-v1';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE).then((cache) => cache.addAll([
                './main.js'
            ])
        ));
});

self.addEventListener('activate', (event) => {
    console.log('Активирован');
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((resp) => {
                console.log('!!!!! event.request', event.request);
                return resp || fetch(event.request)
                    .then((response) => {
                        return caches.open('v1').then((cache) => {
                            cache.put(event.request, response.clone());
                            return response;
                        });
                    });
            }))
    console.log('Происходит запрос на сервер', event);
});