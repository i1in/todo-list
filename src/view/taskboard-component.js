import { createElement } from '../framework/render.js';


function createTaskboardAddComponentTemplate() {
    return (
        `<div class="task-board__lists">
            <div class="task-board__list" id="backlog">
                <h2 class="task-list__title">Бэклог</h2>
            </div>
            <div class="task-board__list" id="in-process">
                <h2 class="task-list__title">В процессе</h2>
            </div>
            <div class="task-board__list" id="completed">
                <h2 class="task-list__title">Готово</h2>
            </div>
            <div class="task-board__list" id="trashbin">
                <h2 class="task-list__title">Корзина</h2>
            </div>
        </div>`
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
