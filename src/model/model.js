import { AbstractComponent } from "../framework/view/abstract-component.js";
import { tasks } from "../mock/task.js";

export default class TasksModel extends AbstractComponent {
    #boardTasks = tasks;

    get tasks() {
        return this.#boardTasks;
    }
}