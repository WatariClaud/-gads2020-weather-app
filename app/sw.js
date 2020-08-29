const cacheName = 'v1';

const cacheAssets = [
    '../index.html',
    '../style.css',
    '../main.js'
]

self.addEventListener('install', (event) => {
    console.log('Service worker installed.');
    event.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            console.log('Service worker: Caching files');
            cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    )
});
self.addEventListener('activate', (event) => {
    console.log('');
    console.log('Service worker activated');
    // remove old caches
    event.waitUntil(
        caches.keys()
        .then(
            cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        if(cache !== cacheName) {
                            console.log('Clearing old cache');
                            return caches.delete(cache);
                        }
                    })
                )
            }
        )
    )
})
self.addEventListener('fetch', function (event) {
    // log all the network requests trmrg;lhtrp
    console.log(event.request.url);
    console.log('Fetching cache...');
    event.respondWith(
        fetch(event.request)
        .catch(() => caches.match(event.request))
    )
});