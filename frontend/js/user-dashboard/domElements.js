// Seleção de Elementos
const taskListArea = document.querySelector('#tasks-list');

const addTaskBtn = document.querySelector('#add-task-btn');
const addTaskBtnArea = document.querySelector('#add-task-button-area');
const editTaskBtn = document.querySelector('#edit-task-btn');
const cancelAddTaskBtn = document.querySelectorAll('.cancel-add-task-btn');

const modal = document.querySelector('.modal');

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

const deleteTaskBtn = document.querySelector('#delete-task-btn')
const deleteAllListBtn = document.querySelector("#delete-all-list-btn");

const addTaskModalArea = document.querySelector('#add-task-modal-area');
const confirmDeleteTaskModalArea = document.querySelector('#confirm-delete-task-modal-area');

const usernameSpan = document.querySelector('#username-span');

export {
    taskListArea, modal, fade, addTaskBtn, addTaskBtnArea, editTaskBtn, searchTaskInput, cancelAddTaskBtn, addTaskInput, descriptionTaskInput, filterTaskSelect, addEditWordToggle, darkModeDot, lightModeDot, darkModeBtn, lightModeBtn, darkModeIco, lightModeIco, deleteAllListBtn, confirmDeleteTaskModalArea, addTaskModalArea, deleteTaskBtn, usernameSpan
}