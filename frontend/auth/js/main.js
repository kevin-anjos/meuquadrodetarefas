import * as domElements from './domElements.js';

import { toggleSignInSignUpAreas, handleUnfilledInput, printErrorMessage, resetInputsValues } from './uiController.js';

import { signUp, logIn } from './appServices.js';

const token = localStorage.getItem('authToken');

if (token) {
    window.location.href = '/authe?next=dashboard';
};

[domElements.enterAccountSpan, domElements.createAccountSpan].forEach(span => {
    span.addEventListener('click', () => {
        toggleSignInSignUpAreas();
    });
});

const gmailRegex = /^(?!.*\.\.)[A-Za-z0-9](?:[A-Za-z0-9._%+-]{0,62}[A-Za-z0-9])?@(gmail\.com|googlemail\.com)$/i;

domElements.passwordInput.addEventListener('keydown', event => {
    if (event.key !== "Enter") return;

    if (getComputedStyle(domElements.createAccountBtn).display === "none") {
        enterAccountHandler();
    } else {
        createUserHandler();
    };
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

const createUserHandler = async () => {
    if (!areInputsValid()) return;

    const { title, info } = await signUp(domElements.usernameInput.value, domElements.emailInput.value, domElements.passwordInput.value);

    printErrorMessage(title, info);

    resetInputsValues();
};

const enterAccountHandler = async () => {
    domElements.usernameInput.value = "_";

    if (!areInputsValid()) return;

    const errorMessage = await logIn(domElements.emailInput.value, domElements.passwordInput.value);

    printErrorMessage(errorMessage.title, errorMessage.info);

    resetInputsValues();
};