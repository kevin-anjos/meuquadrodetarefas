import { removeProfilePhotoBtn } from "../domElements.js";

export const handleRemovePhotoButtonVisibility = imageURL => {
    if (!imageURL || imageURL.trim() === "") {
        return removeProfilePhotoBtn.classList.add('hidden');
    }

    removeProfilePhotoBtn.classList.remove('hidden');
}