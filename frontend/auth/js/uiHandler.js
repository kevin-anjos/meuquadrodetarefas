import * as domElements from './domElements.js';

//Eventos
domElements.usernameInput.addEventListener('input', () => {
    domElements.usernameInput.value = domElements.usernameInput.value.slice(0, 20);
})

domElements.userInputs.forEach((input, index) => {
    input.addEventListener('click', () => {
        domElements.errorMessagesParagraphs[index].classList.add('hidden');
        input.classList.remove('is-not-filled');
        domElements.modal.classList.remove('show-modal');
    });
});

domElements.closeModalBtn.addEventListener('click', () => {
    domElements.modal.classList.remove('show-modal');
})

//Lidar com a visibilidade da senha
domElements.togglePasswordVisibilityBtn.addEventListener('click', () => {
    const i = document.createElement('i');
    i.classList.add('bi');
    domElements.togglePasswordVisibilityBtn.replaceChildren();

    if (domElements.passwordInput.type === 'text') {
        i.classList.add("bi-eye-fill");
        domElements.passwordInput.type = 'password';
    } else {
        i.classList.add("bi-eye-slash-fill");
        domElements.passwordInput.type = 'text';
    }

    domElements.togglePasswordVisibilityBtn.appendChild(i);
});

//Funções:

//Trocar entre a área de criar conta e a de entrar na conta
export const toggleSignInSignUpAreas = () => {
    if (domElements.h1.textContent === "Criar conta:") {
        domElements.h1.textContent = 'Entrar na conta:';
        document.querySelectorAll('.task-input')[0].classList.add('hidden');
    } else {
        domElements.h1.textContent = 'Criar conta:';
        domElements.usernameInput.value = "";
        document.querySelectorAll('.task-input')[0].classList.remove('hidden');
    };

    [domElements.enterAccountBtn, domElements.createAccountBtn, domElements.enterAccountParagraph, domElements.createAccountParagraph].forEach(button => {
        button.classList.toggle('hidden');
    });
};

//Tratar o UI dos inputs vazios
export const handleUnfilledInput = input => {
    domElements.userInputs[input].classList.add('is-not-filled');
    domElements.errorMessagesParagraphs[input].classList.remove('hidden');     
};

//Resetar os valores dos inputs
export const resetInputsValues = () => {
    domElements.emailInput.value = "";
    domElements.passwordInput.value = "";
    domElements.usernameInput.value = "";
};

//Imprimir mensagem de erro
export const printErrorMessage = (title, info) => {
    domElements.modalMessage.replaceChildren();

    const h3 = document.createElement('h3');
    h3.textContent = title;

    const p = document.createElement('p');
    p.textContent = info;

    domElements.modalMessage.appendChild(h3);
    domElements.modalMessage.appendChild(p);

    domElements.modal.classList.add('show-modal');
};