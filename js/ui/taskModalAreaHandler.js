import {addEditWordToggle, addTaskInput, descriptionTaskInput, fade, modal, deleteAllListBtn, addTaskModalArea, confirmDeleteTaskModalArea } from "../domElements.js";

import { tasksList } from "../utils/tasksManager.js";

export const hideAddTaskArea = () => {
    modal.classList.remove('show-modal');
    setTimeout(() => {
        fade.classList.add('hidden');
    }, 1000);
};

export const showAddTaskArea = () => {
    addTaskModalArea.classList.remove('hide');
    confirmDeleteTaskModalArea.classList.add('hide');
    showModal();
};

export const showModal = () => {
    modal.classList.add('show-modal');
    fade.classList.remove('hidden');
}

// Mostrar botão e span de editar tarefas e imprimir o nome da tarefa atual no input
export const showEditTaskArea = task => {
    addTaskInput.value = task.name;
    descriptionTaskInput.value = task.description;
    document.body.classList.add('show-edit-task-area');
    addEditWordToggle.innerHTML = "Edite";
    showAddTaskArea();
};

// Esconder botão e span de editar tarefas
export const hideEditTaskArea = () => {
    addTaskInput.value = "";
    descriptionTaskInput.value = "";
    document.body.classList.remove('show-edit-task-area');
    addEditWordToggle.innerHTML = "Adicione";
};

//Lidar com o botão de deletar todas da tarefas
export const handleDeleteAllBtnVisibility = () => {
    if (tasksList.length > 1) {
        deleteAllListBtn.classList.remove('hide');
    } else {
        deleteAllListBtn.classList.add('hide');
    }
}

//Mostrar modal de confirmação de deletar a tarefa
export const confirmTaskDeletion = () => {
    addTaskModalArea.classList.add('hide');
    confirmDeleteTaskModalArea.classList.remove('hide');
    showModal();
}