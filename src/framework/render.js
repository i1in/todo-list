const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};


function createElement(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;


  return newElement.firstElementChild;
}


function render(component, container, place = RenderPosition.BEFOREEND) {
  container.insertAdjacentElement(place, component.getElement());
}

function renderAll(Component, listOfContainers) {
  listOfContainers.forEach((container) => {
    const component = new Component();
    render(component, container);
  });
}


export { RenderPosition, createElement, render, renderAll };
