import { createElement } from '../framework/render.js';


function createTaskAddComponentTemplate() {
    return (
        `
        <div class="tasks">
            <div class="task">
              <h3 class="task-title">Название задачи</h3>
            </div>
          </div>
        `
    );
}


export default class TaskAddComponent {
    getTemplate() {
        return createTaskAddComponentTemplate();
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
