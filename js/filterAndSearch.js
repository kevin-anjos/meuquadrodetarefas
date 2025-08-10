//Importar elementos do arquivo de elementos DOM
import { filterTaskSelect, searchTaskInput } from './domElements.js';

//Importar handler de impressão de Lista de Tasks
import { handleTasksListPrint } from "./tasksPrintHandler.js";

//ImportarLista de Tasks
import { tasksList } from "./tasksManager.js";

//Funções

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
};

//Filtrar por tarefas não feitas
const filterNotDoneTasks = () => {
    const filteredNotDoneTasks = tasksList.filter(task => !task.isDone)
    handleTasksListPrint(filteredNotDoneTasks);
};

//Filtrar por tarefas feitas
const filterDoneTasks = () => {
    const filteredDoneTasks = tasksList.filter(task => task.isDone)
    handleTasksListPrint(filteredDoneTasks);
};

//Procurar por tarefas
export const searchTasks = () => {
    const searchedTaskList = tasksList.filter(task => task.name.toLowerCase().includes(searchTaskInput.value.toLowerCase()));

    filterTaskSelect.value = "filter-all";
    handleTasksListPrint(searchedTaskList);
};