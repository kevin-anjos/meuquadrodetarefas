//Importar elementos do arquivo de elementos DOM
import { addEditWordToggle, addTaskInput, taskDescriptionInput, addTaskBtn, editTaskBtn, filterTaskSelect, cancelEditTaskBtn } from './domElements.js';

//Importar handler de impressão de Lista de Tasks
import { handleTasksListPrint } from "./tasksPrintHandler.js";

//Importar classe das tarefas
import { Task } from './Task.js';

//Array das Tarefas
export let tasksList = new Array();

//Variável da posição da tarefa a ser mudada ao editar
let toBeEditedID;

//Carregar lista de Tarefas do Local Storage
window.addEventListener('load', () => {
    if (localStorage.getItem('tasks-list') != null) {
        tasksList = JSON.parse(localStorage.getItem('tasks-list'));
    }

    handleTasksListPrint(tasksList);
})

//Funções

//Remover transformação de texto em TAGS HTML
const removeHTMLTagsInTaskInfo = () => {
    const taskNameWithoutTAGS = addTaskInput.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const taskDecriptionWithoutTAGS = taskDescriptionInput.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    return {taskNameWithoutTAGS, taskDecriptionWithoutTAGS};
}

//Adicionar Task
export const addTask = () => {
    if (taskCanBeAdded()) {
        const { taskNameWithoutTAGS, taskDecriptionWithoutTAGS } = removeHTMLTagsInTaskInfo();

        const task = new Task(taskNameWithoutTAGS, taskDecriptionWithoutTAGS);
        tasksList.push(task);
        setTaskListInLocalStorage();
        handleTasksListPrint(tasksList);
    } 
}

//Verificar se a Task pode ser adicionada
const taskCanBeAdded = () => {
    const { taskNameWithoutTAGS } = removeHTMLTagsInTaskInfo();

    let taskNameExists;

    tasksList.forEach(task => {
        if (task.name.toLowerCase() === taskNameWithoutTAGS.toLowerCase()) {
            taskNameExists = true;
        } 
    })

    return addTaskInput.value != "" && !taskNameExists;
}

//Colocar a lista de Tasks no Local Storage
const setTaskListInLocalStorage = () => {
    localStorage.setItem('tasks-list', JSON.stringify(tasksList));
}

//Filtrar tarefas por categoria
export const filterTasks = () => {
    if (filterTaskSelect.value === "filter-not-done") {
        return filterNotDoneTasks();
    }

    if (filterTaskSelect.value === "filter-done") {
        return filterDoneTasks();
    }

    //Retorna a impressão da lista completa
    return handleTasksListPrint(tasksList);
}

//Filtrar por tarefas não feitas
export const filterNotDoneTasks = () => {
    const filteredNotDoneTasks = tasksList.filter(task => !task.isDone)
    handleTasksListPrint(filteredNotDoneTasks);
}

//Filtrar por tarefas feitas
export const filterDoneTasks = () => {
    const filteredDoneTasks = tasksList.filter(task => task.isDone)
    handleTasksListPrint(filteredDoneTasks);
}

//Deletar tarefa
export const deleteTask = task => {
    const taskId = Number(task.replace('delete-btn-', ""));
    let newTaskId = 0;
    const deletedItemTasksList = tasksList.filter(task => task.id != taskId);
    deletedItemTasksList.forEach(task => {
        task.id = newTaskId;
        newTaskId++;
    })
    tasksList = deletedItemTasksList;
    handleTasksListPrint(tasksList);
    setTaskListInLocalStorage();
}

//Setar a tarefa a ser editada
export const setTaskToBeEdited = task => {
    const taskId = Number(task.replace('edit-btn-', ""));
    toBeEditedID = taskId;
    tasksList.forEach(task => {
        if (task.id === taskId) {
            showEditTaskArea(task);
        };
    });
}

// Mostrar botão e span de editar tarefas e imprimir o nome da tarefa atual no input
const showEditTaskArea = task => {
    addTaskInput.value = task.name;
    taskDescriptionInput.value = task.description;
    addTaskBtn.style.display = "none";
    editTaskBtn.style.display = "block";
    cancelEditTaskBtn.style.display = "block";
    addEditWordToggle.innerHTML = "Edite";
}

// Esconder botão e span de editar tarefas
const hideEditTaskArea = () => {
    addTaskInput.value = "";
    taskDescriptionInput.value = "";
    addTaskBtn.style.display = "block";
    editTaskBtn.style.display = "none";
    cancelEditTaskBtn.style.display = "none";
    addEditWordToggle.innerHTML = "Adicione";
}

// Adicionar ou remover a propriedade de feita da tarefa
export const toggleDoneTask = task => {
    const taskId = Number(task.replace('done-btn-', ""));
    tasksList.forEach(task => {
        if (task.id === taskId) {
            !task.isDone ? task.isDone = true : task.isDone = false;
        };
    });
    handleTasksListPrint(tasksList);
    setTaskListInLocalStorage();
    filterTasks();
}

//Editar tarefa
export const editTask = () => {
    tasksList.forEach(task => {
        if (task.id === toBeEditedID) {
            task.name = addTaskInput.value;
            task.description = taskDescriptionInput.value;
            task.isDone = false;
        };
    });

    setTaskListInLocalStorage();
    handleTasksListPrint(tasksList);
    hideEditTaskArea();
};

//Cancelar edição de tarefa
export const cancelEditTask = () => {
    hideEditTaskArea();
};