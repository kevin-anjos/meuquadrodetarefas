//Importar função de filtrar tasks do filter.js
import { filterTasks, searchTasks } from "./utils/filterAndSearch.js";

//Importar funções da lista de tarefas do tasksManager.js
import { addTask, deleteTask, setTaskToBeEdited, toggleDoneTask, editTask, deleteAllList } from "./utils/tasksManager.js";

//Importar funções de handler de modo de cor
import { toggleTheme } from "./ui/themeColorHandler.js";

//Importar objeto de elementos do arquivo de elementos DOM
import * as domElements from './domElements.js';

//Importar arquivo de handler da área do modal de tasks
import { hideAddTaskArea, showAddTaskArea, hideEditTaskArea, confirmTaskDeletion, hideModals, showUpdatePasswordModal, showUpdateUsernameModal } from "./ui/taskModalAreaHandler.js";

//Importar arquivo de requisições
import { getUsername, deleteUser, updatePassword, updateUsername } from "./utils/appServices.js";

import { hideLoadingScreen } from "./ui/hideLoadingAnimationHandler.js";

//Arrays de elementos 
const themeToggleElements = [domElements.darkModeDot, domElements.lightModeDot];
const tasksInputs = [domElements.addTaskInput, domElements.descriptionTaskInput];
const updateUserInputs = [domElements.newPasswordInput, domElements.newUsernameInput];

//Variável do ID da task a ser deletada
let toBeDeletedTaskID;

//Pegar nome do usuário
(async () => {
    const username = await getUsername();
    domElements.usernameSpan.textContent = username + "!";
    hideLoadingScreen();
})();

//Eventos:

//Eventos de documento
document.addEventListener('click', () => {
    domElements.userActionsArea.classList.add('hidden');
    domElements.alertMessagesArea.classList.add('hidden');
});

//Eventos de Input
domElements.searchTaskInput.addEventListener('input', () => {
    searchTasks();
});

domElements.editUsernameBtn.addEventListener('click', () => {
    showUpdateUsernameModal();
});

domElements.editPasswordBtn.addEventListener('click', () => {
    showUpdatePasswordModal();
});

tasksInputs.forEach(input => {
    input.addEventListener('input', () => {
        input.value = input.value.slice(0, 100);
    });

    input.addEventListener('keydown', event => {
        if (event.key === "Enter") {
            getComputedStyle(domElements.editTaskBtn).display === "none" ? addTask() : editTask();
        };
    });
});

//Eventos de mudança no elemento
domElements.filterTaskSelect.addEventListener("change", () => {
    filterTasks();
});

//Eventos de botão

domElements.userProfileArea.addEventListener('click', () => {
    setTimeout(() => {
        domElements.userActionsArea.classList.toggle('hidden');
    }, 1000)
})

domElements.deleteAccountBtn.addEventListener('click', async() => {
    const { title, info } = await deleteUser();

    domElements.alertMessagesAreaTitle.textContent = title;
    domElements.alertMessagesAreaInfo.textContent = info;

    setTimeout(() => {
        domElements.alertMessagesArea.classList.remove('hidden');
    }, 1000)

});

domElements.addTaskBtnArea.addEventListener('click', () => {
    showAddTaskArea();
});

domElements.fade.addEventListener('click', () => {
    hideAddTaskArea();
    hideEditTaskArea();
});

domElements.addTaskBtn.addEventListener('click', () => {
    addTask();
});

domElements.editTaskBtn.addEventListener('click', () => {
    editTask();
});

domElements.deleteAllListBtn.addEventListener('click', () => {
    deleteAllList();
});

domElements.deleteTaskBtn.addEventListener('click', () => {
    deleteTask(toBeDeletedTaskID);
    hideModals();
});

domElements.closeModalBtn.forEach(button => {
    button.addEventListener('click', () => {
        hideModals();
    });
});


domElements.updatePasswordBtn.addEventListener('click', async() => {
    if (domElements.newPasswordInput.value.length < 8) {
        return domElements.errorMessages[1].classList.remove('hidden');
    };

    await updatePassword(domElements.newPasswordInput.value);

    hideModals();

    domElements.newPasswordInput.value = "";

    domElements.alertMessagesAreaTitle.textContent = "Senha atualizada!";
    domElements.alertMessagesAreaInfo.textContent = "A sua senha já foi atualizada no banco de dados.";

    setTimeout(() => {
        domElements.alertMessagesArea.classList.remove('hidden');
    }, 1000)
});

domElements.logOutBtn.addEventListener('click', () => {
    localStorage.removeItem('authToken');
    window.location.replace('/');
})

updateUserInputs.forEach(input => {
    input.addEventListener('click', () => {
        domElements.errorMessages[0].classList.add('hidden');
        domElements.errorMessages[1].classList.add('hidden');
    })
})

domElements.updateUsernameBtn.addEventListener('click', async() => {
    if (domElements.newUsernameInput.value === "") {
        return domElements.errorMessages[0].classList.remove('hidden');
    }
    const newUsername = await updateUsername(domElements.newUsernameInput.value);
    domElements.usernameSpan.textContent = newUsername + "!";
    hideModals();
    domElements.newUsernameInput.value = "";
})

themeToggleElements.forEach(themeToggleElement => {
    themeToggleElement.addEventListener('click', () => {
        toggleTheme();
    });
});

//Delegação de eventos (capturar elementos criados dinamicamente)
domElements.taskListArea.addEventListener('click', event => {
    if (event.target.classList.contains('delete-task-button')) {
        toBeDeletedTaskID = event.target.id;
        confirmTaskDeletion();
        //deleteTask(event.target.id);
    };

    if (event.target.classList.contains('edit-task-button')) {
        setTaskToBeEdited(event.target.id);
    };

    if (event.target.classList.contains('toggle-done-task-button')) {
        toggleDoneTask(event.target.id);
    };
});