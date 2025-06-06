import { createElement } from '../framework/render.js';
import { AbstractComponent } from '../framework/view/abstract-component.js';


function createTaskAddComponentTemplate(task) {
    const { id, title, status } = task;
    return (
        `
        <div class="task-item task task--${status}" data-id="${id}">
          <div class="task__body">
            <p class="task-title">${title}</p>
            <!-- <input type-"text" style="width: 1px; height: 1px" class="task-input"> -->
          </div>
          <button aria=label="Изменить" data-id="${id}" class="task__edit" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
            </svg>
          </button>
        </div>
        `
    );
}


export default class TaskAddComponent extends AbstractComponent {

    constructor({ task }) {
        super();
        this.task = task;
        this.#afterCreateElement();
    }

    get template() {
        return createTaskAddComponentTemplate(this.task);
    }

    #afterCreateElement() {
      this.#makeTaskDraggable();
    }

    #makeTaskDraggable() {
      this.element.setAttribute(`draggable`, true);

      this.element.addEventListener(`dragstart`, (event) => {
        event.dataTransfer.setData('text/plain', this.task.id)
        event.target.classList.add('task-item__selected');
      })

      this.element.addEventListener(`dragend`, (event) => {
        event.target.classList.remove('task-item__selected');
      })
    }
}
