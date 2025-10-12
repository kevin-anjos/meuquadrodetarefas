import { getUsers, updateUser, deleteUser } from "./appServices.js";

import { printUsers } from "./printer.js";

const usersTable = document.querySelector('#users-table'); 

(async () => {
    const users = await getUsers();
    document.querySelector('#loading-screen').classList.add('hidden');

    printUsers(users);
})();

let isEditing = false;

usersTable.addEventListener('dblclick', async (event) => {
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

    const { editButton, cancelEditButton, updateButton, deleteButton, allEditButtons, dataInputs } = getActionElements(userID);

    editButton.classList.add('hidden');
    deleteButton.classList.add('hidden');

    allEditButtons.forEach(button => button.classList.add('disabled'));

    updateButton.classList.remove('hidden');
    cancelEditButton.classList.remove('hidden');

    dataInputs.forEach(input => input.classList.remove('hidden'));
}

const cancelEditUserHandler = userID => {
    isEditing = false;

    const { editButton, cancelEditButton, updateButton, deleteButton, allEditButtons, dataInputs } = getActionElements(userID);

    cancelEditButton.classList.add('hidden');
    updateButton.classList.add('hidden');

    allEditButtons.forEach(button => button.classList.remove('disabled'));

    editButton.classList.remove('hidden');
    deleteButton.classList.remove('hidden');

    dataInputs.forEach(input => input.classList.add('hidden'));
}

const updateUserHandler = async userID => {
    const userInputs = document.querySelectorAll(`.field-input-${userID} input`);

    const [ id, role, name, email, password, tasksList, profilePicture] = userInputs;

    //Lembrar de usar o .value
    await updateUser({id: id.value, role: role.value, name: name.value, email: email.value, password: password.value, tasksList: tasksList.value, profilePicture: profilePicture.value});

    window.location.reload();
}

const deleteUserHandler = async userID => {
    await deleteUser(userID);

    window.location.reload();
}

const getActionElements = userID => {
    const editButton = document.querySelector(`#edit-user-${userID}`);
    const cancelEditButton = document.querySelector(`#cancel-edit-user-${userID}`);
    const updateButton = document.querySelector(`#update-user-${userID}`);
    const deleteButton = document.querySelector(`#delete-user-${userID}`);
    const allEditButtons = document.querySelectorAll('.field-button-edit');

    const dataInputs = document.querySelectorAll(`.field-input-${userID}`);

    console.log({ editButton, cancelEditButton, updateButton, allEditButtons, dataInputs })

    return { editButton, cancelEditButton, updateButton, deleteButton, allEditButtons, dataInputs };
};