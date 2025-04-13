import { AbstractComponent } from '../framework/view/abstract-component.js';


function createTaskboardAddComponentTemplate() {
    return (
        `<div class="task-board__lists"></div>`
    );
}


export default class TaskboardAddComponent extends AbstractComponent {
    get template() {
        return createTaskboardAddComponentTemplate();
    }
}
