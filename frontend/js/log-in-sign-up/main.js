import * as domElements from './domElements.js';

import { toggleSignInSignUpAreas, handleUnfilledInput, resetInputsValues, printErrorMessage } from './uiHandler.js';

[domElements.enterAccountSpan, domElements.createAccountSpan].forEach(span => {
    span.addEventListener('click', () => {
        toggleSignInSignUpAreas();
    });
});

const gmailRegex = /^(?!.*\.\.)[A-Za-z0-9](?:[A-Za-z0-9._%+-]{0,62}[A-Za-z0-9])?@(gmail\.com|googlemail\.com)$/i;

const SERVER_URL = "https://meuquadrodetarefas.onrender.com";

domElements.passwordInput.addEventListener('keydown', event => {
    if (event.key !== "Enter") return;

    if (getComputedStyle(domElements.createAccountBtn).display === "none") {
        enterAccountHandler();
    } else {
        createUserHandler();
    }
})

domElements.createAccountBtn.addEventListener('click', async() => createUserHandler());

domElements.enterAccountBtn.addEventListener('click', async() => enterAccountHandler());

const areInputsValid = () => {
    if (domElements.usernameInput.value.trim() === "") {
        handleUnfilledInput(0);        
        return false;
    }

    if (domElements.emailInput.value.trim() === "" || !gmailRegex.test(domElements.emailInput.value.trim())) {
        handleUnfilledInput(1);        
        return false;
    }

    if (domElements.passwordInput.value.length < 8) {
        handleUnfilledInput(2);        
        return false;
    }

    return true;
};

const createUserHandler = () => {
    if (!areInputsValid()) return;
    createUser();
}

const enterAccountHandler = () => {
    domElements.usernameInput.value = "anyvalue";
    if (!areInputsValid()) return;
    enterAccount();
}

const createUser = async() => {
    try {
        const response = await fetch(`${SERVER_URL}/create-user`, {
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
            window.location.href = `./user-dashboard.html?i=${data.id}`;
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

const enterAccount = async() => {
    try {
        const response = await fetch(`${SERVER_URL}/enter-user-account`, {
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
            window.location.replace(`./user-dashboard.html?i=${data.id}`);
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