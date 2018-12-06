var versao = 2

var arquivos = [
"/",
"css/main.css",
"css/bootstrap4.css",
"css/sweetalert.css",
"https://fonts.googleapis.com/css?family=Ubuntu+Condensed",
"js/toDo.js",
"js/cronometro.js",
"js/sweetalert2.js"
]

self.addEventListener("install", function(){
    console.log("Instalou service worker!")
})

self.addEventListener("activate", function(){
    caches.open("todo-arquivos-" + versao).then(cache => {
        cache.addAll(arquivos)
            .then(function(){
                caches.delete("todo-arquivos-" + (versao - 1 ))   
                caches.delete("todo-arquivos")   
            })
        
    })
})


self.addEventListener("fetch", function(event){
    let pedido = event.request
    let promiseResposta = caches.match(pedido).then(respostaCache => {
        let resposta = respostaCache ? respostaCache : fetch(pedido)
        return resposta
    })
    event.respondWith(promiseResposta)
})

