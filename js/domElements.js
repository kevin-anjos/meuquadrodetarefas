// Seleção de Elementos
const taskListArea = document.querySelector('#tasks-list');

const addTaskBtn = document.querySelector('#add-task-btn');
const editTaskBtn = document.querySelector('#edit-task-btn');
const cancelEditTaskBtn = document.querySelector('#cancel-edit-task-btn');

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

export {
    taskListArea, addTaskBtn, editTaskBtn, cancelEditTaskBtn, searchTaskInput, addTaskInput, descriptionTaskInput, filterTaskSelect, addEditWordToggle, darkModeDot, lightModeDot, darkModeBtn, lightModeBtn, darkModeIco, lightModeIco
}