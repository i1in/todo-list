import { createElement } from '../framework/render.js';


function createTaskboardAddComponentTemplate() {
    return (
        `<div class="task-board__lists"></div>`
    );
}


export default class TaskboardAddComponent {
    getTemplate() {
        return createTaskboardAddComponentTemplate();
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
