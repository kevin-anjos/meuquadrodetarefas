import { removeProfilePhotoBtn } from "../domElements.js";

export const handleRemovePhotoButtonVisibility = imageURL => {
    if (imageURL.trim() === "" || !imageURL) {
        return removeProfilePhotoBtn.classList.add('hidden');
    }

    removeProfilePhotoBtn.classList.remove('hidden');
}