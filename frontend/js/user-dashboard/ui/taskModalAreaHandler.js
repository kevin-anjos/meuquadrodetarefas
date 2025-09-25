import {addEditWordToggle, addTaskInput, descriptionTaskInput, fade, modals, deleteAllListBtn, addTaskModalArea, confirmDeleteTaskModalArea, } from "../domElements.js";

import { tasksList } from "../utils/tasksManager.js";

export const hideAddTaskArea = () => {
    modals[0].classList.remove('show-modal');
    fade.classList.add('hidden');
};

export const showAddTaskArea = () => {
    addTaskModalArea.classList.remove('hide');
    confirmDeleteTaskModalArea.classList.add('hide');
    showModal(0);
};

const showModal = (modal) => {
    modals[modal].classList.add('show-modal');
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
    hideModals();
    showModal(1);
}


//Mostrar modal de renomear usuário
export const showUpdateUsernameModal = () => {
    hideModals();
    showModal(2);
}

//Mostrar modal de mudar a senha do usuário
export const showUpdatePasswordModal = () => {
    hideModals();
    showModal(3);
}

export const hideModals = () => {
    modals.forEach(modal => {
        modal.classList.remove("show-modal");
    });
    fade.classList.add('hidden');
}

fade.addEventListener('click', () => {
    hideModals();
})