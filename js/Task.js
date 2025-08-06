import { tasksList } from "./tasksManager.js";

//Criar a classe Task
export class Task {
    constructor (name, description) {
        this.name = name;
        this.description = description;
        this.id = tasksList.length;
        this.isDone = false;
    }
}