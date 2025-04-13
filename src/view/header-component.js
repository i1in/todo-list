import { createElement } from '../framework/render.js';
import { AbstractComponent } from '../framework/view/abstract-component.js';


function createHeaderComponentTemplate() {
    return (
        `   <header class="task-header">
            <h1 class="task-header__title">Список задач</h1>
        </header>
    `
    );
}


export default class HeaderComponent extends AbstractComponent {
    get template() {
        return createHeaderComponentTemplate();
    }
}
