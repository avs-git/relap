const CACHE = 'uid-cache-v1';

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
    console.log('Происходит запрос на сервер', event.request);
    console.log('!!!!!', event.request);

    event.respondWith(
        caches.match(event.request)
            .then((resp) => {
                console.log('!!!!! event.request', event.request);
                return resp || caches.open('uid-cache-v1').then((cache) => {
                            cache.put(event.request, response.clone());
                            return response;
                        });
                    })
            )});
