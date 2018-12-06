var versao = 17
var arquivos = [
    "css/main.css",
    "css/bootstrap4.css",
    "css/sweetalert.css",
    "js/toDo.js",
    "js/cronometro.js",
    "js/sweetalert2.js",
    "offline/index.html"
]

// Intalação do service worker
self.addEventListener("install", function () {
    this.skipWaiting();
    console.log("Instalou service worker!")
})

// Ativação e callback que irá excluir as versões anteriores do service worker
self.addEventListener("activate", function () {
    caches.open("todo-arquivos-" + versao).then(cache => {
        cache.addAll(arquivos)
            .then(function () {
                caches.delete("todo-arquivos-" + (versao - 1))
                caches.delete("todo-arquivos")
            })

    })
})

// fetch que irá tratar as chamadas nos pedidos e verificar se está em cache
self.addEventListener("fetch", function (event) {

    let pedido = event.request

    event.respondWith(
        caches.match(pedido)
        .then(respostaCache => {
            let resposta = respostaCache ? respostaCache : fetch(pedido)
            return resposta
        })
        .catch(() => {
            return caches.match('/offline/index.html');
        })
    )
})