import * as appServices from './appServices.js';
import * as uiController from './uiController.js';
import * as tasksRender from './tasksRender.js';
import * as domElements from './domElements.js';
import * as events from './events.js';

const user = await appServices.getUser();
export let tasksList = JSON.parse(user.tasksList);

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

    if (domElements.addTaskInput.value.trim() === "" || taskNameExists) {
        return false;
    };

    return true;
}

//Adicionar Task
const createTask = async () => {
    if (!canTaskBeAdded()) return;

    const { taskNameWithoutTAGS, taskDecriptionWithoutTAGS } = removeHTMLTagsInTaskInfo();

    const category = {
        name: domElements.categoryTaskInput.value,
        color: domElements.categoryTaskColor.value
    }

    await appServices.createTask({ name: taskNameWithoutTAGS, description: taskDecriptionWithoutTAGS, category });

    domElements.addTaskInput.value = "";

    events.requireUpdate();
};

//Deletar tarefa
const deleteTask = async task => {
    const taskId = Number(task.replace('delete-btn-', ""));
    await appServices.deleteTask({ taskID: taskId });

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
    filterTasks();
};

//Setar a tarefa a ser editada
const setTaskToBeEdited = task => {
    toBeEditedTaskID = Number(task.replace('edit-btn-', ""));
    const toBeEditedTask = tasksList.find((task => task.id === toBeEditedTaskID));
    uiController.showEditTaskArea(toBeEditedTask);
};

//Editar tarefa
const editTask = async () => {

    const category = {
        name: domElements.categoryTaskInput.value,
        color: domElements.categoryTaskColor.value
    }

    
    await appServices.editTask({ 
        taskID: toBeEditedTaskID, 
        name: domElements.addTaskInput.value, 
        description: domElements.descriptionTaskInput.value,
        category 
    });

    events.requireUpdate();
    uiController.hideEditTaskArea();
    uiController.hideAddTaskArea();
};

const updateApp = async () => {

    const user = await appServices.getUser();

    tasksList = JSON.parse(user.tasksList);

    initializeApp();
    
};

//Funções

//Filtrar tarefas por categoria
const filterTasks = filter => {

    const setfilter = filters[filter];
    
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

const filterByCategory = categoryID => {
    const category = categoryID.replace('category-', '');

    const filteredCategoryTasks = tasksList.filter(task => task.category && task.category["name"].toLowerCase() === category);

    tasksRender.renderTasksList(filteredCategoryTasks)
};

//Filtros
const filters = {
    'filter-not-done': filterNotDoneTasks,
    'filter-done': filterDoneTasks,
    'filter-all': tasksRender.renderTasksList,
    'filter-category': uiController.printCategoriesModal
};

//Procurar por tarefas
const searchTasks = () => {
    const searchedTaskList = tasksList.filter(task => task.name.toLowerCase().includes(domElements.searchTaskInput.value.toLowerCase()) || task.description.toLowerCase().includes(domElements.searchTaskInput.value.toLowerCase()));

    domElements.filterTaskSelect.value = "filter-all";
    tasksRender.renderTasksList(searchedTaskList);
};

const checkExistingCategory = category => {
    let categoryColor = "#000";

    tasksList.forEach(task => {
        if (task.category && task.category["name"].toLowerCase() === category.toLowerCase()) {
            categoryColor = task.category["color"];
        }
    });

    uiController.printCategoryColor(categoryColor);
};

//Inicializar o programa
const initializeApp = () => {   
    tasksRender.renderTasksList(tasksList);
    //filterTasks(tasksList);
    uiController.handleDeleteAllBtnVisibility();
};

initializeApp();

export {
    createTask, deleteTask, deleteTasksList, toggleDoneTask, setTaskToBeEdited, editTask, filterTasks, filterByCategory, searchTasks, checkExistingCategory, updateApp
};