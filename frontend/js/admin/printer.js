const usersTable = document.querySelector('#users-table'); 

export const printUsers = users => {
    usersTable.replaceChildren();

    users.forEach((user) => {
        const userDiv = createElementsToBePrinted(user);

        usersTable.appendChild(userDiv);
    });
};

const createField = (id, title, info) => {
    const field = document.createElement('div');
    field.classList.add('field');

    const fieldTitle = document.createElement('p');
    fieldTitle.classList.add('field-title');
    fieldTitle.textContent = title;
    fieldTitle.id = "field-title-" + id;

    const fieldInfo = document.createElement('p');
    fieldInfo.classList.add('field-info');
    fieldInfo.textContent = info;
    fieldTitle.id = "field-info-" + id;

    const fieldInputDiv = document.createElement('div');
    fieldInputDiv.classList.add(`field-input`);
    fieldInputDiv.classList.add(`field-input-${id}`);
    fieldInputDiv.classList.add('hidden');

    const fieldInput = document.createElement('input');
    fieldInput.id = `field-input-${title}-${id}`;
    fieldInput.value = info;

    fieldInputDiv.appendChild(fieldInput);

    [fieldTitle, fieldInfo, fieldInputDiv].forEach(message => field.appendChild(message));

    return field;
}

const createButton = (id, title) => {
    const fieldButton = document.createElement('button');

    if (title === "Editar") {
        fieldButton.classList.add('field-button-edit');
        fieldButton.id = "edit-user-" + id;
    };

    if (title === "Deletar") {
        fieldButton.classList.add('field-button-delete');
        fieldButton.id = "delete-user-" + id;
    };

    if (title === "Cancelar") {
        fieldButton.classList.add('field-button-cancel-edit');
        fieldButton.classList.add('hidden');
        fieldButton.id = "cancel-edit-user-" + id;
    };

    if (title === "Salvar") {
        fieldButton.classList.add('field-button-update');
        fieldButton.classList.add('hidden');
        fieldButton.id = "update-user-" + id;
    };

    fieldButton.textContent = title;

    return fieldButton;
};

const createElementsToBePrinted = user => {
    const userDiv = document.createElement('div');
    userDiv.classList.add('user');

    const h2 = document.createElement('h2');
    h2.textContent = user.name;

    userDiv.appendChild(h2);

    const userFields = document.createElement('div');
    userFields.classList.add('user-fields');

    const userIDField = createField(user.id, "ID", user.id);
    const userRoleField = createField(user.id, "Cargo", user.role);
    const userNameField = createField(user.id, "Nome", user.name);
    const userEmailField = createField(user.id, "Email", user.email);
    const userPasswordField = createField(user.id, "Senha", user.password);
    const userTasksListField = createField(user.id, "Tarefas", user.tasksList);
    const userProfilePictureField = createField(user.id, "Perfil", user.profilePicture);

    const buttonsField = document.createElement('div');
    buttonsField.classList.add('field');

    const editUserBtn = createButton(user.id, "Editar");
    const deleteUserBtn = createButton(user.id, "Deletar");
    const cancelEditUserBtn = createButton(user.id, "Cancelar");
    const updateUserBtn = createButton(user.id, "Salvar");

    [editUserBtn, deleteUserBtn, updateUserBtn, cancelEditUserBtn].forEach(button => buttonsField.appendChild(button));


    [userIDField, userRoleField, userNameField, userEmailField, userPasswordField, userTasksListField, userProfilePictureField, buttonsField].forEach(field => {
        userFields.appendChild(field);
    })

    userDiv.appendChild(userFields);

    return userDiv;
}