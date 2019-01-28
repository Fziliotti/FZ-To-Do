// MUDANÇA DE TEMA
body = document.querySelector("body");
app = document.getElementById("app");

const mudarTema = () => {
	var temaAtivado = localStorage.getItem('temaAtivo');
	if(temaAtivado == 'dark'){
		body.classList.add("tema-light");
		app.classList.add("text-dark");
		localStorage.setItem('temaAtivo', 'light');
	}else{
		body.classList.remove("tema-light");
		app.classList.remove("text-dark");
		localStorage.setItem('temaAtivo', 'dark');
	}
}


(function () { 
	var temaAtivo = localStorage.getItem('temaAtivo')  || 'dark';
	if(temaAtivo !== 'dark'){
		body.classList.add("tema-light");
		app.classList.add("text-dark");
	}
})();




