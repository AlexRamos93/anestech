/** @type {import('../services/TaskService')} */
const TaskService = require('../services/taskService');

class TaskController {
    /**
     * Creates a task
     */
    async createTask(req, res) {
        try {
            const data = req.body;

            const task = await TaskService.createTask(data);

            return res.status(200).json(task);
        } catch (error) {
            console.log(error);
            return res
                .status(error.statusCode)
                .json({ message: error.message });
        }
    }

    /**
     * Gets and filters all tasks
     */
    async getAllTasks(req, res) {
        try {
            const data = req.body;

            const tasks = await TaskService.getAllTasks(data);

            return res.status(200).json(tasks);
        } catch (error) {
            console.log(error);
            return res
                .status(error.statusCode)
                .json({ message: error.message });
        }
    }

    /**
     * Start a task only by its owner
     */
    async startTask(req, res) {
        try {
            const { task_id, user_id } = req.params;

            const started = await TaskService.startTask(task_id, user_id);

            return res.status(200).json(started);
        } catch (error) {
            console.log(error);
            return res
                .status(error.statusCode)
                .json({ message: error.message });
        }
    }

    /**
     * End a task only by its owner
     */
    async endTask(req, res) {
        try {
            const { task_id, user_id } = req.params;

            const ended = await TaskService.endTask(task_id, user_id);

            return res.status(200).json(ended);
        } catch (error) {
            console.log(error);
            return res
                .status(error.statusCode)
                .json({ message: error.message });
        }
    }

    /**
     * Updates a description of a Task
     */
    async updateTask(req, res) {
        try {
            const data = req.body;

            const updated = await TaskService.updateTask(data);

            return res.status(200).json(updated);
        } catch (error) {
            console.log(error);
            return res
                .status(error.statusCode)
                .json({ message: error.message });
        }
    }
}

module.exports = TaskController;
