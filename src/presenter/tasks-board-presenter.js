import TaskboardAddComponent from "../view/taskboard-component.js";
import TaskboardListComponent from "../view/task-board-list-component.js";
import TaskAddComponent from "../view/task-component.js";
import { render } from "../framework/render.js";
import EmptyTaskComponent from "../view/empty-task-component.js";
import ClearButtonComponent from '../view/clearButton-component.js';

export default class TasksBoardPresenter {
    #boardContainer = null;
    #tasksModel = null; 

    #tasksBoardComponent = new TaskboardAddComponent();

    #boardTasks = [];

    #statusList = [];

    constructor({boardContainer, tasksModel, statusList}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
        this.#statusList = statusList;

        this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
        this.clearTrashbin = this.clearTrashbin.bind(this);
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.tasks]

        this.#renderBoard();
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
            
            if(tasksForStatus.length === 0) {
                this.#renderEmptyTask(tasksListComponent.element);
                return;
            }

            tasksForStatus.forEach((task) => {
                this.#renderTask(task, tasksListComponent.element);
            });

            if(statusItem.statusId === "trashbin" && tasksForStatus.length > 0) {
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
        const clearButton = new ClearButtonComponent({
            onClick: this.clearTrashbin
        });

        render(clearButton, container)
    }

    createTask() {
        const taskTitle = document.querySelector('#task-input').value.trim();
        if (!taskTitle) {
            return;
        }

        this.#tasksModel.addTask(taskTitle);
        
        document.querySelector('#task-input').value = '';
    }

    clearTrashbin() {
        this.#tasksModel.deleteTrashbinTasks();
    }

    #handleModelChange(){
        this.#clearBoard();
        this.#renderBoard();
    }

    #handleTaskDrop(taskId, newStatus) {
        this.#tasksModel.updateTaskStatus(taskId, newStatus)
    }

    #clearBoard() {
        this.#tasksBoardComponent.element.innerHTML = '';
    }
}