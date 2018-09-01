var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var btnElement = document.querySelector('#app button');

var todos = JSON.parse(localStorage.getItem('lista_tarefas')) || [];


function renderTodos(){
	listElement.innerHTML = ''; //limpa a lista antes de renderizar
	for (todo of todos){
		var todoElement = document.createElement('li');
		todoElement.setAttribute('class', "text-24 my-4")
		var todoText = document.createTextNode(todo);

		var linkElement = document.createElement('a');
		linkElement.setAttribute('href', '#');
		linkElement.setAttribute('class', 'btn btn-danger ml-2')

		var linkText = document.createTextNode('DEL');
		var pos = todos.indexOf(todo);
		linkElement.setAttribute('onclick', 'deleteTodo('+ pos+')');

		// CRIANDO O RELACIONAMENTO DOS ELEMENTOS
		linkElement.appendChild(linkText);
		todoElement.appendChild(todoText);
		todoElement.appendChild(linkElement);
		listElement.appendChild(todoElement);
	}
}
renderTodos(); // RENDERIZAR PELOMENOS UMA VEZ

function addTodo(){
	var todoText = inputElement.value;
	if (todoText){
		todos.push(todoText);
		inputElement.value = '';
		renderTodos();
		saveToStorage();
	}else{
		alert("Digite alguma coisa no input!");
	}
};


inputElement.addEventListener('keyup', function(e){
  var key = e.which || e.keyCode;
  if (key == 13) { 
  	addTodo();
  }
});

btnElement.onclick = addTodo;

function deleteTodo(pos){
	todos.splice(pos,1);
	renderTodos();
	saveToStorage();
}

//  Só guarda chave e valor no formato string, sem relacionamento
function saveToStorage(){
	localStorage.setItem('lista_tarefas', JSON.stringify(todos));
}