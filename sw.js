var versao = 9

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
    caches.open("pwa-arquivos-" + versao).then(cache => {
        cache.addAll(arquivos)
            .then(function(){
                caches.delete("pwa-arquivos-" + (versao - 1 ))   
                caches.delete("pwa-arquivos")   
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

