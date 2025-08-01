import { tasksList } from "./utils.js";

export class Task {
    constructor (name) {
        this.name = name;
        this.id = tasksList.length;
        this.isDone = false;
    }
}