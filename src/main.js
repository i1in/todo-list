import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/task-form-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import { render, RenderPosition } from './framework/render.js';
import TasksModel from './model/model.js';
import { StatusLabel } from './const.js';


const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-task');
const taskboardSection = document.querySelector(".taskboard");

const statusList = Object.entries(StatusLabel).map(([statusId, label]) => ({
    statusId,
    label
}));

const tasksModel = new TasksModel();
const tasksBoardPresenter = new TasksBoardPresenter(
    {
        boardContainer: taskboardSection,
        tasksModel,
        statusList
    }
)

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), formContainer);

tasksBoardPresenter.init()