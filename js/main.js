//Importar handler de impressão de Lista de Tasks
import { handleTasksListPrint } from "./tasksPrintHandler.js";

//Importar funções utilitárias do utils.js
import { addTask, tasksList, filterTasks, deleteTask, setTaskToBeEdited, toggleDoneTask, editTask, cancelEditTask } from "./utils.js";

//Importar fnções de handler de modo de cor
import { setDarkModeTheme, setLightModeTheme } from "./themeColorHandler.js";

//Importar elementos do arquivo de elementos DOM
import { searchTaskInput, filterTaskSelect, addTaskInput, taskDescriptionInput, addTaskBtn, editTaskBtn, taskListArea, cancelEditTaskBtn, darkModeBtn, lightModeBtn, darkModeDot, lightModeDot } from './domElements.js';

//Eventos

//Eventos de Input
searchTaskInput.addEventListener('input', () => {
    const searchedTaskList = tasksList.filter(task => task.name.toLowerCase().includes(searchTaskInput.value.toLowerCase()));

    filterTaskSelect.value = "filter-all";
    handleTasksListPrint(searchedTaskList);
})


// Limitar caracteres e ativar ação com Enter para addTaskInput
addTaskInput.addEventListener('input', () => {
    addTaskInput.value = addTaskInput.value.slice(0, 100);
});

addTaskInput.addEventListener('keydown', event => {
    if (event.key === "Enter") {
        getComputedStyle(editTaskBtn).display === "none" ? addTask() : editTask();
    }
});

// Limitar caracteres e ativar ação com Enter 
taskDescriptionInput.addEventListener('input', () => {
    taskDescriptionInput.value = taskDescriptionInput.value.slice(0, 100);
});

taskDescriptionInput.addEventListener('keydown', event => {
    if (event.key === "Enter") {
        getComputedStyle(editTaskBtn).display === "none" ? addTask() : editTask();
    }
});

//Limitar caracteres até 100 nos inputs
addTaskInput.addEventListener('input', () => {
    addTaskInput.value = addTaskInput.value.slice(0, 100);
});

taskDescriptionInput.addEventListener('input', () => {
    taskDescriptionInput.value = taskDescriptionInput.value.slice(0, 100);
});


//Verificar se o Enter deve adicionar ou editar uma tarefa 
addTaskInput.addEventListener('keydown', event => {
    if (event.key === "Enter") {
        getComputedStyle(editTaskBtn).display === "none" ? addTask() : editTask();
    }
});

taskDescriptionInput.addEventListener('keydown', event => {
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

cancelEditTaskBtn.addEventListener('click', () => {
    cancelEditTask();
})

darkModeDot.addEventListener('click', () => {
    setLightModeTheme();
})

lightModeDot.addEventListener('click', () => {
    setDarkModeTheme();
})


darkModeBtn.addEventListener('click', () => {
    setDarkModeTheme();
})

lightModeBtn.addEventListener('click', () => {
    setLightModeTheme();
})



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