import Observable from '../framework/observable.js';
import { generateID } from "../utils.js";
import { UpdateType, UserAction } from "../const.js";

export default class TasksModel extends Observable {
    #tasksApiService = null;
    #boardTasks = [];
    #observers = [];

    constructor({ tasksApiService }) {
        super();
        this.#tasksApiService = tasksApiService;

        this.#tasksApiService.tasks.then((tasks) => {
            console.log(tasks);
        });
    }

    async init() {
        try {
            const tasks = await this.#tasksApiService.tasks;
            this.#boardTasks = tasks;
        } catch (err) {
            this.#boardTasks = [];
        }
        this._notify(UpdateType.INIT)
    }

    get tasks() {
        return this.#boardTasks;
    }

    getTasksByStatus(status) {
        return this.#boardTasks.filter(task => task.status === status);
    }

    async updateTaskStatus(taskId, newStatus) {
        console.log("updateTaskStatus: ", taskId, newStatus)
        const task = this.#boardTasks.find(task => String(task.id) === taskId);
        console.log("updateTaskStatus (find): ", typeof taskId)
        const previousStatus = task.status
        if (task) {
            task.status = newStatus.statusId;

            try {
                const updatedTask = await this.#tasksApiService.updateTask(task);
                Object.assign(task, updatedTask);
                this._notify(UserAction.UPDATE_TASK, task);
            } catch (err) {
                console.error('Ошибка при обновлении статуса задачи на сервер: ', err);
                task.status = previousStatus;
                throw err;
            }
        }
        console.log("updateTaskStatus (after): ", task, this.#boardTasks)
    }

    async addTask(title) {
        const newTask = {
            id: generateID(this.tasks),
            title,
            status: 'backlog',
        }
        try {
            const createdTask = await this.#tasksApiService.addTask(newTask);
            this.#boardTasks.push(createdTask);
            this._notify(UserAction.ADD_TASK, createdTask);
            return createdTask;
        } catch (err) {
            console.error('Ошибка при добавлении задачи на сервер: ', err);
            throw err;
        }
    }

    deleteTask(taskId) {
        this.#boardTasks = this.#boardTasks.filter(task => task.id !== taskId);
        this._notify(UserAction.DELETE_TASK, { id: taskId });
    }

    async deleteTrashbinTasks() {
        const trashbinTasks = this.#boardTasks.filter(task => task.status === "trashbin");
        
        try {
            await Promise.all(trashbinTasks.map(task => this.#tasksApiService.deleteTask(task.id)));

            this.#boardTasks = this.#boardTasks.filter(task => task.status !== 'trashbin');
            this._notify(UserAction.DELETE_TASK, { status: 'trashbin' });
        } catch (err) {
            console.error('Ошибка при удалении задач из корзины на сервере: ', err);
            throw err;
        }
    }

    hasTrashbinTasks() {
        return this.#boardTasks.some(task => task.status === 'trashbin');
    }

    async swapTasks(firstId, secondId) {
        const firstIndex = this.#boardTasks.findIndex(t => t.id == firstId);
        const secondIndex = this.#boardTasks.findIndex(t => t.id == secondId);
        
        if (firstIndex === -1 || secondIndex === -1) return;
        
        const newTasks = [...this.#boardTasks];
        
        [newTasks[firstIndex], newTasks[secondIndex]] = 
        [newTasks[secondIndex], newTasks[firstIndex]];
        
        this.#boardTasks = newTasks;
        
        this._notify();
    }
}