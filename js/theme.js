const main = function () {
	// References
	const themeSwitch = document.getElementById('theme-switch');
	const html = document.documentElement;
	// Current theme
	let currentTheme = getTheme();
	// Constants
	const defaultTheme = 'light';
	const transitionSetDelay = 300;

	// Check if theme value is set
	if (!currentTheme) {
		setTheme(defaultTheme);
		currentTheme = defaultTheme;
	}

	// Add class for the first time
	html.classList.add(currentTheme);

	// Runs only once
	setTimeout(function () {
		html.classList.add('transition');
	}, transitionSetDelay);

	// Theme switching on click
	themeSwitch.addEventListener('click', function () {
		if (html.classList.contains('dark')) {
			html.classList.remove('dark');
			html.classList.add('light');
			setTheme('light');
		} else {
			html.classList.remove('light');
			html.classList.add('dark');
			setTheme('dark');
		}
	});
};

const setTheme = function (theme) {
	localStorage.setItem('theme', theme);
};

const getTheme = function () {
	return localStorage.getItem('theme');
};

// Function `main` will be executed after the content load ends
document.addEventListener('DOMContentLoaded', main);
