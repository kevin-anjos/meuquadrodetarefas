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
    try {
        const response = await fetch(`${SERVER_URL}/users`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            localStorage.removeItem("authToken");
            window.location.replace('/');
        }

        const { tasksList, username, profilePicture, role } = await response.json();

        return {
            tasksList: JSON.parse(tasksList),
            username,
            profilePicture, 
            role
        };
    } catch (error) {
        console.error(error);
        window.location.replace('/');
    }
};

//Editar senha do usuário
const updatePassword = async newPassword => {
    try {
        const response = await fetch(`${SERVER_URL}/users/update/password`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                password: newPassword
            }) 
        });

    
        if (!response.ok) return uiController.printAlertMessage({
            title: "Não foi possível atualizar a senha!",
            info: "Tente novamente mais tarde."
        });

        storage.removeToken();

    } catch (error) {
        console.error(error);
        return uiController.printAlertMessage({
            title: "Não foi possível atualizar a senha!",
            info: "Tente novamente mais tarde."
        });
    };
};

//Editar nome do usuário
const updateUsername = async newUsername => {

    try {
        const response = await fetch(`${SERVER_URL}/users/update/username`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: newUsername
            }) 
        });


        if (!response.ok) {
            return uiController.printAlertMessage({
            title: "Não foi possível atualizar o nome!",
            info: "Tente novamente mais tarde."
        });}


        return await response.json();
    
    } catch (error) {
        console.error(error);
        return uiController.printAlertMessage({
            title: "Não foi possível atualizar o nome!",
            info: "Tente novamente mais tarde."
        });
    };
};


const updateUserProfileImage = async imagePath => {
    try {
        const response = await fetch(`${SERVER_URL}/users/update/profile-photo`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                imagePath: imagePath
            }) 
        });

        if (!response.ok) return uiController.printAlertMessage({
            title: "Não foi possível atualizar a foto de perfil!",
            info: "Tente novamente mais tarde."
        });

        const imageURL = await response.json();
        
        return imageURL;
    
    } catch (error) {
        console.error(error);
        return uiController.printAlertMessage({
            title: "Não foi possível atualizar a foto de perfil!",
            info: "Tente novamente mais tarde."
        });
    };
};

const deleteUser = async () => {
    try {
        const response = await fetch(`${SERVER_URL}/users`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) return uiController.printAlertMessage({
            title: "Não foi possível deletar a conta!",
            info: "Tente novamente mais tarde."
        });

        localStorage.removeItem('authToken');
        window.location.replace('/');   

    } catch(error) {
        console.error(error);
        return uiController.printAlertMessage({
            title: "Não foi possível deletar a conta!",
            info: "Tente novamente mais tarde."
        });
    };
};

//Tarefas

const createTask = async ({ name, description }) => {
    try {
        const response = await fetch(`${SERVER_URL}/users/tasks/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                description
            })
        });

        
        if (!response.ok) return uiController.printAlertMessage({
            title: "Não foi possível deletar a tarefa!",
            info: "Tente novamente mais tarde."
        });

    } catch(error) {
        console.error(error);
        return uiController.printAlertMessage({
            title: "Não foi possível deletar a tarefa!",
            info: "Tente novamente mais tarde."
        });
    };
};

const editTask = async ({ taskID, name, description }) => {

    try {
        const response = await fetch(`${SERVER_URL}/users/tasks/edit/${taskID}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                description: description
            })
        });

        if (!response.ok) return uiController.printAlertMessage({
            title: "Não foi possível editar a tarefa!",
            info: "Tente novamente mais tarde."
        });

    } catch(error) {
        console.error(error);
        return uiController.printAlertMessage({
            title: "Não foi possível editar a tarefa!",
            info: "Tente novamente mais tarde."
        });
    };
};

const toggleDoneTask = async ({ taskID }) => {
    try {

        const response = await fetch(`${SERVER_URL}/users/tasks/toggle-done/${taskID}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (!response.ok) return uiController.printAlertMessage({
            title: "Não foi possível editar a tarefa!",
            info: "Tente novamente mais tarde."
        });

    } catch(error) {
        console.error(error);
        if (!response.ok) return uiController.printAlertMessage({
            title: "Não foi possível editar a tarefa!",
            info: "Tente novamente mais tarde."
        });
    };
};

const deleteTask = async ({ taskID }) => {
    try {
        const response = await fetch(`${SERVER_URL}/users/tasks/delete/${taskID}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) return uiController.printAlertMessage({
            title: "Não foi possível deletar a tarefa!",
            info: "Tente novamente mais tarde."
        });

    } catch(error) {
        console.error(error);
        return uiController.printAlertMessage({
            title: "Não foi possível editar a tarefa!",
            info: "Tente novamente mais tarde."
        });
    };
};

const deleteTasksList = async () => {
    try {
        const response = await fetch(`${SERVER_URL}/users/tasks`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) return uiController.printAlertMessage({
            title: "Não foi possível deletar a lista de tarefas!",
            info: "Tente novamente mais tarde."
        });

    } catch(error) {
        console.error(error);
        return uiController.printAlertMessage({
            title: "Não foi possível deletar a lista de tarefas!",
            info: "Tente novamente mais tarde."
        });
    };
};

export {
    getUser, updatePassword, updateUsername, updateUserProfileImage, deleteUser, createTask, editTask, toggleDoneTask, deleteTask, deleteTasksList
};