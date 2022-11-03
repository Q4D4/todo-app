let todos = [];
// References
const addTodoButton = document.querySelector('.add-todo__button');
const addTodoField = document.querySelector('.add-todo__field');
const todoList = document.querySelector('.todo-list');
const todoCount = document.querySelector('.manage__items span');

const main = function () {
	getTodos();

	// Activate Adding Features
	activateAddTodo();
	// Render list for the first time
	if (todos.length !== 0) {
		renderTodos();
	}
};

const activateAddTodo = function () {
	// If the user clicks 'add' button
	addTodoButton.addEventListener('click', function () {
		addTodoHandler(addTodoField);
	});
	// If the user presses 'Enter' key
	addTodoField.addEventListener('keypress', function (event) {
		if (event.key === 'Enter') {
			addTodoHandler(addTodoField);
		}
	});
};

const addTodoHandler = function (field) {
	const fieldValue = field.value;
	if (fieldValue && fieldValue.trim() !== '') {
		addTodo(fieldValue);
		field.value = '';
	}
	field.focus();
};

const addTodo = function (content) {
	const todo = {
		id: Date.now(),
		completed: false,
		content,
	};

	todos.push(todo);
	setTodos(todos);
	// Render new todo
	todoList.insertBefore(generateTodoNode(todo), todoList.firstChild);
	// Set todo count
	updateTodoCount();
};

const renderTodos = function () {
	// Set todo count
	updateTodoCount();
	// Generate list items
	for (let i = 0; i < todos.length; i++) {
		todoList.insertBefore(generateTodoNode(todos[i]), todoList.firstChild);
	}
};

const generateTodoNode = function (todo) {
	const isCompleted = todo.completed ? 'todo_completed' : '';

	const node = document.createElement('li');

	node.setAttribute('class', `todo ${isCompleted}`.trim());
	node.setAttribute('data-id', todo.id);

	node.innerHTML = `
		<button class="todo__check">
			<img class="todo__check-image" src="./images/icon-check.svg" alt="Check" />
		</button>
		<span class="todo__content">${todo.content}</span>
		<input class="todo__delete" type="button" title="Delete" />
	`;

	// node.firstElementChild.addEventListener('click', handleCheck);

	return node;
};

// const handleCheck = (event) => {
// 	const parent = event.target.parentElement;
// 	const id = parent.getAttribute('data-id');
// 	if (parent.classList.contains('todo_completed')) {
// 		parent.classList.remove('todo_completed');
// 		todos.filter((obj) => obj.id === id).completed = false;
// 	} else {
// 		parent.classList.add('todo_completed');
// 		todos.filter((obj) => obj.id === id).completed = true;
// 	}
// 	setTodos(todos);
// };

const updateTodoCount = function () {
	todoCount.innerHTML = todos.filter((item) => !item.completed).length;
};

const getTodos = function () {
	let todosState = JSON.parse(localStorage.getItem('todos'));
	// Check if value is set
	if (!todosState) {
		setTodos(todos);
	} else {
		todos = todosState;
	}
};

const setTodos = function (todos) {
	localStorage.setItem('todos', JSON.stringify(todos));
};
