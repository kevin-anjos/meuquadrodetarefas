//Importar função de filtrar tasks do filter.js
import { filterTasks, searchTasks } from "./utils/filterAndSearch.js";

//Importar funções da lista de tarefas do tasksManager.js
import { addTask, deleteTask, setTaskToBeEdited, toggleDoneTask, editTask, deleteAllList } from "./utils/tasksManager.js";

//Importar funções de handler de modo de cor
import { toggleTheme } from "./ui/themeColorHandler.js";

//Importar objeto de elementos do arquivo de elementos DOM
import * as domElements from './domElements.js';

//Importar arquivo de handler da área do modal de tasks
import { hideAddTaskArea, showAddTaskArea, hideEditTaskArea, confirmTaskDeletion } from "./ui/taskModalAreaHandler.js";

//Importar a função de pegar nome de usuário pelo storage
import { getUsername } from "./utils/storage.js";

//Arrays de elementos 
const themeToggleElements = [domElements.darkModeDot, domElements.lightModeDot];
const tasksInputs = [domElements.addTaskInput, domElements.descriptionTaskInput];

//Variável do ID da task a ser deletada
let toBeDeletedTaskID;

//Nome do usuário:
const username = await getUsername();
domElements.usernameSpan.textContent = username + "!";


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
domElements.addTaskBtnArea.addEventListener('click', () => {
    showAddTaskArea();
})

domElements.fade.addEventListener('click', () => {
    hideAddTaskArea();
    hideEditTaskArea();
})


domElements.cancelAddTaskBtn.forEach(button => {
    button.addEventListener('click', () => {
        hideAddTaskArea();
        hideEditTaskArea();
    })
})

domElements.addTaskBtn.addEventListener('click', () => {
    addTask();
});

domElements.editTaskBtn.addEventListener('click', () => {
    editTask();
});

domElements.deleteAllListBtn.addEventListener('click', () => {
    deleteAllList();
})

domElements.deleteTaskBtn.addEventListener('click', () => {
    deleteTask(toBeDeletedTaskID);
    hideAddTaskArea();
    hideEditTaskArea();
})

themeToggleElements.forEach(themeToggleElement => {
    themeToggleElement.addEventListener('click', () => {
        toggleTheme();
    });
});


//Delegação de eventos (capturar elementos criados dinamicamente)
domElements.taskListArea.addEventListener('click', event => {
    if (event.target.classList.contains('delete-task-button')) {
        toBeDeletedTaskID = event.target.id;
        confirmTaskDeletion();
        //deleteTask(event.target.id);
    };

    if (event.target.classList.contains('edit-task-button')) {
        setTaskToBeEdited(event.target.id);
    };

    if (event.target.classList.contains('toggle-done-task-button')) {
        toggleDoneTask(event.target.id);
    };
});