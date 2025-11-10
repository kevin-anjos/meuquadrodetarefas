import * as appServices from './appServices.js';
import * as uiController from './uiController.js';
import * as tasksRender from './tasksRender.js';
import * as domElements from './domElements.js';
import * as functions from './userFunctions.js';
import * as events from './events.js';

const userData = await appServices.getUser();
export let tasksList = userData.tasksList;

let toBeEditedTaskID;

//Remover transformação de texto em TAGS HTML
const removeHTMLTagsInTaskInfo = () => {
    const taskNameWithoutTAGS = domElements.addTaskInput.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const taskDecriptionWithoutTAGS = domElements.descriptionTaskInput.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    return { taskNameWithoutTAGS, taskDecriptionWithoutTAGS };
};

//Verificar se a Task pode ser adicionada
const canTaskBeAdded = () => {
    const { taskNameWithoutTAGS } = removeHTMLTagsInTaskInfo();

    const taskNameExists = tasksList.some(task => task.name.toLowerCase() === taskNameWithoutTAGS.toLowerCase());

    return domElements.addTaskInput.value !== "" && !taskNameExists;
}

//Adicionar Task
const addTask = async () => {
    if (!canTaskBeAdded()) return;

    const { taskNameWithoutTAGS, taskDecriptionWithoutTAGS } = removeHTMLTagsInTaskInfo();

    await appServices.createTask({ name: taskNameWithoutTAGS, description: taskDecriptionWithoutTAGS });

    domElements.addTaskInput.value = "";

    events.requireUpdate();
};

//Deletar tarefa
const deleteTask = task => {
    const taskId = Number(task.replace('delete-btn-', ""));
    appServices.deleteTask({ taskID: taskId });

    events.requireUpdate();
};

//Deletar toda a lista 
const deleteTasksList = async () => {
    await appServices.deleteTasksList();

    events.requireUpdate();
};

// Adicionar ou remover a propriedade de feita da tarefa
const toggleDoneTask = async task => {
    const taskId = Number(task.replace('done-btn-', ""));
  
    await appServices.toggleDoneTask({ taskID: taskId});

    events.requireUpdate();
    functions.filterTasks();
};

//Setar a tarefa a ser editada
const setTaskToBeEdited = task => {
    toBeEditedTaskID = Number(task.replace('edit-btn-', ""));
    const toBeEditedTask = tasksList.find((task => task.id === toBeEditedTaskID));
    uiController.showEditTaskArea(toBeEditedTask);
};

//Editar tarefa
const editTask = async () => {
    
    await appServices.editTask({ 
        taskID: toBeEditedTaskID, 
        name: domElements.addTaskInput.value, 
        description: domElements.descriptionTaskInput.value 
    });

    events.requireUpdate();
    uiController.hideEditTaskArea();
    uiController.hideAddTaskArea();
};

const updateApp = async () => {

    const userData = await appServices.getUser();

    tasksList = userData.tasksList;

    initializeApp();
    
};

//Funções

//Filtrar tarefas por categoria
const filterTasks = () => {
    const setfilter = filters[domElements.filterTaskSelect.value];
    setfilter(tasksList);
};

//Filtrar por tarefas não feitas
const filterNotDoneTasks = () => {
    const filteredNotDoneTasks = tasksList.filter(task => !task.isDone);
    tasksRender.renderTasksList(filteredNotDoneTasks);
};

//Filtrar por tarefas feitas
const filterDoneTasks = () => {
    const filteredDoneTasks = tasksList.filter(task => task.isDone);
    tasksRender.renderTasksList(filteredDoneTasks);
};

//Filtros
const filters = {
    'filter-not-done': filterNotDoneTasks,
    'filter-done': filterDoneTasks,
    'filter-all': tasksRender.renderTasksList
};

//Procurar por tarefas
const searchTasks = () => {
    const searchedTaskList = tasksList.filter(task => task.name.toLowerCase().includes(domElements.searchTaskInput.value.toLowerCase()) || task.description.toLowerCase().includes(domElements.searchTaskInput.value.toLowerCase()));

    domElements.filterTaskSelect.value = "filter-all";
    tasksRender.renderTasksList(searchedTaskList);
};

//Inicializar o programa
const initializeApp = () => {   
    tasksRender.renderTasksList(tasksList);
    filterTasks();
    uiController.handleDeleteAllBtnVisibility();
};

initializeApp();

export {
    addTask, deleteTask, deleteTasksList, toggleDoneTask, setTaskToBeEdited, editTask, filterTasks, searchTasks, updateApp
};