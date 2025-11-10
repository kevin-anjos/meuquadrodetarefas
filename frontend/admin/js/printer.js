const usersTable = document.querySelector('#users-table'); 

export const printUsers = users => {
    usersTable.replaceChildren();

    users.forEach((user) => {
        const userDiv = createElementsToBePrinted(user);

        usersTable.appendChild(userDiv);
    });
};


const createButtons = (id, buttonsType, buttonsArray = []) => {
    if (buttonsType.length === 0) return buttonsArray;

    const fieldButton = document.createElement('button');

    fieldButton.classList.add(`field-button-${buttonsType[0]}`);

    if (buttonsType[0] === "update" || buttonsType[0] === "cancel-edit") {
        fieldButton.classList.add('hidden');
    }

    fieldButton.id = `${buttonsType[0]}-user-${id}`

    const fieldTitles = {
        "edit": "Editar",
        "cancel-edit": "Cancelar",
        "delete": "Deletar",
        "update": "Salvar"
    };

    fieldButton.textContent = fieldTitles[buttonsType[0]];

    buttonsArray.push(fieldButton);

    buttonsType.shift();

    return createButtons(id, buttonsType, buttonsArray);
};

const createFields = (id, fieldsType, fieldsValue, fieldsArray = []) => {
    if (fieldsType.length === 0) return fieldsArray;

    const fieldPossibilities = {
        "id": "ID",
        "role": "Cargo",
        "name": "Nome",
        "email": "E-mail",
        "password": "Senha",
        "tasksList": "Lista",
        "profilePicture": "Perfil"
    };

    const field = document.createElement('div');
    field.classList.add('field');

    const fieldTitle = document.createElement('p');
    fieldTitle.classList.add('field-title');
    fieldTitle.textContent = fieldPossibilities[fieldsType[0]];
    fieldTitle.classList.add(`field-title-${id}`);

    const fieldInfo = document.createElement('p');
    fieldInfo.classList.add('field-info');
    fieldInfo.textContent = fieldsValue[0];
    fieldInfo.classList.add(`field-info-${id}`);

    const fieldInputDiv = document.createElement('div');
    fieldInputDiv.classList.add(`field-input`);
    fieldInputDiv.classList.add(`field-input-${id}`);
    fieldInputDiv.classList.add('hidden');

    const fieldInput = document.createElement('input');
    fieldInput.id = `field-input-${fieldsType[0]}-${id}`;
    fieldInput.value = fieldsValue[0];

    fieldInputDiv.appendChild(fieldInput);

    [fieldTitle, fieldInfo, fieldInputDiv].forEach(message => field.appendChild(message));

    fieldsArray.push(field);
    fieldsType.shift();
    fieldsValue.shift();

    return createFields(id, fieldsType, fieldsValue, fieldsArray);
};

const createElementsToBePrinted = user => {
    const userDiv = document.createElement('div');
    userDiv.classList.add('user');

    const h2 = document.createElement('h2');
    h2.textContent = user.name;

    userDiv.appendChild(h2);

    const userFields = document.createElement('div');
    userFields.classList.add('user-fields');

    const [ userIDField, userRoleField, userNameField, userEmailField, userPasswordField, userTasksListField, userProfilePictureField ] = createFields(user.id, ["id", "role", "name", "email", "password", "tasksList", "profilePicture"], [user.id, user.role, user.name, user.email, user.password, user.tasksList, user.profilePicture]);

    const buttonsField = document.createElement('div');
    buttonsField.classList.add('field');

    const [ editUserBtn, deleteUserBtn, cancelEditUserBtn, updateUserBtn ] = createButtons(user.id, ["edit", "delete", "cancel-edit", "update"]);

    [editUserBtn, deleteUserBtn, updateUserBtn, cancelEditUserBtn].forEach(button => buttonsField.appendChild(button));

    [userIDField, userRoleField, userNameField, userEmailField, userPasswordField, userTasksListField, userProfilePictureField, buttonsField].forEach(field => {
        userFields.appendChild(field);
    })

    userDiv.appendChild(userFields);

    return userDiv;
};