const staticCacheName = 'todo-11';

const filesToCache = [
    "/",
    "/css/main.css",
    "/css/bootstrap4.css",
    "/css/sweetalert.css",
    "/js/toDo.js",
    "/js/cronometro.js",
    "/js/sweetalert2.js",
    '/offline/index.html'
]

// Cache on install
this.addEventListener("install", () => {
    this.skipWaiting();
    console.log("Registrando service Worker");

});


// Limpa o cache depois de instalar um novo service worker
this.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                .filter(cacheName => (cacheName.startsWith('todo-')))
                .filter(cacheName => (cacheName !== staticCacheName))
                .map(cacheName => caches.delete(cacheName))
            );
        })
    );
});


// Serve from Cache
this.addEventListener("fetch", function (event) {
    let pedido = event.request

    let promiseResposta = caches.match(pedido)
        .then(respostaCache => {
            let resposta = respostaCache ? respostaCache : fetch(pedido)
            return resposta
        }).catch(() => {
            return caches.match('/offline/index.html');
        })

    event.respondWith(promiseResposta)
})
