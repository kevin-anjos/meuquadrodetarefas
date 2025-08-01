//Importar elementos do arquivo de elementos DOM
import { addEditWordToggle, addTaskInput, addTaskBtn, editTaskBtn } from './domElements.js';

//Importar handler de impressão de Lista de Tasks
import { handleTasksList } from "./handle-tasks-print.js";

//Importar classe das tarefas
import { Task } from './Task.js';

//Array das Tarefas
export let tasksList = new Array();

//Variável da posição da tarefa a ser mudada ao editar
let toBeEditedID;

//Carregar lista de Tarefas do Local Stoarage
window.addEventListener('load', () => {
    if (localStorage.getItem('tasks-list') != null) {
        tasksList = JSON.parse(localStorage.getItem('tasks-list'));
    }

    handleTasksList(tasksList);
})

//Funções

//Adicionar Task
export const addTask = () => {
    if (taskCanBeAdded()) {
        const task = new Task(addTaskInput.value);
        tasksList.push(task);
        addTaskInput.value = "";
        setTaskListInLocalStorage();
        handleTasksList(tasksList);
    } 
}

//Verificar se a Task pode ser adicionada
const taskCanBeAdded = () => {
    let taskNameExists;

    tasksList.forEach(task => {
        if (task.name.toLowerCase() === addTaskInput.value.toLowerCase()) {
            taskNameExists = true;
        } 
    })

    return addTaskInput.value != "" && !taskNameExists;
}

//Colocar a lista de Tasks no Local Storage
const setTaskListInLocalStorage = () => {
    localStorage.setItem('tasks-list', JSON.stringify(tasksList));
}

export const filterNotDoneTasks = () => {
    const filteredNotDoneTasks = tasksList.filter(task => !task.isDone)
    handleTasksList(filteredNotDoneTasks);
}

export const filterDoneTasks = () => {
    const filteredDoneTasks = tasksList.filter(task => task.isDone)
    handleTasksList(filteredDoneTasks);
}

export const deleteTask = task => {
    const taskId = Number(task.replace('delete-btn-', ""));
    let newTaskId = 0;
    const deletedItemTasksList = tasksList.filter(task => task.id != taskId);
    deletedItemTasksList.forEach(task => {
        task.id = newTaskId;
        newTaskId++
    })
    tasksList = deletedItemTasksList;
    handleTasksList(tasksList);
    setTaskListInLocalStorage();
}

export const setTaskToBeEdited = task => {
    const taskId = Number(task.replace('edit-btn-', ""));
    toBeEditedID = taskId;
    tasksList.forEach(task => {
        if (task.id === taskId) {
            showEditTaskArea(task);
        };
    });
}

const showEditTaskArea = task => {
    addTaskInput.value = task.name;
    addTaskBtn.style.display = "none";
    editTaskBtn.style.display = "block";
    addEditWordToggle.innerHTML = "Edite";
}

const hideEditTaskArea = () => {
    addTaskInput.value = "";
    addTaskBtn.style.display = "block";
    editTaskBtn.style.display = "none";
    addEditWordToggle.innerHTML = "Adicione";
}

export const toggleDoneTask = task => {
    const taskId = Number(task.replace('done-btn-', ""));
    tasksList.forEach(task => {
        if (task.id === taskId) {
            !task.isDone ? task.isDone = true : task.isDone = false;
        };
    });
    handleTasksList(tasksList);
    setTaskListInLocalStorage();
}

export const editTask = () => {
    if (taskCanBeAdded()) {
        tasksList.forEach(task => {
            if (task.id === toBeEditedID) {
                task.name = addTaskInput.value;
            };
        });

        setTaskListInLocalStorage();
        handleTasksList(tasksList);
        hideEditTaskArea();
    };
};