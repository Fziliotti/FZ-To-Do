// MUDANÇA DE TEMA
body = document.querySelector("body");
app = document.getElementById("app");

function mudarTema() {
	body.classList.toggle("tema-light");
	app.classList.toggle("text-dark");
}