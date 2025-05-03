const Status = {
    BACKLOG: `backlog`,
    IN_PROCESS: `in-process`,
    COMPLETED: `completed`,
    TRASHBIN: `trashbin`
};

const StatusLabel = {
    [Status.BACKLOG]: `Бэклог`,
    [Status.IN_PROCESS]: `В процессе`,
    [Status.COMPLETED]: `Готово`,
    [Status.TRASHBIN]: `Корзина`
}

const UserAction = {
    UPDATE_TASK: 'UPDATE_TASK',
    ADD_TASK: 'ADD_TASK',
    DELETE_TASK: 'DELETE_TASK'
};

const UpdateType = {
    PATCH: 'PATCH',
    MINOR: 'MINOR',
    MAJOR: 'MAJOR',
    INIT: 'INIT'
};

export { Status, StatusLabel, UserAction, UpdateType }
