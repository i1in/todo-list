// task-board-list-component.js
import { createElement } from '../framework/render.js';
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
    constructor({status}) {
        super();
        this.status = status;
    }

    get template() {
        return createTaskboardListTemplate(this.status);
    }
}