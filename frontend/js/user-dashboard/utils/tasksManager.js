//Importar elementos do arquivo de elementos DOM
import { addTaskInput,  descriptionTaskInput } from '../domElements.js';

//Importar handler de impressão de Lista de Tasks
import { handleTasksListPrint } from "../ui/tasksPrintHandler.js";

//Importar classe das tarefas
import { Task } from './Task.js';

//Importar arquivo de UI dos campos 
import { showEditTaskArea, hideEditTaskArea, hideAddTaskArea, handleDeleteAllBtnVisibility } from '../ui/taskModalAreaHandler.js';

//Importar arquivo do storage 
import { updateTasksList, getUser } from './appServices.js';

//Importar arquivo de filtros
import { filterTasks } from './filterAndSearch.js';

//Importar arquivo de datas 
import { getCurrentDate } from './date.js';
import { printAlertMessage } from '../ui/alertMessageHandler.js';

//Array das Tarefas
export let { tasksList } = await getUser();

//Variável da posição da tarefa a ser mudada ao editar
let toBeEditedTaskID;

//Remover transformação de texto em TAGS HTML
const removeHTMLTagsInTaskInfo = () => {
    const taskNameWithoutTAGS = addTaskInput.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const taskDecriptionWithoutTAGS = descriptionTaskInput.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    return {taskNameWithoutTAGS, taskDecriptionWithoutTAGS};
}

//Verificar se a Task pode ser adicionada
const taskCanBeAdded = () => {
    const { taskNameWithoutTAGS } = removeHTMLTagsInTaskInfo();

    const taskNameExists = tasksList.some(task => task.name.toLowerCase() === taskNameWithoutTAGS.toLowerCase());

    return addTaskInput.value !== "" && !taskNameExists;
}

//Adicionar Task
export const addTask = () => {
    if (taskCanBeAdded()) {
        const { taskNameWithoutTAGS, taskDecriptionWithoutTAGS } = removeHTMLTagsInTaskInfo();

        const task = new Task(taskNameWithoutTAGS, taskDecriptionWithoutTAGS);
        tasksList.push(task);
        addTaskInput.value = "";

        updateApp();
    } ;
};

//Deletar tarefa
export const deleteTask = task => {
    const taskId = Number(task.replace('delete-btn-', ""));
    let newTaskId = 0;
    tasksList = tasksList.filter(task => task.id != taskId);

    tasksList.forEach(task => {
        task.id = newTaskId;
        newTaskId++;
    });

    updateApp();
};

//Deletar toda a lista 
export const deleteAllList = () => {
    tasksList = [];
    updateApp();
}

// Adicionar ou remover a propriedade de feita da tarefa
export const toggleDoneTask = task => {
    const taskId = Number(task.replace('done-btn-', ""));
    const taskToBeToggled = tasksList.find(task => task.id === taskId);

    if (taskToBeToggled.isDone) {
        taskToBeToggled.isDone = false;
        taskToBeToggled.finishedDate = undefined;
    } else {
        taskToBeToggled.isDone = true;
        taskToBeToggled.finishedDate = getCurrentDate();
    }

    updateApp();
    filterTasks();
};

//Setar a tarefa a ser editada
export const setTaskToBeEdited = task => {
    toBeEditedTaskID = Number(task.replace('edit-btn-', ""));
    const toBeEditedTask = tasksList.find((task => task.id === toBeEditedTaskID));
    showEditTaskArea(toBeEditedTask);
};

//Editar tarefa
export const editTask = () => {
    const editedTask = tasksList.find(task => task.id === toBeEditedTaskID);

    if (addTaskInput.value !== "") {
        editedTask.name = addTaskInput.value;
        editedTask.description = descriptionTaskInput.value;
        editedTask.isDone = false;
        editedTask.finishedDate = undefined;
    }

    updateApp();
    hideEditTaskArea();
    hideAddTaskArea();
};

//Executar funções de renderização de tarefas e de botão de apagar todas as tarefas
const updateApp = async() => {
    handleTasksListPrint(tasksList);
    handleDeleteAllBtnVisibility();

    const { title, info } = await updateTasksList(tasksList);
    printAlertMessage(title, info);
}

//Inicializar o programa
updateApp();