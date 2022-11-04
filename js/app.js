// References
const addTodoButton = document.querySelector('.add-todo__button');
const addTodoField = document.querySelector('.add-todo__field');
const todoList = document.querySelector('.todo-list');
const manage = document.querySelector('.manage');
const todoCount = document.querySelector('.manage__items span');
const allButton = document.querySelector('.manage__filter-option--all');
const activeButton = document.querySelector('.manage__filter-option--active');
const completedButton = document.querySelector('.manage__filter-option--completed');
const clearCompleted = document.querySelector('.manage__clear-completed');
// Constants
const todos = JSON.parse(localStorage.getItem('todos')) || [];
const todoClassName = 'todo';
const todoHiddenClassName = 'todo_hidden';
const todoCompletedClassName = 'todo_completed';
const activeClassName = 'manage__filter-option_active';

/*
  TODO: MAKE THE CODE PRETTIER!!
*/

// Entry point
const main = function () {
	if (todos.length !== 0) {
		// Generate initial (from localStorage) items
		for (let i = 0; i < todos.length; i++) {
			todoList.insertBefore(generateTodoNode(todos[i]), todoList.firstChild);
		}
		// Set todo count
		updateTodoCount();
	} else {
		// Hide the manage bar
		manage.classList.add('manage_hidden');
	}
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
	// Show manage bar if hidden
	if (manage.classList.contains('manage_hidden')) {
		manage.classList.remove('manage_hidden');
	}
	// Remove filter
	handleFilterAll();
	// Set todo count
	updateTodoCount();
};

const generateTodoNode = function (todo) {
	const isCompleted = todo.completed ? 'todo_completed' : '';
	const objIndex = todos.findIndex((obj) => obj.id === todo.id);

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
	// Completion / Uncompletion
	node.querySelector('.todo__check').addEventListener('click', function () {
		if (node.classList.contains('todo_completed')) {
			node.classList.remove('todo_completed');
			todos[objIndex].completed = false;
		} else {
			node.classList.add('todo_completed');
			todos[objIndex].completed = true;
		}
		setTodos(todos);
		// Remove filter
		handleFilterAll();
		// Update todo count
		updateTodoCount();
	});
	// Deletion
	node.querySelector('.todo__delete').addEventListener('click', function () {
		node.remove();
		if (objIndex > -1) {
			todos.splice(objIndex, 1);
		}
		setTodos(todos);
		// Update todo count
		updateTodoCount();
	});

	return node;
};

// When adding new todo
const addTodoHandler = function (field) {
	const fieldValue = field.value;
	if (fieldValue && fieldValue.trim() !== '') {
		addTodo(fieldValue);
		field.value = '';
	}
	field.focus();
};
// Update current active todos count
const updateTodoCount = function () {
	todoCount.innerHTML = todos.filter((item) => !item.completed).length;
};
// Show all todo
const handleFilterAll = function () {
	if (!allButton.classList.contains(activeClassName)) {
		const activeFilterButton = document.querySelector(`.${activeClassName}`);
		activeFilterButton.classList.remove(activeClassName);
		// Make all todo item visible
		showAllTodos();
		// Highlight button
		allButton.classList.add(activeClassName);
	}
};
// Show active todos
const handleFilterActive = function () {
	if (!activeButton.classList.contains(activeClassName)) {
		const activeFilterButton = document.querySelector(`.${activeClassName}`);
		activeFilterButton.classList.remove(activeClassName);
		// Make all todo item visible
		showAllTodos();
		// Hide only completed items
		const completedTodos = document.querySelectorAll(`.${todoCompletedClassName}`);
		for (let i = 0; i < completedTodos.length; i++) {
			completedTodos[i].classList.add(todoHiddenClassName);
		}
		// Highlight button
		activeButton.classList.add(activeClassName);
	}
};
// Show non-active todos
const handleFilterCompleted = function () {
	if (!completedButton.classList.contains(activeClassName)) {
		const activeFilterButton = document.querySelector(`.${activeClassName}`);
		activeFilterButton.classList.remove(activeClassName);
		// Make all todo item visible
		showAllTodos();
		// Show only completed items
		const nonCompletedTodos = document.querySelectorAll(
			`.${todoClassName}:not(.${todoCompletedClassName})`
		);
		for (let i = 0; i < nonCompletedTodos.length; i++) {
			nonCompletedTodos[i].classList.add(todoHiddenClassName);
		}
		// Highlight button
		completedButton.classList.add(activeClassName);
	}
};
// remove hiding className from every todo list element
const showAllTodos = function () {
	const hiddenTodos = document.querySelectorAll(`.${todoHiddenClassName}`);
	for (let i = 0; i < hiddenTodos.length; i++) {
		hiddenTodos[i].classList.remove(todoHiddenClassName);
	}
};
// Clear event handler
const clearCompletedTodos = function () {
	const completedTodos = document.querySelectorAll('.todo_completed');
	for (let i = 0; i < completedTodos.length; i++) {
		completedTodos[i].remove();
	}

	const nonCompletedTodos = todos.filter((todo) => todo.completed !== true);

	setTodos(nonCompletedTodos);
	// TODO: REMOVE THIS !!!
	// Reload page
	location.reload();
};
// Change localStorage (Global) state
const setTodos = function (todosData) {
	localStorage.setItem('todos', JSON.stringify(todosData));
	// Hide manage bar if no todos left
	if (todosData.length === 0) {
		manage.classList.add('manage_hidden');
	}
};

// Add event listeners
addTodoButton.addEventListener('click', function () {
	addTodoHandler(addTodoField);
});
addTodoField.addEventListener('keypress', function (event) {
	if (event.key === 'Enter') {
		addTodoHandler(event.target);
	}
});

clearCompleted.addEventListener('click', clearCompletedTodos);

allButton.addEventListener('click', handleFilterAll);
activeButton.addEventListener('click', handleFilterActive);
completedButton.addEventListener('click', handleFilterCompleted);

// Run MAIN Function
main();
