import { loadingScreen } from "../domElements.js";

export const hideLoadingScreen = () => {
    loadingScreen.classList.add('hidden');
}