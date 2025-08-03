//Importar área de Impressão da Lista de Tasks

import { taskListArea } from './domElements.js'


//Handler da Lista de Tasks
export const handleTasksListPrint = list => {
    resetTasksList();
    printTasksList(list);
}

//Mensagem de Lista de Tarefas vazia
const showEmptyListMessage = () => {
    const emptyListMessage = document.createElement('p');
    emptyListMessage.setAttribute('id', 'empty-list-text');
    emptyListMessage.innerHTML = "A lista está vazia...";
    taskListArea.appendChild(emptyListMessage);
}

//Criar os elementos a serem imprimidos
const createElementsToBePrinted = task => {
    const taskArea = document.createElement('div');
    taskArea.classList.add("task");

    const taskName = document.createElement('div');
    taskName.classList.add("task-name");

    const taskButtonsArea = document.createElement('div');
    taskButtonsArea.classList.add("task-buttons");

    const toggleDoneTaskBtn = document.createElement('i');

    if (task.isDone) {
        taskName.innerHTML = `<s>${task.id + 1}. ${task.name}</s>`;
        toggleDoneTaskBtn.classList.add("bi", "bi-arrow-counterclockwise", "toggle-done-task-button");
    } else {
        taskName.innerHTML = `${task.id + 1}. ${task.name}`;
        toggleDoneTaskBtn.classList.add("bi", "bi-check-circle", "toggle-done-task-button");
    }

    toggleDoneTaskBtn.setAttribute('id', `done-btn-${task.id}`);

    const editTaskBtn = document.createElement('i');
    editTaskBtn.classList.add("bi", "bi-pen", "edit-task-button");
    editTaskBtn.setAttribute('id', `edit-btn-${task.id}`);

    const deleteTaskBtn = document.createElement('i');
    deleteTaskBtn.classList.add("bi", "bi-x-circle", "delete-task-button");
    deleteTaskBtn.setAttribute('id', `delete-btn-${task.id}`);

    return { toggleDoneTaskBtn, editTaskBtn, deleteTaskBtn, taskName, taskButtonsArea, taskArea };
}

//Imprimir Lista de tarefas
const printTasksList = list => {
    if (list.length === 0) {
        return showEmptyListMessage();
    }

    list.forEach(task => {
        const { toggleDoneTaskBtn, editTaskBtn, deleteTaskBtn, taskName, taskButtonsArea, taskArea } = createElementsToBePrinted(task);
        
        [toggleDoneTaskBtn, editTaskBtn, deleteTaskBtn].forEach(button => {
            taskButtonsArea.appendChild(button);
        });

        [taskName, taskButtonsArea].forEach(area => {
            taskArea.appendChild(area);
        })

        taskListArea.appendChild(taskArea);
    })
};

//Apagar os dados impressos da lista de tarefas
const resetTasksList = () => taskListArea.replaceChildren();