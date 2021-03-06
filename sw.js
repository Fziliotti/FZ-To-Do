var versao = 20
var arquivos = [
    "index.html",
    "./css/fontawesome.css",
    "css/main.css",
    "css/bootstrap4.css",
    "css/sweetalert.css",
    "js/sweetalert2.js",
    "js/cronometro.js",
    "js/dragndrop.js",
    "js/toDo.js",
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
    )
})


self.addEventListener('notificationclose', function(e) {
    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;
    console.log('Closed notification: ' + primaryKey);
});


self.addEventListener('notificationclick', function(e) {
    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;
    var action = e.action;

    if (action === 'close') {
        notification.close();
    } else {
        clients.openWindow('http://www.example.com');
        notification.close();
    }
});