import * as domElements from './domElements.js';

import { tasksList } from "./tasksFunctions.js";

const printAlertMessage = ({ title }) => {
    if (!title) return;

    domElements.alertMessagesAreaTitle.textContent = title;
    domElements.alertMessagesAreaInfo.textContent = "Tente novamente mais tarde.";

    setTimeout(() => {
        domElements.alertMessagesArea.classList.remove('hidden');
    }, 1000);
};

const handleRemovePhotoButtonVisibility = imageURL => {
    if (!imageURL || imageURL.trim() === "") {
        return domElements.removeProfilePhotoBtn.classList.add('hidden');
    }

    domElements.removeProfilePhotoBtn.classList.remove('hidden');
};

const hideLoadingScreen = () => {
    domElements.loadingScreen.classList.add('hidden');
}

const printUserProfileImage = imageURL => {
    if (!imageURL || imageURL.trim() === "") {
        domElements.userProfileImg.classList.add('hidden')
        domElements.standardUserProfileImg.classList.remove('hidden');
        return;
    } 

    domElements.userProfileImg.setAttribute('src', imageURL);
    domElements.userProfileImg.classList.remove('hidden');
    domElements.standardUserProfileImg.classList.add('hidden');
}

const toggleTheme = () => {
    document.body.classList.toggle('light-mode-active');
    domElements.darkModeDot.classList.toggle('dark-mode-animation-active');

    domElements.darkModeIco.classList.toggle('dark-mode-animation-active');
    domElements.lightModeIco.classList.toggle('light-mode-animation-active');

    domElements.darkModeBtn.classList.toggle('line-under-dark-text-animation');
    domElements.lightModeBtn.classList.toggle('line-under-light-text-animation');
    
    if (document.body.classList.contains('light-mode-active')) {
        domElements.toggleThemeParagraph.textContent = "Modo escuro";
        domElements.toggleThemeIco.classList.remove('bi-sun-fill');
        domElements.toggleThemeIco.classList.add('bi-moon-fill');
    } else {
        domElements.toggleThemeParagraph.textContent = "Modo claro";
        domElements.toggleThemeIco.classList.remove('bi-moon-fill');
        domElements.toggleThemeIco.classList.add('bi-sun-fill');
    };
};

 const hideAddTaskArea = () => {
    domElements.modals[0].classList.remove('show-modal');
    domElements.fade.classList.add('hidden');
};

const showAddTaskArea = () => {
    domElements.addTaskModalArea.classList.remove('hide');
    domElements.confirmDeleteTaskModalArea.classList.add('hide');

    domElements.addTaskInput.value = "";

    domElements.descriptionTaskInput.value = "";

    domElements.categoryTaskInput.value = "";
    domElements.categoryTaskColor.value = "#000000";
    
    document.body.classList.remove('show-edit-task-area');

    domElements.addEditWordToggle.innerHTML = "Adicione";

    domElements.editTaskBtn.classList.add('hidden');
    domElements.addTaskBtn.classList.remove('hidden');

    showModal(0);
};

const showModal = (modal) => {
    domElements.modals[modal].classList.add('show-modal');
    domElements.fade.classList.remove('hidden');
}

// Mostrar botão e span de editar tarefas e imprimir o nome da tarefa atual no input
const showEditTaskArea = task => {

    domElements.addTaskInput.value = task.name;

    if (task.description) domElements.descriptionTaskInput.value = task.description;

    if (task.category) {
        domElements.categoryTaskInput.value = task.category["name"];
        domElements.categoryTaskColor.value = task.category["color"];
    };

    domElements.editTaskBtn.classList.remove('hidden');
    domElements.addTaskBtn.classList.add('hidden');

    domElements.addEditWordToggle.innerHTML = "Edite";

    showModal(0);
};

// Esconder botão e span de editar tarefas
const hideEditTaskArea = () => {
    domElements.addTaskInput.value = "";
    domElements.descriptionTaskInput.value = "";
    document.body.classList.remove('show-edit-task-area');
    domElements.addEditWordToggle.innerHTML = "Adicione";
};

