import { createElement } from '../framework/render.js';


function createTaskboardListTemplate() {
    return (
        `
        <div class="task-board__list" id="backlog">
            <h2 class="task-list__title">Название списка</h2>
        </div>
        `
    );
}


export default class TaskboardListComponent {
    getTemplate() {
        return createTaskboardListTemplate();
    }


    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
        }
        console.log(this.element)

        return this.element;
    }


    removeElement() {
        this.element = null;
    }
}
