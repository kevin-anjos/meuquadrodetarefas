import * as domElements from './domElements.js';
import * as uiController from './uiController.js';
import * as appServices from './appServices.js';

const changeProfilePicture = () => {
    const file = domElements.profilePhotoInput.files[0];
        
    if (!file || !file.type.includes("image")) return;

    const reader = new FileReader();

    reader.addEventListener('loadend', async () => {
        const imagePath = reader.result;

        const imageURL = await appServices.updateUserProfileImage(imagePath);

        uiController.printUserProfileImage(imageURL);

        uiController.handleRemovePhotoButtonVisibility(imageURL);
    });

    reader.readAsDataURL(file);
};

const removeProfilePicture = async () => {
    uiController.handleRemovePhotoButtonVisibility("");
    uiController.printUserProfileImage("");
    await appServices.updateUserProfileImage("");
};

const updateUsername = async () => {
    if (domElements.newUsernameInput.value.trim() === "") {
        return domElements.errorMessages[0].classList.remove('hidden');
    };
    if (domElements.newUsernameInput.value === domElements.usernameSpan.textContent) return;
    const newUsername = await appServices.updateUsername(domElements.newUsernameInput.value);
    domElements.usernameSpan.textContent = newUsername;
    uiController.hideModals();
    domElements.newUsernameInput.value = "";
};

const updatePassword = async () => {
    if (domElements.newPasswordInput.value.length < 8) {
        return domElements.errorMessages[1].classList.remove('hidden');
    };

    await appServices.updatePassword(domElements.newPasswordInput.value);

    uiController.hideModals();

    setTimeout(() => {
        domElements.alertMessagesArea.classList.remove('hidden');
    }, 1000);
};

export {
    changeProfilePicture, removeProfilePicture, updateUsername, updatePassword
}