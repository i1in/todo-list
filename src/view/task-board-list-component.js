// task-board-list-component.js
import { createElement } from '../framework/render.js';

function createTaskboardListTemplate(status) {
    console.log(status)
    const { statusId, label } = status;
    return (
        `
        <div class="task-board__list" id="${statusId}">
            <h2 class="task-list__title">${label}</h2>
        </div>
        `
    );
}

export default class TaskboardListComponent {
    constructor({status}) {
        this.status = status;
    }

    getTemplate() {
        return createTaskboardListTemplate(this.status);
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
        }
        return this.element;
    }

    removeElement() {
        this.element = null;
    }
}