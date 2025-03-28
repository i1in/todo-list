import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/task-form-component.js';
import TaskboardAddComponent from './view/taskboard-component.js';
import TaskAddComponent from './view/task-component.js';
import ClearButtonComponent from './view/clearButton-component.js';
import { render, renderAll, RenderPosition } from './framework/render.js';


const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-task');
const taskboardSection = document.querySelector(".taskboard");

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), formContainer);
render(new TaskboardAddComponent(), taskboardSection)

const taskboard_list = document.querySelectorAll(".task-board__list");
renderAll(TaskAddComponent, taskboard_list)

render(new ClearButtonComponent(), taskboardSection)