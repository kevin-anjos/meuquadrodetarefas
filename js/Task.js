import { tasksList } from "./utils.js";

//Criar a classe Task
export class Task {
    constructor (name) {
        this.name = name;
        this.id = tasksList.length;
        this.isDone = false;
    }
}