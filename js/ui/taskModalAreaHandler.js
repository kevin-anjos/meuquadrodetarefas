import {addEditWordToggle, addTaskInput, descriptionTaskInput, fade, addTaskModal } from "../domElements.js";

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