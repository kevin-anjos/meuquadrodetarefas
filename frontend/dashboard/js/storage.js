import * as uiController from "./uiController.js";

const handleTheme = () => {
    if (localStorage.getItem('theme-mode') != null) {
        const themeMode = JSON.parse(localStorage.getItem('theme-mode'));
        
        if (themeMode === 'light-mode') {
            uiController.toggleTheme();
        };
    };
};

//Colocar o tema atual no LocalStorage
const setThemeInLocalStorage = () => {
    if (document.body.classList.contains('light-mode-active')) {
        localStorage.setItem('theme-mode', JSON.stringify('light-mode'));
    } else {
        localStorage.setItem('theme-mode', JSON.stringify('dark-mode'));
    };
};

const checkToken = () => {
    setInterval(() => {
        const token = getToken();
        if (!token || token.length === 0) removeToken();
    },10000);
};

const removeToken = () => {
    localStorage.removeItem('authToken');
    window.location.replace('/');
}; 

const getToken = () => localStorage.getItem('authToken');


export {
    handleTheme, setThemeInLocalStorage, checkToken, removeToken, getToken
}