//ID do usuário que vem do localStorage
const token = localStorage.getItem('authToken');

if (!token) {
    window.location.replace('https://meuquadrodetarefas.onrender.com');
}

const SERVER_URL = "https://meuquadrodetarefas.onrender.com";

//Atualizar a lista de tarefas
export const updateTasksList = async list => {
    try {
        await fetch(`${SERVER_URL}/tasks`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
        const response = await fetch(`${SERVER_URL}/tasks`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            localStorage.removeItem("authToken");
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
        const response = await fetch(`${SERVER_URL}/users`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const username = response.json();

        return username;
    } catch (error) {
        console.error(error);
    }
};

//Editar senha do usuário
export const updatePassword = async newPassword => {
    try {
        const response = await fetch(`${SERVER_URL}/users/update-password`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
        const response = await fetch(`${SERVER_URL}/users/update-username`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
        const response = await fetch(`${SERVER_URL}/users`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            localStorage.removeItem('authToken');
            window.location.replace('https://meuquadrodetarefas.onrender.com');   
        } else {
            return {
                title: "Não foi possível deletar a conta.",
                info: "Tente novamente mais tarde."
            }
        }
    } catch(error) {
        console.error(error);
    };
};