import { AbstractComponent } from '../framework/view/abstract-component.js';


function createFormAddTaskComponentTemplate() {
  return (
    `<form class="task-adder__wrapper" aria-label="Форма добавления задачи">
        <h2 class="task-adder__title">Новая задача</h2>
        <div class="task-adder__inputs">
          <input
            class="task-adder__input"
            type="text"
            name="task-adder__input"
            id="task-input"
            placeholder="Название задачи"
          />
          <button class="task-adder__button" id="task-adder" type="submit">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10.0833" y="3.66663" width="1.83333" height="14.6667" fill="currentColor" />
              <rect x="18.3333" y="10.0833" width="1.83333" height="14.6667" transform="rotate(90 18.3333 10.0833)"
                fill="currentColor" />
            </svg>
            <p class="task-adder__button-text">Добавить</p>
          </button>
        </div>
      </form>`
  );
}


export default class FormAddTaskComponent extends AbstractComponent {
  #handleClick = null;
  
  constructor({onClick}) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('submit', this.#clickHandler);
  }

  get template() {
    return createFormAddTaskComponentTemplate();
  }

  #clickHandler = (event) => {
    event.preventDefault();
    this.#handleClick();
  }
}
