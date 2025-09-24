import * as domElements from './domElements.js';

import { toggleSignInSignUpAreas, handleUnfilledInput, resetInputsValues, printErrorMessage } from './uiHandler.js';

[domElements.enterAccountSpan, domElements.createAccountSpan].forEach(span => {
    span.addEventListener('click', () => {
        toggleSignInSignUpAreas();
    });
});

const gmailRegex = /^(?!.*\.\.)[A-Za-z0-9](?:[A-Za-z0-9._%+-]{0,62}[A-Za-z0-9])?@(gmail\.com|googlemail\.com)$/i;


domElements.createAccountBtn.addEventListener('click', async() => {
    if (areInputsValid()) {
        createUser();
    };
});

domElements.enterAccountBtn.addEventListener('click', async() => {
    domElements.usernameInput.value = "anyvalue";
    if (areInputsValid()) {
        enterAccount();
    };
});

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

const createUser = async() => {
    try {
        const response = await fetch('https://www.meuquadrodetarefas.onrender.com/create-user', {
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
        const response = await fetch('https://www.meuquadrodetarefas.onrender.com/enter-user-account', {
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