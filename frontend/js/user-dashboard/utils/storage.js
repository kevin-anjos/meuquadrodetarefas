//Importar arquivo de handler de tema
import { toggleTheme } from '../ui/themeColorHandler.js';

//ID do usuário que vem nos parâmetros da URL
const userID = new URLSearchParams(window.location.search).get('i');


//Colocar a lista de Tasks no Local Storage
export const setTasksList = async list => {
    try {
        await fetch(`https://www.meuquadrodetarefas.onrender.com/tasks/${userID}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tasksList: JSON.stringify(list)
            })  
        })
    } catch(error) {
        console.error(error);
    } 
};



/*
//Apagar os parâmetros da URL
const urlObj = new URL(window.location.href);
urlObj.search = '';
window.history.replaceState({}, "", String(urlObj));
*/ 

//Pegar a lista de tarefas
export const getTasksList = async () => {
    try {
        const response = await fetch(`https://www.meuquadrodetarefas.onrender.com/tasks/${userID}`);

        const stringfiedTasksList = await response.json();

        if (stringfiedTasksList === "empty") {
            return [];
        } else {
            return JSON.parse(stringfiedTasksList);
        }
    } catch (error) {
        console.log(error);
    }
};

//Pegar nome do usuário
export const getUsername = async () => {
    try {
        const response = await fetch(`https://www.meuquadrodetarefas.onrender.com/users/${userID}`);

        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

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