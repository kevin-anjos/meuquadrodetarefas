//Importar elementos do arquivo de elementos DOM
import { addEditWordToggle, addTaskInput, descriptionTaskInput } from '../domElements.js';

// Mostrar botão e span de editar tarefas e imprimir o nome da tarefa atual no input
export const showEditTaskArea = task => {
    addTaskInput.value = task.name;
    descriptionTaskInput.value = task.description;
    document.body.classList.add('show-edit-task-area');
    addEditWordToggle.innerHTML = "Edite";
};

// Esconder botão e span de editar tarefas
export const hideEditTaskArea = () => {
    addTaskInput.value = "";
    descriptionTaskInput.value = "";
    document.body.classList.remove('show-edit-task-area');
    addEditWordToggle.innerHTML = "Adicione";
};