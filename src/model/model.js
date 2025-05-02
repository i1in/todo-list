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

    updateTaskStatus(taskId, newStatus) {
        console.log("updateTaskStatus: ", taskId, newStatus)
        const task = this.#boardTasks.find(task => String(task.id) === taskId);
        console.log("updateTaskStatus (find): ", typeof taskId)
        if (task) { 
            task.status = newStatus.statusId;
            this._notifyObservers();
        }
        console.log("updateTaskStatus (after): ", task, this.#boardTasks)
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

    swapTasks(firstId, secondId) {
        const firstIndex = this.#boardTasks.findIndex(t => t.id == firstId);
        const secondIndex = this.#boardTasks.findIndex(t => t.id == secondId);
        
        if (firstIndex === -1 || secondIndex === -1) return;
        
        const newTasks = [...this.#boardTasks];
        
        [newTasks[firstIndex], newTasks[secondIndex]] = 
        [newTasks[secondIndex], newTasks[firstIndex]];
        
        this.#boardTasks = newTasks;
        
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