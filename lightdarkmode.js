// SELECTORS
let darkMode = localStorage.getItem('darkMode');
const darkModeToggle = document.querySelector('.dark-mode-toggle');

const colorPicker = document.querySelector('.color-picker');
const light = '#bfb9f8'; // default light theme
const dark = '#818b50'; // default dark theme


// check if user's preference is already set
if (darkMode === 'enabled') {
    enableDarkMode();
    setTheme(dark);
} else {
    setTheme(light);
}



// EVENT LISTENERS
darkModeToggle.addEventListener('click', () => {
    darkMode = localStorage.getItem('darkMode');
    // check status of darkmode
    // if not enabled
    if (darkMode !== 'enabled') {
        enableDarkMode();
        setTheme(dark);
    }
    // if enabled
    else {
        disableDarkMode();
        setTheme(light);
    }
});

colorPicker.addEventListener('input', changeColor);



// FUNCTIONS
function enableDarkMode() {
    // add darkmode class to the document body
    document.body.classList.add('darkmode');
    // set darkmode status to ENABLED
    localStorage.setItem('darkMode', 'enabled');
}

function disableDarkMode() {
    // remove darkmode class from the document body
    document.body.classList.remove('darkmode');
    // set darkmode status to DISABLED
    localStorage.setItem('darkMode', 'disabled');
}

function setTheme(theme) {
    // set theme default btn colors
    document.documentElement.style.setProperty('--clr-btn', theme);
    // set color picker preview to match
    colorPicker.value = theme;
}

function changeColor() {
    // this sets the :root variable value of --clr-btn to match what the color picker input
    document.documentElement.style.setProperty('--clr-btn', colorPicker.value);
}