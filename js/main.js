//Importar handler de impressão de Lista de Tasks
import { handleTasksList } from "./handleTasksPrint.js";

//Importar funções utilitárias do utils.js
import { addTask, tasksList, filterTasks, deleteTask, setTaskToBeEdited, toggleDoneTask, editTask } from "./utils.js";

//Importar elementos do arquivo de elementos DOM
import { searchTaskInput, filterTaskSelect, addTaskInput, addTaskBtn, editTaskBtn, taskListArea } from './domElements.js';

//Eventos

//Eventos de Input
searchTaskInput.addEventListener('input', () => {
    const searchedTaskList = tasksList.filter(task => task.name.toLowerCase().includes(searchTaskInput.value.toLowerCase()));

    handleTasksList(searchedTaskList);
})

addTaskInput.addEventListener('input', () => {
    //Limitar caracteres até 100
    addTaskInput.value = addTaskInput.value.slice(0, 100)
})

addTaskInput.addEventListener('keydown', event => {
    if (event.key === "Enter") {
        getComputedStyle(editTaskBtn).display === "none" ? addTask() : editTask();
    }
});

//Eventos de mudança no elemento
filterTaskSelect.addEventListener("change", () => {
    filterTasks();
})

//Eventos de botão
addTaskBtn.addEventListener('click', () => {
    addTask();
});

editTaskBtn.addEventListener('click', () => {
    editTask();
});

//Delegação de eventos (capturar elementos criados dinamicamente)
taskListArea.addEventListener('click', event => {
    if (event.target.classList.contains('delete-task-button')) {
        deleteTask(event.target.id);
    }

    if (event.target.classList.contains('edit-task-button')) {
        setTaskToBeEdited(event.target.id);
    }

    if (event.target.classList.contains('toggle-done-task-button')) {
        toggleDoneTask(event.target.id);
    }
});