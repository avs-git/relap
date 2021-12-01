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

self.addEventListener("fetch", (event) => {
    console.log("Происходит запрос на сервер");
    console.log("!!!!!", event.request);

    event.respondWith(
        caches.match(event.request).then((resp) => {
            console.log("!!!!! event.request", resp);
            return (
                resp || fetch(event.request)
            );
        })
    );
    //
    // event.respondWith(
    //     caches.match(event.request).then((resp) => {
    //         console.log("!!!!! event.request", resp);
    //         return (
    //             resp ||
    //             caches.open("uid-cache-v1").then((cache) => {
    //                 const response = new Response({ uid: "123" });
    //                 cache.put(event.request, response.clone());
    //                 return response;
    //             })
    //         );
    //     })
    // );
});
