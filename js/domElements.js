// Seleção de Elementos
const taskListArea = document.querySelector('#tasks-list');

const addTaskBtn = document.querySelector('#add-task-btn');
const addTaskBtnArea = document.querySelector('#add-task-button-area');
const editTaskBtn = document.querySelector('#edit-task-btn');
const cancelAddTaskBtn = document.querySelector('#cancel-add-task-btn');

const addTaskModal = document.querySelector('.add-task-modal');

const fade = document.querySelector('#fade');

const searchTaskInput = document.querySelector('#search-task-input');
const addTaskInput = document.querySelector('#add-task-input');
const descriptionTaskInput = document.querySelector('#task-description-input');
const filterTaskSelect = document.querySelector('#filter-task-select');

const addEditWordToggle = document.querySelector("#add-edit-word-toggle");

const darkModeDot = document.querySelector('#dark-mode-dot');
const lightModeDot = document.querySelector('#light-mode-dot');

const darkModeBtn = document.querySelector('#dark-mode-btn');
const lightModeBtn = document.querySelector('#light-mode-btn');

const darkModeIco = document.querySelector('#dark-mode-ico');
const lightModeIco = document.querySelector('#light-mode-ico');

const deleteAllListBtn = document.querySelector("#delete-all-list-btn");

export {
    taskListArea, addTaskModal, fade, addTaskBtn, addTaskBtnArea, editTaskBtn, searchTaskInput, cancelAddTaskBtn, addTaskInput, descriptionTaskInput, filterTaskSelect, addEditWordToggle, darkModeDot, lightModeDot, darkModeBtn, lightModeBtn, darkModeIco, lightModeIco, deleteAllListBtn
}