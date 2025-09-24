const enterAccountSpan = document.querySelector('#enter-account-span');
const createAccountSpan = document.querySelector('#create-account-span');

const enterAccountParagraph = document.querySelector('#enter-account-p');
const createAccountParagraph = document.querySelector('#create-account-p');

const enterAccountBtn = document.querySelector('#enter-account-btn');
const createAccountBtn = document.querySelector('#create-account-btn');

const usernameInput = document.querySelector('#username-input');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');

const togglePasswordVisibilityBtn = document.querySelector('#toggle-password-visibility-btn');

const h1 = document.querySelector('h1');

const errorMessagesParagraphs = document.querySelectorAll('.error-message');
const userInputs = document.querySelectorAll('.input');


const modal = document.querySelector('.modal');
const modalMessage = document.querySelector('#modal-message');
const closeModalBtn = document.querySelector('#close-modal-btn');

export {
    enterAccountSpan, createAccountSpan, enterAccountBtn, enterAccountParagraph, createAccountParagraph, createAccountBtn, usernameInput, passwordInput, emailInput, h1, togglePasswordVisibilityBtn, errorMessagesParagraphs, userInputs, modal,modalMessage, closeModalBtn
}