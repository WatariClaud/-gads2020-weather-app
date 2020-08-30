const cacheName = 'v2';

self.addEventListener('install', (event) => {
});

self.addEventListener('activate', (event) => {
    console.log('');
    // remove old caches
    event.waitUntil(
        caches.keys()
        .then(
            cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        if(cache !== cacheName) {
                            return caches.delete(cache);
                        }
                    })
                )
            }
        )
    )
})
self.addEventListener('fetch', (event) => {
    // log all the network requests trmrg;lhtrp
    event.respondWith(
        fetch(event.request)
        .then(res => {
            const resC = res.clone();
            caches.open(cacheName)
            .then((cache) => {
                cache.put(event.request, resC);
            });
            return res;
        })
        .catch((err) => caches.match(event.request).then((res) => res))
    );
});