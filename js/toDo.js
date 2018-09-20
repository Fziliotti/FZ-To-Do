var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var btnElement = document.querySelector('#app button');

var todos = JSON.parse(localStorage.getItem('lista_tarefas')) || [];


function renderTodos(){
	listElement.innerHTML = ''; //limpa a lista antes de renderizar
	for (todo of todos){
		var todoElement = document.createElement('li');
		todoElement.setAttribute('class', "todo-item my-4 list-group-item bg-info d-flex justify-content-between")
		var todoText = document.createTextNode(todo);

		var linkElement = document.createElement('button');
		linkElement.setAttribute('class', 'btn btn-danger ml-2 float-right')

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
	}else{
		swal({
			position: 'top-end',
			type: 'error',
			title: 'Digite alguma coisa no campo de texto',
			showConfirmButton: false,
			timer: 1500
		  })
		  todoText.focus();
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
	const swalWithBootstrapButtons = swal.mixin({
		confirmButtonClass: 'btn btn-success',
		cancelButtonClass: 'btn btn-danger',
		buttonsStyling: false,
	  })
	  
	  swalWithBootstrapButtons({
		title: 'Are you sure?',
		text: "You won't be able to revert this!",
		type: 'warning',
		showCancelButton: true,
		confirmButtonText: 'Yes, delete it!',
		cancelButtonText: 'No, cancel!',
		reverseButtons: true
	  }).then((result) => {
		if (result.value) {
		  swalWithBootstrapButtons(
			'Deleted!',
			'Your file has been deleted.',
			'success'
		  )
		  todos.splice(pos,1);
		  renderTodos();
		  saveToStorage();
		 
		} else if (
		  // Read more about handling dismissals
		  result.dismiss === swal.DismissReason.cancel
		) {
		  swalWithBootstrapButtons(
			'Cancelled',
			'Your imaginary file is safe :)',
			'error'
		  )
		}
	  })

	
}

//  Só guarda chave e valor no formato string, sem relacionamento
function saveToStorage(){
	localStorage.setItem('lista_tarefas', JSON.stringify(todos));
}