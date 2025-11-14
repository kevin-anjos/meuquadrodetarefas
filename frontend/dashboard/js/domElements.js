const taskListArea = document.querySelector('#tasks-list');

const addTaskBtn = document.querySelector('#add-task-btn');
const addTaskBtnArea = document.querySelector('#add-task-button-area');
const editTaskBtn = document.querySelector('#edit-task-btn');

const closeModalBtn = document.querySelectorAll('.close-modal-btn');

const modals = document.querySelectorAll('.modal');

const fade = document.querySelector('#fade');

const searchTaskInput = document.querySelector('#search-task-input');
const addTaskInput = document.querySelector('#add-task-input');
const descriptionTaskInput = document.querySelector('#task-description-input');
const categoryTaskInput = document.querySelector('#task-category-input');
const categoryTaskColor = document.querySelector('#task-category-color-input');

const filterTasksInput = document.querySelector('#filter-tasks-input');
const selectFiltersArea = document.querySelector('#select-filters-area');
const selectArrow = document.querySelector('#select-arrow');
const filters = document.querySelectorAll('.filter');

const currentFilterName = document.querySelector('#current-filter-name');

const addEditWordToggle = document.querySelector("#add-edit-word-toggle");

const darkModeDot = document.querySelector('#dark-mode-dot');
const lightModeDot = document.querySelector('#light-mode-dot');

const darkModeBtn = document.querySelector('#dark-mode-btn');
const lightModeBtn = document.querySelector('#light-mode-btn');

const darkModeIco = document.querySelector('#dark-mode-ico');
const lightModeIco = document.querySelector('#light-mode-ico');

const deleteTaskBtn = document.querySelector('#delete-task-btn')
const deleteTasksListBtn = document.querySelector("#delete-all-list-btn");

const addTaskModalArea = document.querySelector('#add-task-modal-area');
const confirmDeleteTaskModalArea = document.querySelector('#confirm-delete-task-modal-area');

const usernameSpan = document.querySelector('#username-span');

const loadingScreen = document.querySelector('#loading-screen');

const userProfileArea = document.querySelector('#user-profile-area');

const newUsernameInput = document.querySelector('#new-username-input');
const newPasswordInput = document.querySelector('#new-password-input');

const updateUsernameBtn = document.querySelector('#update-username-btn');
const updatePasswordBtn = document.querySelector('#update-password-btn');

const togglePasswordVisibilityBtn = document.querySelector('#toggle-password-visibility-btn');

const updateUsernameModalArea = document.querySelector('#update-username-modal-area');
const updatePasswordModalArea = document.querySelector('#update-password-modal-area');

const userActionsArea = document.querySelector('#user-actions');

const editUsernameBtn = document.querySelector('#edit-username');
const editPasswordBtn = document.querySelector('#edit-password');

const toggleThemeBtn = document.querySelector('#toggle-theme');
const toggleThemeIco = document.querySelector('#toggle-theme i');
const toggleThemeParagraph = document.querySelector('#toggle-theme p');

const adminPanelBtn = document.querySelector('#admin-panel');
const logOutBtn = document.querySelector('#log-out');
const deleteAccountBtn = document.querySelector('#delete-account');

const alertMessagesArea = document.querySelector('#alert-messages-area');

const alertMessagesAreaTitle = document.querySelector('#alert-messages-area h3');
const alertMessagesAreaInfo = document.querySelector('#alert-messages-area p');

const profilePhotoInput = document.querySelector('#profile-photo-input');
const userProfileImg = document.querySelector('#user-profile-img');
const standardUserProfileImg = document.querySelector('#standard-user-profile-img');
const removeProfilePhotoBtn = document.querySelector('#remove-profile-photo');

const errorMessages = document.querySelectorAll('.error-message');

const categoriesArea = document.querySelector('#categories-area');

export {
    taskListArea, modals, fade, addTaskBtn, addTaskBtnArea, editTaskBtn, searchTaskInput, closeModalBtn, addTaskInput, descriptionTaskInput, categoryTaskColor, categoryTaskInput, addEditWordToggle, darkModeDot, lightModeDot, darkModeBtn, lightModeBtn, darkModeIco, lightModeIco, deleteTasksListBtn, confirmDeleteTaskModalArea, addTaskModalArea, deleteTaskBtn, usernameSpan, loadingScreen, deleteAccountBtn, userProfileArea, userActionsArea, editPasswordBtn, editUsernameBtn, newUsernameInput, newPasswordInput, updatePasswordBtn, updateUsernameBtn, updateUsernameModalArea, updatePasswordModalArea, alertMessagesArea, alertMessagesAreaInfo, alertMessagesAreaTitle, errorMessages, logOutBtn, toggleThemeBtn, toggleThemeIco, toggleThemeParagraph, profilePhotoInput, userProfileImg, standardUserProfileImg, removeProfilePhotoBtn, togglePasswordVisibilityBtn, adminPanelBtn, categoriesArea, filterTasksInput, selectFiltersArea, selectArrow, filters, currentFilterName
};