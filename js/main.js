let todos = [];

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
	// References
	const addTodoButton = document.querySelector('.add-todo__button');
	const addTodoField = document.querySelector('.add-todo__field');

	/* ***** Event Handlers ***** */
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
	// renderTodos(todo);
};

const renderTodos = function () {
	// References
	const todoList = document.querySelector('.todo-list');
	const todoCount = document.querySelector('.manage__items span');
	// Set todo count
	todoCount.innerHTML = todos.length;
	// Generate list items
	for (let i = 0; i < todos.length; i++) {
		todoList.append(generateTodoNode(todos[i]));
	}
};

const generateTodoNode = function (todo) {
	const isCompleted = todo.completed ? 'todo_completed' : '';

	const node = document.createElement('li');

	node.setAttribute('class', `todo ${isCompleted}`.trim());
	node.setAttribute('data-id', todo.id);

	node.innerHTML = `
		<button class="todo__check">
			<img class="todo__check-image" src="./images/icon-check.svg" alt="Checked" />
		</button>
		<span class="todo__content">${todo.content}</span>
		<input class="todo__delete" type="button" title="Delete" />
	`;

	return node;
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