//Lidar com o botão de deletar todas da tarefas
const handleDeleteAllBtnVisibility = () => {
   if (tasksList.length > 1) {
        domElements.deleteTasksListBtn.classList.remove('hide');
    } else {
        domElements.deleteTasksListBtn.classList.add('hide');
    } 
}

//Mostrar modal de confirmação de deletar a tarefa
const confirmTaskDeletion = () => {
    domElements.confirmDeleteTaskModalArea.classList.remove('hide');
    hideModals();
    showModal(1);
}

const showCategoriesModal = () => {
    hideModals();
    showModal(4);
};

//Mostrar modal de renomear usuário
const showUpdateUsernameModal = () => {
    hideModals();
    showModal(2);
}

//Mostrar modal de mudar a senha do usuário
const showUpdatePasswordModal = () => {
    hideModals();
    showModal(3);
}

const hideModals = () => {
    domElements.modals.forEach(modal => {
        modal.classList.remove("show-modal");
    });
    domElements.fade.classList.add('hidden');
}

const togglePasswordVisibility = () => {
    domElements.togglePasswordVisibilityBtn.replaceChildren();

    const i = document.createElement('i');
    i.classList.add('bi');

    if (domElements.newPasswordInput.type === 'text') {
        i.classList.add("bi-eye-fill");
        domElements.newPasswordInput.type = 'password';
    } else {
        i.classList.add("bi-eye-slash-fill");
        domElements.newPasswordInput.type = 'text';
    };

    domElements.togglePasswordVisibilityBtn.appendChild(i);
};

const printCategoryColor = categoryColor => {
    domElements.categoryTaskColor.value = categoryColor;
};

const printCategoriesModal = tasksList => {
    domElements.categoriesArea.replaceChildren();

    const categories = [];

    tasksList.forEach(task => {

        if (categories.length === 0) {
            categories.push(task.category["name"].toLowerCase());
        };

        categories.forEach(category => {
            if (task.category && task.category["name"] && task.category["name"].toLowerCase() !== category) {
                categories.push(task.category["name"].toLowerCase());
            };
        });
    });

    let html = "";

    categories.forEach(category => {
        html += 
        `
            <div class="category">
                <input type="radio" name="categories" id="category-${category}">
                <label for="category-${category}">${category}</label>
            </div>
        `
    });

    if (html === "") return;

    domElements.categoriesArea.innerHTML = html;

    showCategoriesModal();
};

const toggleFiltersAreaVisibility = () => {
    domElements.selectFiltersArea.classList.toggle('show');
    domElements.selectArrow.classList.toggle('rotate');
};

const markFilter = (filterID) => {

    domElements.filters.forEach(filter => filter.classList.remove('marked'));

    const filterPositionPerID = {
        "filter-all": 0,
        "filter-done": 1,
        "filter-not-done": 2,
        "filter-category": 3
    };

    const filterPosition = filterPositionPerID[filterID];

    domElements.filters[filterPosition].classList.add('marked');
};

const printCurrentFilter = (filterID) => {

    const filterNamePerID = {
        "filter-all": "Todas",
        "filter-done": "Concluídas",
        "filter-not-done": "Não concluídas",
        "filter-category": "Categoria"
    };

    const filterName = filterNamePerID[filterID];

    domElements.currentFilterName.textContent = filterName;

};

export {
    printAlertMessage, handleRemovePhotoButtonVisibility, hideLoadingScreen, printUserProfileImage, toggleTheme, hideAddTaskArea, showAddTaskArea, showEditTaskArea, showCategoriesModal, hideEditTaskArea, handleDeleteAllBtnVisibility, confirmTaskDeletion, showUpdateUsernameModal, showUpdatePasswordModal, hideModals, togglePasswordVisibility, printCategoryColor, printCategoriesModal, toggleFiltersAreaVisibility, markFilter, printCurrentFilter
};