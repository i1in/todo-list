import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/task-form-component.js';
import TaskboardAddComponent from './view/taskboard-component.js';
import TaskboardListComponent from './view/task-board-list-component.js';
import TaskAddComponent from './view/task-component.js';
import ClearButtonComponent from './view/clearButton-component.js';
import { render, RenderPosition } from './framework/render.js';


const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-task');
const taskboardSection = document.querySelector(".taskboard");

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), formContainer);
render(new TaskboardAddComponent(), taskboardSection)

const taskboard_lists = document.querySelector(".task-board__lists");

for (let i = 0; i < 4; i++) {
    const component = new TaskboardListComponent();
    render(component, taskboard_lists); 
    const taskBoardList = document.querySelectorAll(".task-board__list")[i];
    if (taskBoardList) {
        for(let j = 0; j < 3; j++) {
            render(new TaskAddComponent(), taskBoardList);
        }
    }
}

render(new ClearButtonComponent(), taskboardSection)