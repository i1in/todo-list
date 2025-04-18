import { AbstractComponent } from "../framework/view/abstract-component.js";
import { tasks } from "../mock/task.js";
import { generateID } from "../utils.js";

export default class TasksModel extends AbstractComponent {
    #boardTasks = tasks;
    #observers = [];

    get tasks() {
        return this.#boardTasks;
    }

    getTasksByStatus(status) {
        return this.#boardTasks.filter(task => task.status === status);
    }

    addTask(title) {
        const newTask = {
            id: generateID(this.tasks),
            title,
            status: 'backlog', // чтобы появилась кнопка нужно trashbin вместо backlog
        }
        this.#boardTasks.push(newTask);
        this._notifyObservers();
        return newTask;
    }

    deleteTrashbinTasks() {
        this.#boardTasks = this.#boardTasks.filter(task => task.status !== "trashbin");
        this._notifyObservers();
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    removeObserver(observer) {
        this.#observers = this.#observers.filter((obs) => obs !== observer);
    }

    _notifyObservers() {
        this.#observers.forEach((observer) => observer());
    }
}