const token = localStorage.getItem('authToken');

const SERVER_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:8080'
    : 'https://meuquadrodetarefas.onrender.com';
    
if (!token) {
    window.location.replace('/');
};

export const getUsers = async() => {
    try {
        const response = await fetch(`${SERVER_URL}/admin/users`, {
            method:'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            window.location.replace('/');
        };

        const data = await response.json();

        return data;
    } catch(error) {
        window.location.replace('/');
    };
};

export const updateUser = async ({id, role, name, email, password, tasksList, profilePicture}) => {
    try {
        const response = await fetch(`${SERVER_URL}/admin/user`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                id,
                role,
                name,
                email,
                password,
                tasksList,
                profilePicture
            })
        });

        if (response.ok) {
            window.location.reload();
        };

    } catch(error) {
        console.error(error);
    };
};

export const deleteUser = async id => {
    try {
        await fetch(`${SERVER_URL}/admin/user`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                id
            })
        });
    } catch (error) {
        console.error(error);
    };
};