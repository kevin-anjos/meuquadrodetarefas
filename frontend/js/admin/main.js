import { getUsers, updateUser, deleteUser } from "./appServices.js";

import { printUsers } from "./printer.js";

const usersTable = document.querySelector('#users-table'); 

(async () => {
    const users = await getUsers();
    document.querySelector('#loading-screen').classList.add('hidden');

    printUsers(users);
})();

let isEditing = false;
let toBeDeletedUserID;

usersTable.addEventListener('click', async (event) => {
    if (event.target.classList.contains("field-button-edit")) {
        const userID = event.target.id.replace("edit-user-", "");
        editUserHandler(userID);
    }

    if (event.target.classList.contains("field-button-cancel-edit")) {
        const userID = event.target.id.replace("cancel-edit-user-", "");
        cancelEditUserHandler(userID);
    }

    if (event.target.classList.contains("field-button-update")) {
        const userID = event.target.id.replace("update-user-", "");
        updateUserHandler(userID);
    };

    if (event.target.classList.contains("field-button-delete")) {
        const userID = event.target.id.replace("delete-user-", "");
        deleteUserHandler(userID);
    }
});


const editUserHandler = userID => {
    if (isEditing) return;

    isEditing = true;

    toggleActionElementsClassList(userID);
}

const cancelEditUserHandler = userID => {
    isEditing = false;

    toggleActionElementsClassList(userID);
}

const toggleActionElementsClassList = userID => {
    const { editButton, cancelEditButton, updateButton, deleteButton, allEditButtons, allFieldsInfo, dataInputs } = getActionElements(userID);

    editButton.classList.toggle('hidden');
    deleteButton.classList.toggle('hidden');

    allEditButtons.forEach(button => button.classList.toggle('disabled'));
    
    allFieldsInfo.forEach(info => info.classList.toggle('hidden'));

    updateButton.classList.toggle('hidden');
    cancelEditButton.classList.toggle('hidden');

    dataInputs.forEach(input => input.classList.toggle('hidden'));
}

const updateUserHandler = async userID => {
    const userInputs = document.querySelectorAll(`.field-input-${userID} input`);

    const [ id, role, name, email, password, tasksList, profilePicture] = userInputs;

    //Lembrar de usar o .value
    await updateUser({id: id.value, role: role.value, name: name.value, email: email.value, password: password.value, tasksList: tasksList.value, profilePicture: profilePicture.value});

    window.location.reload();
}

const deleteUserHandler = async userID => {
    toBeDeletedUserID = userID;

    toggleDeleteUserModal();
}

const getActionElements = userID => {
    const editButton = document.querySelector(`#edit-user-${userID}`);
    const cancelEditButton = document.querySelector(`#cancel-edit-user-${userID}`);
    const updateButton = document.querySelector(`#update-user-${userID}`);
    const deleteButton = document.querySelector(`#delete-user-${userID}`);
    const allEditButtons = document.querySelectorAll('.field-button-edit');

    const allFieldsInfo = document.querySelectorAll(`.field-info-${userID}`);

    const dataInputs = document.querySelectorAll(`.field-input-${userID}`);

    return { editButton, cancelEditButton, updateButton, deleteButton, allEditButtons, allFieldsInfo, dataInputs };
};

const deleteUserModal = document.querySelector('#confirm-delete-user-modal');

deleteUserModal.addEventListener('click', () => toggleDeleteUserModal());

const toggleDeleteUserModal = () => {
    deleteUserModal.classList.toggle('hidden');
};

const confirmDeleteUserBtn = document.querySelector('#confirm-delete-user-btn');

confirmDeleteUserBtn.addEventListener('click', async() => {
    await deleteUser(toBeDeletedUserID);

    window.location.reload();
})