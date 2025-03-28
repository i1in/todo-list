import { createElement } from '../framework/render.js';


function createClearButtonTemplate() {
    return (
        `<div class="clear-button">
        <button class="clear-button__red">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              d="M7 4V2h10v2h3v2H4V6h3zm3 2v12h4V6H10zM5 8v12h14V8H5z"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
          <h3>Очистить</h3>
        </button>
      </div>
    `
    );
}


export default class ClearButtonComponent {
    getTemplate() {
        return createClearButtonTemplate();
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
