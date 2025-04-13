import { AbstractComponent } from "../framework/view/abstract-component.js";

function createEmptyTaskTemplate() {
    return `
        <div class="task-item task-item__empty task">
            <p class="task-item__empty-title">Нет активных задач</p>
        </div>
    `
}

export default class EmptyTaskComponent extends AbstractComponent {
    
    get template() {
        return createEmptyTaskTemplate();
    }
}