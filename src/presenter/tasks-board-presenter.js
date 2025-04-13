import TaskboardAddComponent from "../view/taskboard-component.js";
import TaskboardListComponent from "../view/task-board-list-component.js";
import TaskAddComponent from "../view/task-component.js";
import { render } from "../framework/render.js";
import EmptyTaskComponent from "../view/empty-task-component.js";
import ClearButtonComponent from '../view/clearButton-component.js';

export default class TasksBoardPresenter {
    #boardContainer = null;
    #tasksModel = null; 

    tasksBoardComponent = new TaskboardAddComponent();

    #boardTasks = [];

    #statusList = [];

    constructor({boardContainer, tasksModel, statusList}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
        this.#statusList = statusList;
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.tasks]
        render(this.tasksBoardComponent, this.#boardContainer);

        this.#renderTasksList()
    }

    #renderTasksList() {
        this.#statusList.forEach((statusItem) => {
            const tasksListComponent = new TaskboardListComponent({
                status: statusItem
            });

            render(tasksListComponent, this.tasksBoardComponent.element);

            const filteredTasks = this.#boardTasks.filter(
                task => task.status === statusItem.statusId
            );
            
            if(filteredTasks.length === 0) {
                this.#renderEmptyTask(tasksListComponent.element);
                return;
            }

            filteredTasks.forEach((task) => {
                this.#renderTask(task, tasksListComponent.element);
            });

            if (statusItem.statusId === "trashbin" && filteredTasks.length > 0) {
                this.#renderClearButton(tasksListComponent.element);
            }
        });
    }

    #renderTask(task, container) {
        const taskComponent = new TaskAddComponent({task});

        render(taskComponent, container)
    }

    #renderEmptyTask(container) {
        const emptyTaskComponent = new EmptyTaskComponent();
        render(emptyTaskComponent, container)
    }

    #renderClearButton(container) {
        const clearButton = new ClearButtonComponent();

        render(clearButton, container)
    }
}