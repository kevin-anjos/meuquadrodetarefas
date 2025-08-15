import { fade, addTaskModal } from "../domElements.js";

export const hideAddTaskArea = () => {
    addTaskModal.classList.remove('show-add-modal');
    fade.classList.add('hidden');
};

export const showAddTaskArea = () => {
    addTaskModal.classList.add('show-add-modal');
    fade.classList.remove('hidden');
};