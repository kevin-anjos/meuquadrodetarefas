//Importar arquivo de handler de tema

import { toggleTheme } from './themeColorHandler.js'

//Colocar a lista de Tasks no Local Storage
export const setTaskListInLocalStorage = list => {
    localStorage.setItem('tasks-list', JSON.stringify(list));
}

//Pegar a lista de tarefas
export const getTasksList = () => {
    let tasksList = [];
    if (localStorage.getItem('tasks-list') != null) {
        tasksList = JSON.parse(localStorage.getItem('tasks-list'));
    }

    return tasksList;
}

//Alternar o tema ao carregar da página
window.addEventListener('load', () => {
    if (localStorage.getItem('theme-mode') != null) {
        const themeMode = JSON.parse(localStorage.getItem('theme-mode'));
        
        if (themeMode === 'light-mode') {
            toggleTheme();
        }
    }
})

//Colocar o tema atual no LocalStorage
export const setThemeInLocalStorage = theme => {
    localStorage.setItem('theme-mode', JSON.stringify(theme));
}