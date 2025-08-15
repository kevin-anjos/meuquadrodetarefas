//Importar elementos do arquivo de elementos DOM
import { addTaskInput,  descriptionTaskInput } from '../domElements.js';

//Importar handler de impressão de Lista de Tasks
import { handleTasksListPrint } from "../ui/tasksPrintHandler.js";

//Importar classe das tarefas
import { Task } from './Task.js';

//Importar arquivo de UI dos campos durante a edição de uma tarefa
import { showEditTaskArea, hideEditTaskArea } from '../ui/taskEditUI.js';

//Importar arquivo do storage 
import { setTaskListInLocalStorage, getTasksListFromLocalStorage } from './storage.js';

//Array das Tarefas
export let tasksList = getTasksListFromLocalStorage();
handleTasksListPrint(tasksList);

//Variável da posição da tarefa a ser mudada ao editar
let toBeEditedID;

//Remover transformação de texto em TAGS HTML
const removeHTMLTagsInTaskInfo = () => {
    const taskNameWithoutTAGS = addTaskInput.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const taskDecriptionWithoutTAGS = descriptionTaskInput.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    return {taskNameWithoutTAGS, taskDecriptionWithoutTAGS};
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

//Adicionar Task
export const addTask = () => {
    if (taskCanBeAdded()) {
        const { taskNameWithoutTAGS, taskDecriptionWithoutTAGS } = removeHTMLTagsInTaskInfo();

        const task = new Task(taskNameWithoutTAGS, taskDecriptionWithoutTAGS);
        tasksList.push(task);
        setTaskListInLocalStorage(tasksList);
        handleTasksListPrint(tasksList);
    } ;
};

//Deletar tarefa
export const deleteTask = task => {
    const taskId = Number(task.replace('delete-btn-', ""));
    let newTaskId = 0;
    const deletedItemTasksList = tasksList.filter(task => task.id != taskId);
    deletedItemTasksList.forEach(task => {
        task.id = newTaskId;
        newTaskId++;
    });
    tasksList = deletedItemTasksList;
    handleTasksListPrint(tasksList);
    setTaskListInLocalStorage(tasksList);
};

// Adicionar ou remover a propriedade de feita da tarefa
export const toggleDoneTask = task => {
    const taskId = Number(task.replace('done-btn-', ""));
    tasksList.forEach(task => {
        if (task.id === taskId) {
            !task.isDone ? task.isDone = true : task.isDone = false;
        };
    });
    handleTasksListPrint(tasksList);
    setTaskListInLocalStorage(tasksList);
    filterTasks();
};

//Setar a tarefa a ser editada
export const setTaskToBeEdited = task => {
    const taskId = Number(task.replace('edit-btn-', ""));
    toBeEditedID = taskId;
    tasksList.forEach(task => {
        if (task.id === taskId) {
            showEditTaskArea(task);
        };
    });
};

//Editar tarefa
export const editTask = () => {
    tasksList.forEach(task => {
        if (task.id === toBeEditedID) {
            task.name = addTaskInput.value;
            task.description = descriptionTaskInput.value;
            task.isDone = false;
        };
    });

    setTaskListInLocalStorage(tasksList);
    handleTasksListPrint(tasksList);
    hideEditTaskArea();
};