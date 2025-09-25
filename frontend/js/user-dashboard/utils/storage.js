//Importar arquivo de handler de tema
import { toggleTheme } from '../ui/themeColorHandler.js';

window.addEventListener('load', () => {
    if (localStorage.getItem('theme-mode') != null) {
        const themeMode = JSON.parse(localStorage.getItem('theme-mode'));
        
        if (themeMode === 'light-mode') {
            toggleTheme();
        };
    };
});

//Colocar o tema atual no LocalStorage
export const setThemeInLocalStorage = theme => {
    localStorage.setItem('theme-mode', JSON.stringify(theme));
};