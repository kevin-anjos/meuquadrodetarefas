//Importar modo do localStorage
import { setThemeInLocalStorage } from './storage.js';

//Importar arquivo de storage
import { darkModeIco, lightModeIco, darkModeDot } from './domElements.js';

//Alternar tema
export const toggleTheme = () => {
    document.body.classList.toggle('light-mode-active');
    darkModeDot.classList.toggle('dark-mode-animation-active');
    darkModeIco.classList.toggle('dark-mode-animation-active');
    lightModeIco.classList.toggle('light-mode-animation-active');

    document.body.classList.contains('light-mode-active') ?         setThemeInLocalStorage('light-mode') : setThemeInLocalStorage('dark-mode');
}