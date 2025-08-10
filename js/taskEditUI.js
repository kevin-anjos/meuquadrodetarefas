//Importar elementos do arquivo de elementos DOM
import { addTaskBtn, editTaskBtn, cancelEditTaskBtn, addEditWordToggle, addTaskInput, taskDescriptionInput } from './domElements.js';

// Mostrar botão e span de editar tarefas e imprimir o nome da tarefa atual no input
export const showEditTaskArea = task => {
    addTaskInput.value = task.name;
    taskDescriptionInput.value = task.description;
    addTaskBtn.style.display = "none";
    editTaskBtn.style.display = "block";
    cancelEditTaskBtn.style.display = "block";
    addEditWordToggle.innerHTML = "Edite";
};

// Esconder botão e span de editar tarefas
export const hideEditTaskArea = () => {
    addTaskInput.value = "";
    taskDescriptionInput.value = "";
    addTaskBtn.style.display = "block";
    editTaskBtn.style.display = "none";
    cancelEditTaskBtn.style.display = "none";
    addEditWordToggle.innerHTML = "Adicione";
};