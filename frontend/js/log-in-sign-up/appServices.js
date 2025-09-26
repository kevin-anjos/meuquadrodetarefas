import { resetInputsValues, printErrorMessage }  from './uiHandler.js'

const SERVER_URL = "https://meuquadrodetarefas.onrender.com";

export const signUp = async() => {
    try {
        const response = await fetch(`${SERVER_URL}/users/sign-up`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: domElements.usernameInput.value,
                email: domElements.emailInput.value,
                password: domElements.passwordInput.value
            })
        });

        //Chamar o arquivo de dashboard a partir do ID
        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("authToken", data.token);
            window.location.replace(`./user-dashboard.html`);
        } else {
            const { title, info } = data;
            printErrorMessage(title, info);
        }
    } catch(error) {
        printErrorMessage("Erro desconhecido!", "Tente novamente.");
        console.log(error);
    } finally {
        resetInputsValues();
    };
};

export const logIn = async() => {
    try {
        const response = await fetch(`${SERVER_URL}/users/log-in`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: domElements.emailInput.value,
                password: domElements.passwordInput.value
            })  
        })

        const data = await response.json();

        if (response.ok) {
            //Colocar o token no localStorage
            localStorage.setItem("authToken", data.token);
            window.location.replace(`./user-dashboard.html`);
        } else {
            const { title, info } = data;
            printErrorMessage(title, info);
        }
    } catch(error) {
        printErrorMessage("Erro desconhecido!", "Tente novamente.");
        console.log(error);
    } finally {
        resetInputsValues();
    };
};