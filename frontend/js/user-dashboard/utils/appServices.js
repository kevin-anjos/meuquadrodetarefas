const token = localStorage.getItem('authToken');

if (!token) {
    window.location.replace('/');
};

const SERVER_URL = "https://meuquadrodetarefas.onrender.com";

//Atualizar a lista de tarefas
export const updateTasksList = async list => {
    try {
        const response = await fetch(`${SERVER_URL}/users/tasks`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                tasksList: JSON.stringify(list)
            })  
        })

        if (!response.ok) {
            const data = await response.json();
            return data;
        };

        return {
            title: "Lista atualizada!",
            info: "Suas tarefas foram salvas com sucesso."
        };

    } catch(error) {
        console.error(error);
    } 
};

//Pegar dados do usuário
export const getUser = async () => {
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

        const { tasksList, username, profilePicture } = await response.json();
        return {
            tasksList: JSON.parse(tasksList),
            username: username,
            profilePicture: profilePicture
        };
    } catch (error) {
        console.error(error);
        window.location.replace('/');
    }
};

//Editar senha do usuário
export const updatePassword = async newPassword => {
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

        if (response.ok) {
            return newUsername;
        }

    } catch (error) {
        console.error(error);
    };
};


//Editar foto de perfil do usuário
export const updateUserProfileImage = async imagePath => {
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

        if (response.ok) {
            const imageURL = await response.json();
            return imageURL;
        };
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
            window.location.replace('/');   
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