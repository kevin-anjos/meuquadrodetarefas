import * as domElements from '../domElements.js';

export const printAlertMessage = (title, info) => {
    if (!title || !info) return;

    domElements.alertMessagesAreaTitle.textContent = title;
    domElements.alertMessagesAreaInfo.textContent = info;

    setTimeout(() => {
        domElements.alertMessagesArea.classList.remove('hidden');
    }, 1000);
};