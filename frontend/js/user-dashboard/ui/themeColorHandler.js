//Importar modo do localStorage
import { setThemeInLocalStorage } from '../utils/storage.js';

//Importar arquivo de storage
import { darkModeIco, lightModeIco, darkModeDot, darkModeBtn, lightModeBtn, toggleThemeIco, toggleThemeParagraph } from '../domElements.js';


//Alternar tema
export const toggleTheme = () => {
    document.body.classList.toggle('light-mode-active');
    darkModeDot.classList.toggle('dark-mode-animation-active');

    darkModeIco.classList.toggle('dark-mode-animation-active');
    lightModeIco.classList.toggle('light-mode-animation-active');

    darkModeBtn.classList.toggle('line-under-dark-text-animation');
    lightModeBtn.classList.toggle('line-under-light-text-animation');
    
    if (document.body.classList.contains('light-mode-active')) {
        setThemeInLocalStorage('light-mode');
        toggleThemeParagraph.textContent = "Modo escuro";
        toggleThemeIco.classList.remove('bi-sun-fill');
        toggleThemeIco.classList.add('bi-moon-fill');
    } else {
        setThemeInLocalStorage('dark-mode');
        toggleThemeParagraph.textContent = "Modo claro";
        toggleThemeIco.classList.remove('bi-moon-fill');
        toggleThemeIco.classList.add('bi-sun-fill');
    }

};