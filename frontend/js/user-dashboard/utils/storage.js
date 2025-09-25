//Importar arquivo de handler de tema
import { toggleTheme } from '../ui/themeColorHandler.js';

//Importar arquivo de esconder tela de loading
import { hideLoadingScreen } from '../ui/hideLoadingAnimationHandler.js';

//ID do usuário que vem nos parâmetros da URL
const userID = new URLSearchParams(window.location.search).get('i');


//Colocar a lista de Tasks no Local Storage
export const setTasksList = async list => {
    try {
        await fetch(`http://127.0.0.1:8080/tasks/${userID}`, {
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

//https://meuquadrodetarefas.onrender.com/

/*
//Apagar os parâmetros da URL
const urlObj = new URL(window.location.href);
urlObj.search = '';
window.history.replaceState({}, "", String(urlObj));
*/ 

//Pegar a lista de tarefas
export const getTasksList = async () => {
    try {
        const response = await fetch(`https://meuquadrodetarefas.onrender.com/tasks/${userID}`);

        if(!response.ok) {
            window.location.replace('https://meuquadrodetarefas.onrender.com');
        }

        hideLoadingScreen();

        const stringfiedTasksList = await response.json();

        if (stringfiedTasksList === "empty") {
            return [];
        } else {
            return JSON.parse(stringfiedTasksList);
        }
    } catch (error) {
        console.error(error);
        window.location.replace('https://meuquadrodetarefas.onrender.com');
    }
};

//Pegar nome do usuário
export const getUsername = async () => {
    try {
        const response = await fetch(`https://meuquadrodetarefas.onrender.com/users/${userID}`);

        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

//Deletar usuário
export const deleteUser = async () => {
    try {
        const response = await fetch(`https://meuquadrodetarefas.onrender.com/users/${userID}`, {
            method: "DELETE"
        });

        if (response.ok) {
            window.location.replace('https://meuquadrodetarefas.onrender.com');   
        } else {
            alert('Não foi possível deletar o usuário');
        }
    } catch(error) {
        console.error(error);
    } 
}

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