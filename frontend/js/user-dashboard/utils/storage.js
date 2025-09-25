//Importar arquivo de handler de tema
import { toggleTheme } from '../ui/themeColorHandler.js';

//ID do usuário que vem nos parâmetros da URL
const userID = new URLSearchParams(window.location.search).get('i');

const SERVER_URL = "https://meuquadrodetarefas.onrender.com";

//Colocar a lista de Tasks no Local Storage
export const setTasksList = async list => {
    try {
        await fetch(`${SERVER_URL}/tasks/${userID}`, {
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

//Pegar a lista de tarefas
export const getTasksList = async () => {
    try {
        const response = await fetch(`${SERVER_URL}/tasks/${userID}`);

        if (!response.ok) {
            window.location.replace('https://meuquadrodetarefas.onrender.com');
        }

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
        const response = await fetch(`${SERVER_URL}/users/${userID}`);

        const username = response.json();

        return username;
    } catch (error) {
        console.error(error);
    }
};

//Deletar usuário
export const deleteUser = async () => {
    try {
        const response = await fetch(`${SERVER_URL}/users/${userID}`, {
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