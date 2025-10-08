const SERVER_URL = "https://meuquadrodetarefas.onrender.com";

export const signUp = async(userName, userEmail, userPassword) => {
    try {
        const response = await fetch(`${SERVER_URL}/users/sign-up`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userName,
                email: userEmail,
                password: userPassword
            })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("authToken", data.token);
            window.location.replace(`./dashboard`);
        } else {
            return {
                title: data.title,
                info: data.info
            };
        }
    } catch(error) {
        console.log(error);

        return {
            title: "Erro desconhecido!",
            info: "Tente novamente."
        }
    }
};

export const logIn = async(userEmail, userPassword) => {
    try {
        const response = await fetch(`${SERVER_URL}/users/log-in`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userEmail,
                password: userPassword
            })  
        })

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("authToken", data.token);
            window.location.replace(`./dashboard`);
        } else {
            return {
                title: data.title,
                info: data.info
            };
        }
    } catch(error) {
        console.log(error);

        return {
            title: "Erro desconhecido!",
            info: "Tente novamente."
        }
    }
};