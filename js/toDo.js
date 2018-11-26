var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var btnElement = document.querySelector('#app button');

var todos = JSON.parse(localStorage.getItem('lista_tarefas')) || [];


function saveToStorage() {
	localStorage.setItem('lista_tarefas', JSON.stringify(todos));
}


function renderTodos() {
	listElement.innerHTML = ''; //limpa a lista antes de renderizar
	for (todo of todos) {
		var todoElement = document.createElement('li');
		todoElement.setAttribute('class', "todo-item my-4 list-group-item")
		todoElement.setAttribute('ondblclick', 'teste()');
		var todoText = document.createTextNode(todo);
		var linkElement = document.createElement('button');
		linkElement.setAttribute('class', 'btn btn-danger ml-2 float-right')

		var linkText = document.createTextNode('DEL');
		var pos = todos.indexOf(todo);
		linkElement.setAttribute('onclick', 'deleteTodo(' + pos + ')');

		// CRIANDO O RELACIONAMENTO DOS ELEMENTOS
		linkElement.appendChild(linkText);
		todoElement.appendChild(todoText);
		todoElement.appendChild(linkElement);
		listElement.appendChild(todoElement);
	}
}



function addTodo() {
	var todoText = inputElement.value;
	if (todoText.trim()) {
		swal({
			position: 'top-end',
			type: 'success',
			title: 'Inserido com sucesso!',
			showConfirmButton: false,
			timer: 1000
		})
		todos.push(todoText);
		inputElement.value = '';
		renderTodos();
		saveToStorage();
	} else {
		swal({
			position: 'top-end',
			type: 'error',
			title: 'Digite alguma coisa no campo de texto',
			showConfirmButton: false,
			timer: 1000
		})
		todoText.focus();
	}
};


function deleteTodo(pos) {
	const swalWithBootstrapButtons = swal.mixin({
		confirmButtonClass: 'btn btn-success',
		cancelButtonClass: 'btn btn-danger',
		buttonsStyling: false,
	})

	swalWithBootstrapButtons({
		title: 'Tem certeza disso?',
		text: "Não poderá ser revertido depois!",
		type: 'warning',
		showCancelButton: true,
		confirmButtonText: 'Simm',
		cancelButtonText: 'Cancelar',
		reverseButtons: true
	}).then((result) => {
		if (result.value) {
			swalWithBootstrapButtons(
				'Deletado!',
				'Sua tarefa já era!',
				'success'
			)
			todos.splice(pos, 1);
			renderTodos();
			saveToStorage();

		} else if (
			// Read more about handling dismissals
			result.dismiss === swal.DismissReason.cancel
		) {
			swalWithBootstrapButtons(
				'Cancelado',
				'Sua tarefa tá sussa! :)',
				'error'
			)
		}
	})
}


function pomodoro(minutes) {
	let timerInterval
	swal({
		title: 'Pomodoro ' + minutes + ' minutos!',
		html: 'Eu irei desaparecer em <strong></strong> segundos.',
		timer: minutes * 60000,
		onOpen: () => {
			swal.showLoading()
			timerInterval = setInterval(() => {
				swal.getContent().querySelector('strong')
					.textContent = swal.getTimerLeft() / 1000
			}, 100)
		},
		onClose: () => {
			clearInterval(timerInterval)
		}
	}).then((result) => {
		if (
			// Read more about handling dismissals
			result.dismiss === swal.DismissReason.timer
		) {
			swal({
				position: 'top-end',
				type: 'success',
				title: 'Pomodoro completado',
				showConfirmButton: false,
				timer: 1000
			})
		}
	})
}



async function teste() {
	// inputOptions can be an object or Promise
	const inputOptions = new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				'25': 'Pomodoro 25min',
				'50': 'Pomodoro 50min'
			})
		}, 2000)
	})
	const {value: min} = await swal({
		title: 'Escolha um pomodoro',
		input: 'radio',
		inputOptions: inputOptions,
		inputValidator: (value) => {
			return !value && 'Escolha um dos dois pomodoros!'
		}
	})

	if (min) {
		pomodoro(min) 
	}
}

// LISTENERS
inputElement.addEventListener('keyup', function (e) {
	var key = e.which || e.keyCode;
	if (key == 13) {
		addTodo();
	}
});

btnElement.onclick = addTodo;

// MUDANÇA DE TEMA
body = document.querySelector("body");
app = document.getElementById("app");

function mudarTema() {
	body.classList.toggle("tema-light");
	app.classList.toggle("text-dark");
}

// Função anonima
(() => {
	renderTodos();
})();