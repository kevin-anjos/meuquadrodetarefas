//Importar função de filtrar tasks do filter.js
import { filterTasks, searchTasks } from "./utils/filterAndSearch.js";

//Importar funções da lista de tarefas do tasksManager.js
import { addTask, deleteTask, setTaskToBeEdited, toggleDoneTask, editTask } from "./utils/tasksManager.js";

//Importar funções de handler de modo de cor
import { toggleTheme } from "./ui/themeColorHandler.js";

//Importar função de esconder área de edição de tarefas
import { hideEditTaskArea } from './ui/taskEditUI.js';

//Importar objeto de elementos do arquivo de elementos DOM
import * as domElements from './domElements.js';

//Arrays de elementos 
const themeToggleElements = [domElements.darkModeDot, domElements.lightModeDot];
const tasksInputs = [domElements.addTaskInput, domElements.descriptionTaskInput];

//Eventos

//Eventos de Input
domElements.searchTaskInput.addEventListener('input', () => {
    searchTasks();
});

tasksInputs.forEach(input => {
    input.addEventListener('input', () => {
        input.value = input.value.slice(0, 100)
    });

    input.addEventListener('keydown', event => {
        if (event.key === "Enter") {
            getComputedStyle(domElements.editTaskBtn).display === "none" ? addTask() : editTask();
        };
    });
});

//Eventos de mudança no elemento
domElements.filterTaskSelect.addEventListener("change", () => {
    filterTasks();
});

//Eventos de botão
domElements.addTaskBtn.addEventListener('click', () => {
    addTask();
});

domElements.editTaskBtn.addEventListener('click', () => {
    editTask();
});

domElements.cancelEditTaskBtn.addEventListener('click', () => {
    hideEditTaskArea();
});

themeToggleElements.forEach(themeToggleElement => {
    themeToggleElement.addEventListener('click', () => {
        toggleTheme();
    });
});


//Delegação de eventos (capturar elementos criados dinamicamente)
domElements.taskListArea.addEventListener('click', event => {
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