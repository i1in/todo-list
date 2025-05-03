const END_POINT = 'https://681529b532debfe95dbb06c5.mockapi.io/api/tasks'
import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/task-form-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import { render, RenderPosition } from './framework/render.js';
import TasksModel from './model/model.js';
import { StatusLabel } from './const.js';
import TasksApiService from './tasks-api-service.js';


const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-task');
const taskboardSection = document.querySelector(".taskboard");

const statusList = Object.entries(StatusLabel).map(([statusId, label]) => ({
    statusId,
    label
}));

const tasksApiService = new TasksApiService(END_POINT);
const tasksModel = new TasksModel({ tasksApiService });
const tasksBoardPresenter = new TasksBoardPresenter(
    {
        boardContainer: taskboardSection,
        tasksModel,
        statusList
    }
)

const formAddTaskComponent = new FormAddTaskComponent({
    onClick: handleNewTaskClick
});

function handleNewTaskClick() {
    tasksBoardPresenter.createTask();
}

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(formAddTaskComponent, formContainer);

tasksBoardPresenter.init()