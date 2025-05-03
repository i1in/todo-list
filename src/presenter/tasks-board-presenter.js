import TaskboardAddComponent from "../view/taskboard-component.js";
import TaskboardListComponent from "../view/task-board-list-component.js";
import TaskAddComponent from "../view/task-component.js";
import { render } from "../framework/render.js";
import EmptyTaskComponent from "../view/empty-task-component.js";
import ClearButtonComponent from '../view/clearButton-component.js';
import LoadingViewComponent from "../view/loading-view-component.js";
import { UserAction } from "../const.js";

export default class TasksBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;

    #tasksBoardComponent = new TaskboardAddComponent();
    #loadingComponent = new LoadingViewComponent();

    #boardTasks = [];

    #statusList = [];

    constructor({ boardContainer, tasksModel, statusList }) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
        this.#statusList = statusList;

        this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
        this.clearTrashbin = this.clearTrashbin.bind(this);
    }

    async init() {
        render(this.#loadingComponent, this.#boardContainer);

        try {
            await this.#tasksModel.init();
            
            this.#clearBoard();
            this.#renderBoard();
        } catch (err) {
            console.log('Ошибка загрузки данных: ', err);
        }
    }

    get tasks() {
        return this.#tasksModel.tasks;
    }

    #renderBoard() {
        render(this.#tasksBoardComponent, this.#boardContainer);
        this.#renderTasksList();
    }

    #renderTasksList() {
        this.#statusList.forEach((statusItem) => {
            const tasksListComponent = new TaskboardListComponent({
                status: statusItem,
                onTaskDrop: this.#handleTaskDrop.bind(this),
                tasksModel: this.#tasksModel,
            });

            render(tasksListComponent, this.#tasksBoardComponent.element);

            const tasksForStatus = this.#tasksModel.getTasksByStatus(statusItem.statusId)

            if (tasksForStatus.length === 0) {
                this.#renderEmptyTask(tasksListComponent.element);
                return;
            }

            tasksForStatus.forEach((task) => {
                this.#renderTask(task, tasksListComponent.element);
            });

            if (statusItem.statusId === "trashbin" && tasksForStatus.length > 0) {
                this.#renderClearButton(tasksListComponent.element);
            }
        });
    }

    #renderTask(task, container) {
        const taskComponent = new TaskAddComponent({ task });

        render(taskComponent, container)
    }

    #renderEmptyTask(container) {
        const emptyTaskComponent = new EmptyTaskComponent();

        render(emptyTaskComponent, container)
    }

    #renderClearButton(container) {
        const clearButton = new ClearButtonComponent({
            onClick: this.clearTrashbin
        });

        render(clearButton, container)
    }

    async createTask() {
        const taskTitle = document.querySelector('#task-input').value.trim();
        if (!taskTitle) {
            return;
        }

        try {
            await this.#tasksModel.addTask(taskTitle);
            document.querySelector('#task-input').value = '';
        } catch (err) {
            console.error('Ошибка при создании задачи: ', err);
        }
    }

    async clearTrashbin() {
        try {
            await this.#tasksModel.deleteTrashbinTasks();
        } catch (err) {
            console.error('Ошибка при очистке корзины: ', err);
        }
    }

    #handleModelChange(event, payload) {
        switch (event) {
            case UserAction.ADD_TASK:
                this.#clearBoard();
                this.#renderBoard();
            case UserAction.UPDATE_TASK:
                this.#clearBoard();
                this.#renderBoard();
            case UserAction.DELETE_TASK:
                this.#clearBoard();
                this.#renderBoard();
        }
    }

    async #handleTaskDrop(taskId, newStatus) {
        try {
            await this.#tasksModel.updateTaskStatus(taskId, newStatus);
        } catch (err) {
            console.error('Ошибка при обновлении статуса задачи: ', err);
        }
    }

    #removeLoading() {
        this.#loadingComponent.element.remove();
    }

    #clearBoard() {
        this.#removeLoading();
        this.#tasksBoardComponent.element.innerHTML = '';
    }
}