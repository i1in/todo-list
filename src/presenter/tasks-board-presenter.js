import TaskboardAddComponent from "../view/taskboard-component.js";
import TaskboardListComponent from "../view/task-board-list-component.js";
import TaskAddComponent from "../view/task-component.js";
import { render } from "../framework/render.js";
import TasksModel from "../model/model.js";

export default class TasksBoardPresenter {
    tasksBoardComponent = new TaskboardAddComponent();

    #boardContainer = null;
    #tasksModel = null;

    #tasksBoardComponent = new TaskboardAddComponent();

    #boardTasks = [];

    #statusList = [];

    constructor({boardContainer, tasksModel, statusList}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
        this.#statusList = statusList;
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.getTasks()]
        render(this.tasksBoardComponent, this.#boardContainer);

        this.#statusList.forEach((statusItem) => {
            console.log(statusItem)
            const tasksListComponent = new TaskboardListComponent({
                status: statusItem
            });

            render(tasksListComponent, this.tasksBoardComponent.getElement());

            const filteredTasks = this.#boardTasks.filter(
                task => task.status === statusItem.statusId
            );
            console.log(filteredTasks)

            filteredTasks.forEach((task) => {
                const taskComponent = new TaskAddComponent({task});
                render(taskComponent, tasksListComponent.getElement());
            });
        });
    }
}