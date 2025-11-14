import * as domElements from './domElements.js';

//Handler da Lista de Tasks
const renderTasksList = tasksList => {
    resetTasksList();
    printTasksList(tasksList);
};

//Mensagem de Lista de Tarefas vazia
const showEmptyListMessage = () => {
    const emptyListMessage = document.createElement('p');
    emptyListMessage.setAttribute('id', 'empty-list-text');
    emptyListMessage.innerHTML = "A lista está vazia...";
    domElements.taskListArea.appendChild(emptyListMessage);
};

//Criar os elementos a serem imprimidos
const createElementsToBePrinted = task => {

    const [taskArea, taskInfo, taskCategory, taskCategoryLine, taskName, taskCreationDate, taskFinishedDate, taskDescription, taskButtons] = Array(9).fill().map(() => document.createElement('div'));

    const [toggleDoneTaskBtn, editTaskBtn, deleteTaskBtn ] = Array(3).fill().map(() => document.createElement('i'));

    taskArea.classList.add("task");

    taskInfo.classList.add("task-info");

    taskCategory.classList.add("task-category");

    taskCategoryLine.classList.add("task-category-line");

    if (!task.category || !task.category["name"] || task.category["name"].trim() === "") {
        taskCategory.style.display = 'none';
        taskCategoryLine.style.display = 'none';
    } else {
        taskCategory.innerHTML = task.category["name"];
        taskCategory.style.color = task.category["color"];
        taskCategoryLine.style.backgroundColor = task.category["color"];
    }

    taskName.classList.add("task-name");

    taskCreationDate.classList.add("task-creation-date");

    taskCreationDate.innerHTML = `<strong>Criada em:</strong> ${task.creationDate}`;

    taskFinishedDate.classList.add("task-finished-date");

    if (task.finishedDate !== undefined) {
        taskFinishedDate.innerHTML = `<strong>Concluída em:</strong> ${task.finishedDate}`
    }

    taskDescription.classList.add("task-description");

    if (task.description != undefined && task.description.trim() !== "") {
        task.description = task.description.replace('Descrição:', "")
        taskDescription.innerHTML = `<strong>Descrição:</strong> ${task.description}`
    };

    taskButtons.classList.add("task-buttons");

    if (task.isDone) {
        taskName.innerHTML = `<s>${task.id + 1}. ${task.name}</s>`;
        toggleDoneTaskBtn.classList.add("bi", "bi-arrow-counterclockwise", "toggle-done-task-button");
        toggleDoneTaskBtn.setAttribute('title', `Pendente`);
    } else {
        taskName.innerHTML = `${task.id + 1}. ${task.name}`;
        toggleDoneTaskBtn.classList.add("bi", "bi-check-circle", "toggle-done-task-button");
        toggleDoneTaskBtn.setAttribute('title', `Concluir`);
    };

    toggleDoneTaskBtn.setAttribute('id', `done-btn-${task.id}`);

    editTaskBtn.classList.add("bi", "bi-pen", "edit-task-button");
    editTaskBtn.setAttribute('id', `edit-btn-${task.id}`);
    editTaskBtn.setAttribute('title', `Editar`);

    deleteTaskBtn.classList.add("bi", "bi-x-circle", "delete-task-button");
    deleteTaskBtn.setAttribute('id', `delete-btn-${task.id}`);
    deleteTaskBtn.setAttribute('title', `Deletar`);

    return { toggleDoneTaskBtn, editTaskBtn, deleteTaskBtn, taskInfo, taskCategory, taskCategoryLine, taskName, taskCreationDate, taskFinishedDate, taskDescription, taskButtons, taskArea };
};

//Imprimir Lista de tarefas
const printTasksList = tasksList => {
    if (tasksList.length === 0) {
        return showEmptyListMessage();
    };

    tasksList.forEach(task => {
        const { toggleDoneTaskBtn, editTaskBtn, deleteTaskBtn, taskInfo, taskCategory, taskCategoryLine, taskName, taskCreationDate, taskFinishedDate, taskDescription, taskButtons, taskArea } = createElementsToBePrinted(task);
        
        [toggleDoneTaskBtn, editTaskBtn, deleteTaskBtn].forEach(button => {
            taskButtons.appendChild(button);
        });

        [taskCategoryLine,taskCategory, taskName, taskDescription, taskCreationDate, taskFinishedDate].forEach(info => {
            taskInfo.appendChild(info);
        })

        taskArea.appendChild(taskInfo);
        taskArea.appendChild(taskButtons);

        domElements.taskListArea.appendChild(taskArea);
    });
};

//Apagar os dados impressos da lista de tarefas
const resetTasksList = () => domElements.taskListArea.replaceChildren();

export {
    renderTasksList
};