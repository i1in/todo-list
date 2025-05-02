// task-board-list-component.js
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskboardListTemplate(status) {
    const { statusId, label } = status;
    return (
        `
        <div class="task-board__list" id="${statusId}">
            <h2 class="task-list__title">${label}</h2>
        </div>
        `
    );
}

export default class TaskboardListComponent extends AbstractComponent {
    constructor({ status, onTaskDrop, tasksModel }) {
        super();
        this.status = status;
        this.#setDropHandler(onTaskDrop);
        this.tasksModel = tasksModel;
    }

    get template() {
        return createTaskboardListTemplate(this.status);
    }

    #setDropHandler(onTaskDrop) {
        const container = this.element;

        container.addEventListener('dragover', (event) => {
            event.preventDefault();

            const activeElement = document.querySelector('.task-item__selected');
            if (!activeElement) return;

            const currentElement = event.target.closest('.task-item');
            if (!currentElement || activeElement === currentElement) return;

            container.insertBefore(activeElement, currentElement);

            const activeId = activeElement.dataset.id;
            const currentId = currentElement.dataset.id;
            this.tasksModel.swapTasks(activeId, currentId);
        })

        container.addEventListener('drop', (event) => {
            event.preventDefault();
            const taskId = event.dataTransfer.getData('text/plain');
            onTaskDrop(taskId, this.status);
        });
    }
}