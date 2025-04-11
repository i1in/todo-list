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

export { Status, StatusLabel }
