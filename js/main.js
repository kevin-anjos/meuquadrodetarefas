//Importar função de filtrar tasks do filter.js
import { filterTasks, searchTasks } from "./filterAndSearch.js";

//Importar funções da lista de tarefas do tasksManager.js
import { addTask, deleteTask, setTaskToBeEdited, toggleDoneTask, editTask } from "./tasksManager.js";

//Importar funções de handler de modo de cor
import { toggleTheme } from "./themeColorHandler.js";

//Importar função de esconder área de edição de tarefas
import { hideEditTaskArea } from './taskEditUI.js';

//Importar objeto de elementos do arquivo de elementos DOM
import * as domElement from './domElements.js';

//Arrays de elementos 
const themeToggleElements = [domElement.darkModeDot, domElement.lightModeDot];
const tasksInputs = [domElement.addTaskInput, domElement.taskDescriptionInput];

//Eventos

//Eventos de Input
domElement.searchTaskInput.addEventListener('input', () => {
    searchTasks();
});

tasksInputs.forEach(input => {
    input.addEventListener('input', () => {
        input.value = input.value.slice(0, 100)
    });

    input.addEventListener('keydown', event => {
        if (event.key === "Enter") {
            getComputedStyle(domElement.editTaskBtn).display === "none" ? addTask() : editTask();
        };
    });
});

//Eventos de mudança no elemento
domElement.filterTaskSelect.addEventListener("change", () => {
    filterTasks();
});

//Eventos de botão
domElement.addTaskBtn.addEventListener('click', () => {
    addTask();
});

domElement.editTaskBtn.addEventListener('click', () => {
    editTask();
});

domElement.cancelEditTaskBtn.addEventListener('click', () => {
    hideEditTaskArea();
});

themeToggleElements.forEach(themeToggleElement => {
    themeToggleElement.addEventListener('click', () => {
        toggleTheme();
    });
});


//Delegação de eventos (capturar elementos criados dinamicamente)
domElement.taskListArea.addEventListener('click', event => {
    if (event.target.classList.contains('delete-task-button')) {
        deleteTask(event.target.id);
    };

    if (event.target.classList.contains('edit-task-button')) {
        setTaskToBeEdited(event.target.id);
    };

    if (event.target.classList.contains('toggle-done-task-button')) {
        toggleDoneTask(event.target.id);
    };
});