//Importar função de filtrar tasks do filter.js
import { filterTasks, searchTasks } from "./filterAndSearch.js";

//Importar funções da lista de tarefas do tasksManager.js
import { addTask, deleteTask, setTaskToBeEdited, toggleDoneTask, editTask } from "./tasksManager.js";

//Importar funções de handler de modo de cor
import { toggleTheme } from "./themeColorHandler.js";

//Importar função de esconder área de edição de tarefas
import { hideEditTaskArea } from './taskEditUI.js';

//Importar elementos do arquivo de elementos DOM
import { searchTaskInput, filterTaskSelect, addTaskInput, taskDescriptionInput, addTaskBtn, editTaskBtn, taskListArea, cancelEditTaskBtn, darkModeBtn, lightModeBtn, darkModeDot, lightModeDot } from './domElements.js';


//Eventos

//Eventos de Input
searchTaskInput.addEventListener('input', () => {
    searchTasks();

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
    hideEditTaskArea();
})

darkModeDot.addEventListener('click', () => {
    toggleTheme();
})

lightModeDot.addEventListener('click', () => {
    toggleTheme();
})

darkModeBtn.addEventListener('click', () => {
    toggleTheme();
})

lightModeBtn.addEventListener('click', () => {
    toggleTheme();
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