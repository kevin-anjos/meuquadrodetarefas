//Importar elementos do arquivo de elementos DOM
import { filterTaskSelect, searchTaskInput } from '../domElements.js';

//Importar handler de impressão de Lista de Tasks
import { handleTasksListPrint } from "../ui/tasksPrintHandler.js";

//Importar lista de tarefas
import { tasksList } from "./tasksManager.js";

//Funções

//Filtrar tarefas por categoria
export const filterTasks = () => {
    const setfilter = filters[filterTaskSelect.value];
    setfilter(tasksList);
};

//Filtrar por tarefas não feitas
const filterNotDoneTasks = () => {
    const filteredNotDoneTasks = tasksList.filter(task => !task.isDone);
    handleTasksListPrint(filteredNotDoneTasks);
};

//Filtrar por tarefas feitas
const filterDoneTasks = () => {
    const filteredDoneTasks = tasksList.filter(task => task.isDone);
    handleTasksListPrint(filteredDoneTasks);
};

//Filtros
const filters = {
    'filter-not-done': filterNotDoneTasks,
    'filter-done': filterDoneTasks,
    'filter-all': handleTasksListPrint
};

//Procurar por tarefas
export const searchTasks = () => {
    const searchedTaskList = tasksList.filter(task => task.name.toLowerCase().includes(searchTaskInput.value.toLowerCase()));

    filterTaskSelect.value = "filter-all";
    handleTasksListPrint(searchedTaskList);
};