import {addEditWordToggle, addTaskInput, descriptionTaskInput, fade, addTaskModal, deleteAllListBtn } from "../domElements.js";

import { tasksList } from "../utils/tasksManager.js";

export const hideAddTaskArea = () => {
    addTaskModal.classList.remove('show-add-modal');
    fade.classList.add('hidden');
};

export const showAddTaskArea = () => {
    addTaskModal.classList.add('show-add-modal');
    fade.classList.remove('hidden');
};

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
    if (tasksList.length === 0) {
        deleteAllListBtn.classList.add('hide');
    } else {
        deleteAllListBtn.classList.remove('hide');
    }
}