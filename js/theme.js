const main = function () {
	// References
	const themeSwitch = document.getElementById('theme-switch');
	const html = document.documentElement;
	const themeColor = document.querySelector("[name='theme-color'");
	// Current theme
	let currentTheme = getTheme();
	// Constants
	const defaultTheme = 'light';
	const transitionSetDelay = 300;
	const bgLight = 'hsl(236, 33%, 92%)';
	const bgDark = 'hsl(235, 21%, 11%)';

	// Check if theme value is set
	if (!currentTheme) {
		setTheme(defaultTheme);
		currentTheme = defaultTheme;
	}

	// Add class for the first time
	html.classList.add(currentTheme);
	// Set meta 'theme-color'
	themeColor.content = currentTheme === defaultTheme ? bgLight : bgDark;

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
			// Change meta 'theme-color'
			themeColor.content = bgLight;
		} else {
			html.classList.remove('light');
			html.classList.add('dark');
			setTheme('dark');
			// Change meta 'theme-color'
			themeColor.content = bgDark;
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
