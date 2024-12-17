class TaskScheduler {
    constructor(config) {
        this.tasks = [];
        this.config = config || {};
    }

addTask(taskName, callback, options = {}) {
    const { time, repeat } = options;
    const task = { taskName, callback, time, repeat};
    this.tasks.push(task);
    this.scheduleTask(task);
}

scheduleTask(task) {
    const { time, repeat } = task;
    const executeTask = () => {
        try {
            task.callback();
        }
        catch (error) {
            console.error(Error executing task ${task, taskName}: error);
        }
        if (repeat) {
            setTimeout(executeTask, repeat);
        }
    };

    const delay = new Date(time) - new Date();
    if (delay > 0) {
        setTimeout(executeTask, delay);
    } else {
        console.warn(Task $ {task.taskName} is scheduled in the past.);
    }
}
}

module.exports = TaskScheduled;

const TaskSCheduler = require('task-scheduler');
const config = require('./config.json');

const scheduler = new TaskScheduler();

config.tasks.forEach(task => {
    scheduler.addTask(task.name, ()=>
    {
        console.log(Executing $ {task.name})
    },
    { time: task.time, repeat: task.repeat });
});