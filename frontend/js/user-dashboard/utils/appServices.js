//ID do usuário que vem nos parâmetros da URL
const userID = new URLSearchParams(window.location.search).get('i');

const SERVER_URL = "http://127.0.0.1:8080";

//https://meuquadrodetarefas.onrender.com
//http://127.0.0.1:8080

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

        return JSON.parse(stringfiedTasksList);
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

//Editar senha do usuário
export const updatePassword = async newPassword => {
    try {
        const response = await fetch(`${SERVER_URL}/users/update-password/${userID}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: newPassword
            }) 
        });

        if (response.ok) {
            return newPassword;
        }

    } catch (error) {
        console.error(error);
    };
};

//Editar nome do usuário
export const updateUsername = async newUsername => {
    try {
        const response = await fetch(`${SERVER_URL}/users/update-username/${userID}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newUsername
            }) 
        });

        if (response.ok) {
            return newUsername;
        }

    } catch (error) {
        console.error(error);
    };
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

