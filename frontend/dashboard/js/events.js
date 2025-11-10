import * as tasksFunctions from './tasksFunctions.js';
import * as userFunctions from './userFunctions.js';
import * as storage from './storage.js';
import * as appServices from './appServices.js';
import * as domElements from './domElements.js';
import * as uiController from './uiController.js';

//Arrays de elementos 
const themeToggleElements = [domElements.darkModeDot, domElements.lightModeDot, domElements.toggleThemeBtn];
const tasksInputs = [domElements.addTaskInput, domElements.descriptionTaskInput];
const updateUserInputs = [domElements.newPasswordInput, domElements.newUsernameInput];

//Variável do ID da task a ser deletada
let toBeDeletedTaskID;

//Eventos:
const WEBSOCKET_URL =
  window.location.hostname === 'localhost'
    ? 'ws://localhost:8080'
    : 'wss://meuquadrodetarefas.onrender.com';

const token = localStorage.getItem('authToken');

setInterval(() => {
    if (!token) storage.removeToken();
},10000);

//Criar conexão WebSocket
let websocket;

//Inicializar o app
(async () => {
    websocket = new WebSocket(WEBSOCKET_URL);
    const { username, profilePicture, role } = await appServices.getUser();
    domElements.usernameSpan.textContent = username;

    uiController.handleRemovePhotoButtonVisibility(profilePicture);
    uiController.printUserProfileImage(profilePicture);

    if (role === "admin") {
        domElements.adminPanelBtn.classList.remove('hidden');
    };

    uiController.hideLoadingScreen();
})();

storage.handleTheme();

//Socket
websocket.addEventListener("message", () => {
    tasksFunctions.updateApp();
});

websocket.addEventListener('open', () => {
    websocket.send(JSON.stringify({
      token,
      firstCall: true  
    }));
});

websocket.addEventListener("close", () => {
    setTimeout(() => {
        websocket = new WebSocket(WEBSOCKET_URL);
    }, 5000);
});

websocket.addEventListener("error", () => {
    window.location.reload();
})

export const requireUpdate = () => {
    websocket.send(JSON.stringify({
        token,
        firstCall: true  
    }));
};

//Eventos de documento
document.addEventListener('click', () => {
    domElements.userActionsArea.classList.add('hidden');
    domElements.alertMessagesArea.classList.add('hidden');
});

//Eventos de Input
domElements.searchTaskInput.addEventListener('input', () => tasksFunctions.searchTasks());

domElements.editUsernameBtn.addEventListener('click', () => uiController.showUpdateUsernameModal());

domElements.editPasswordBtn.addEventListener('click', () => uiController.showUpdatePasswordModal());

domElements.profilePhotoInput.addEventListener('change', () => userFunctions.changeProfilePicture());

domElements.removeProfilePhotoBtn.addEventListener('click', () => userFunctions.removeProfilePicture());

tasksInputs.forEach(input => {
    input.addEventListener('input', () => {
        input.value = input.value.slice(0, 100);
    });

    input.addEventListener('keydown', event => {
        if (event.key === "Enter") {
            getComputedStyle(domElements.editTaskBtn).display === "none" ? tasksFunctions.addTask() : tasksFunctions.editTask();
        };
    });
});

//Eventos de mudança no elemento
domElements.filterTaskSelect.addEventListener("change", () => tasksFunctions.filterTasks());

//Eventos de botão
domElements.userProfileArea.addEventListener('click', () => {
    setTimeout(() => {
        domElements.userActionsArea.classList.toggle('hidden');
    }, 500)
})

domElements.deleteAccountBtn.addEventListener('click', async() => {
    const { title, info } = await appServices.deleteUser();
    uiController.printAlertMessage(title, info);
});

domElements.fade.addEventListener('click', () => uiController.hideModals());

domElements.addTaskBtnArea.addEventListener('click', () => uiController.showAddTaskArea());

//Tasks

domElements.addTaskBtn.addEventListener('click', () => tasksFunctions.addTask());

domElements.editTaskBtn.addEventListener('click', () => tasksFunctions.editTask());

domElements.deleteTasksListBtn.addEventListener('click', () => tasksFunctions.deleteTasksList());

domElements.deleteTaskBtn.addEventListener('click', () => {
    tasksFunctions.deleteTask(toBeDeletedTaskID);
    uiController.hideModals();
});

//Fim das funções de tasks

domElements.closeModalBtn.forEach(button => {
    button.addEventListener('click', () => {
        uiController.hideModals();
    });
});

domElements.updatePasswordBtn.addEventListener('click', () => userFunctions.updatePassword());

domElements.adminPanelBtn.addEventListener('click', () => window.location.href = '/authe?next=administrator');

domElements.logOutBtn.addEventListener('click', () => storage.removeToken());

updateUserInputs.forEach(input => {
    input.addEventListener('click', () => {
        domElements.errorMessages[0].classList.add('hidden');
        domElements.errorMessages[1].classList.add('hidden');
    });
});

domElements.newUsernameInput.addEventListener('input', () => domElements.newUsernameInput.value = domElements.newUsernameInput.value.slice(0, 20));

domElements.updateUsernameBtn.addEventListener('click', () => userFunctions.updateUsername());

domElements.togglePasswordVisibilityBtn.addEventListener('click', () => uiController.togglePasswordVisibility());

themeToggleElements.forEach(themeToggleElement => {
    themeToggleElement.addEventListener('click', () => {
        uiController.toggleTheme();
        storage.setThemeInLocalStorage();
    });
});

//Delegação de eventos (capturar elementos criados dinamicamente)
domElements.taskListArea.addEventListener('click', event => {
    if (event.target.classList.contains('delete-task-button')) {
        toBeDeletedTaskID = event.target.id;
        uiController.confirmTaskDeletion(event.target.id);
    };

    if (event.target.classList.contains('edit-task-button')) {
        tasksFunctions.setTaskToBeEdited(event.target.id);
    };

    if (event.target.classList.contains('toggle-done-task-button')) {
        tasksFunctions.toggleDoneTask(event.target.id);
    };
});