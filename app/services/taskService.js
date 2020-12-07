const { Task } = require('../models');
const ErrorHandler = require('../errorHandler/errorHandler');

/** @type {import('../objects/constants')} */
const { TASK_STATUS } = require('../objects/constants');

/** @type {import('../helpers/helperFunctions')} */
const { newDate } = require('../helpers/helperFunctions');

class TaskService {
    /**
     * Creates a task
     * @param {object} data
     */
    async createTask(data) {
        const task = await Task.create({
            userId: data.userId,
            description: data.description,
            status: TASK_STATUS.OPEN,
        });

        return task;
    }

    /**
     * Updates a description of a Task
     * @param {object} data
     */
    async updateTask(data) {
        const updated = await Task.update(
            { description: data.description },
            { where: { id: data.id } }
        )
            .then((success) => success)
            .catch((error) => {
                throw new Error(error);
            });

        if (updated) {
            return Task.findOne({ where: { id: data.id } });
        }

        return false;
    }

    /**
     * Gets and filters all tasks
     * @param {object} param
     * @param {object} param.filters
     * @param {String} param.orderBy
     * @param {String} param.order
     */
    async getAllTasks({ filters, orderBy = 'id', order = 'desc' }) {
        const tasks = await Task.findAll({
            where: filters,
            order: [[orderBy, order]],
            include: { association: 'user' },
        });

        return tasks;
    }

    /**
     * Start a task only by its owner
     * @param {number} taskId
     * @param {number} userId
     */
    async startTask(taskId, userId) {
        const task = await Task.findOne({ where: { id: taskId } });

        if (!task) throw new ErrorHandler('Task not found!', 404);

        if (task.userId !== parseInt(userId)) {
            throw new ErrorHandler('Unauthorized', 401);
        }

        if (task.status === TASK_STATUS.DOING) {
            throw new ErrorHandler('Task already started!', 422);
        }

        const started = await Task.update(
            { startDate: newDate(), status: TASK_STATUS.DOING },
            { where: { id: taskId } }
        )
            .then((success) => success)
            .catch((error) => {
                throw new Error(error);
            });

        return started;
    }

    /**
     * End a task only by its owner
     * @param {number} taskId
     * @param {number} userId
     */
    async endTask(taskId, userId) {
        const task = await Task.findOne({ where: { id: taskId } });

        if (!task) throw new Error('Task not found!');

        if (task.userId !== parseInt(userId)) {
            throw new ErrorHandler('Unauthorized', 401);
        }

        if (task.status === TASK_STATUS.OPEN) {
            throw new ErrorHandler("This task isn't started yet", 422);
        }

        if (task.status === TASK_STATUS.FINISHED) {
            throw new ErrorHandler('Task already done!', 422);
        }

        const ended = await Task.update(
            { endDate: newDate(), status: TASK_STATUS.FINISHED },
            { where: { id: taskId } }
        )
            .then((success) => success)
            .catch((error) => {
                throw new Error(error);
            });

        return ended;
    }
}

module.exports = new TaskService();
