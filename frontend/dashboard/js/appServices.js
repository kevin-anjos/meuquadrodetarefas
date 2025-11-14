import * as uiController from './uiController.js';
import * as storage from './storage.js';

const token = localStorage.getItem('authToken');

if (!token) {
    window.location.replace('/');
};

const SERVER_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:8080'
    : 'https://meuquadrodetarefas.onrender.com';

const getUser = async () => {

    const response = await doRequest({ 
        endpoint: ``,
        method: "GET"
    });

    if (!response.ok) storage.removeToken();

    const user = await response.json();

    return user;

};

const updatePassword = async password => {

    const response = await doRequest({ 
        endpoint: `update/password`,
        method: "PUT",
        body: {
            password
        }
    });

    if (!response.ok) return uiController.printAlertMessage({ title: "Não foi possível atualizar a senha!" });

    storage.removeToken();

};

const updateUsername = async name => {

    const response = await doRequest({ 
        endpoint: `update/username`,
        method: "PUT",
        body: {
            name
        }
    });

    if (!response.ok) return uiController.printAlertMessage({ title: "Não foi possível atualizar o nome!" });

};


const updateUserProfileImage = async imagePath => {

    const response = await doRequest({ 
        endpoint: `update/profile-photo`,
        method: "PUT",
        body: {
            imagePath
        }
    });

    if (!response.ok) return uiController.printAlertMessage({ title: "Não foi possível atualizar a foto de perfil!" });

};

const deleteUser = async () => {

    const response = await doRequest({ 
        endpoint: ``,
        method: "DELETE"
    });

    if (!response.ok) return uiController.printAlertMessage({ title: "Não foi possível deletar a conta!" });

};

//Tarefas

const createTask = async ({ name, description, category }) => {

    const body = {};

    if (name.trim() !== "") body.name = name;

    if (description.trim() !== "") body.description = description;

    if (category["name"].trim() !== "") body.category = category;


    const response = await doRequest({ 
        endpoint: `tasks/create`,
        method: "POST",
        body
    });

    if (!response.ok) return uiController.printAlertMessage({ title: "Não foi possível criar a tarefa!" });

};

const editTask = async ({ taskID, name, description, category }) => {

    const body = {};

    if (name) body.name = name;

    if (description) body.description = description;

    if (category["name"].trim() !== "") body.category = category;

    const response = await doRequest({ 
        endpoint: `tasks/edit/${taskID}`,
        method: "PUT",
        body
    });

    if (!response.ok) return uiController.printAlertMessage({ title: "Não foi possível editar a tarefa!" });

};

const toggleDoneTask = async ({ taskID }) => {

    const response = await doRequest({ 
        endpoint: `tasks/toggle-done/${taskID}`,
        method: "GET"
    });

    if (!response.ok) return uiController.printAlertMessage({ title: "Não foi possível editar a tarefa!" });

};

const deleteTask = async ({ taskID }) => {

    const response = await doRequest({ 
        endpoint: `tasks/delete/${taskID}`,
        method: "DELETE"    
    });

    if (!response.ok) return uiController.printAlertMessage({ title: "Não foi possível deletar a  tarefa!" });

};

const deleteTasksList = async () => {
    
    const response = await doRequest({ 
        endpoint: `tasks`,
        method: "DELETE"
    });

    if (!response.ok) return uiController.printAlertMessage({ title: "Não foi possível deletar a lista de tarefas!" });

};

const doRequest = async ({ endpoint, method, body }) => {

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    };

    try {
        const response = await fetch(`${SERVER_URL}/users/${endpoint}`, options);

        return response;

    } catch(error) {
        console.error(error);

        return uiController.printAlertMessage({ title: "Não foi possível executar a ação!" });
    };
};

export {
    getUser, updatePassword, updateUsername, updateUserProfileImage, deleteUser, createTask, editTask, toggleDoneTask, deleteTask, deleteTasksList
};