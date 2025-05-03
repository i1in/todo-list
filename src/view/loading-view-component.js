import { AbstractComponent } from "../framework/view/abstract-component.js";

function createNoTaskTemplate() {
    return (
        `<p class="board__no-tasks task-item">
            Loading...
        </p>`
    )
}

export default class LoadingViewComponent extends AbstractComponent {
    get template() {
        return createNoTaskTemplate();
    }
}