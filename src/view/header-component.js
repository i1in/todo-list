import { createElement } from '../framework/render.js';


function createHeaderComponentTemplate() {
    return (
        `   <header class="task-header">
            <h1 class="task-header__title">Список задач</h1>
        </header>
    `
    );
}


export default class HeaderComponent {
    getTemplate() {
        return createHeaderComponentTemplate();
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
