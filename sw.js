const CACHE = 'uid-cache-v4';

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

    const { url } = event.request;

    const uid = new URL(url).searchParams.get('uid');

    if (!uid) {
        event.respondWith(fetch(event.request));
        return;
    }

    console.log('!!!!! uid', uid);

    event.respondWith(
        caches.match(event.request).then((resp) => {
            console.log("!!!!! event.request", resp);
            return (
                resp || caches.open(CACHE).then((cache) => {
                                    const body = new FormData();
                                    body.append('uid', uid)
                                    const response = new Response(body, {status: 200, ok: true});
                                    console.log('!!!!! response', response);
                                    cache.put(event.request, response.clone());
                                    return response;
                                })
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
