/** @type {import('../services/indicatorService')} */
const IndicatorService = require('../services/indicatorService');

class IndicatorController {
    /**
     * Gets the num of finished tasks by user and total in a period
     */
    async finishedTasks(req, res) {
        try {
            const { start_date, end_date } = req.params;

            const finshedTasks = await IndicatorService.finishedTasks(
                start_date,
                end_date
            );

            return res.status(200).json(finshedTasks);
        } catch (error) {
            console.log(error);
            return res
                .status(error.statusCode)
                .json({ message: error.message });
        }
    }

    /**
     * Gets all tasks by user and returns the avg of finished tasks
     */
    async avgFinishedTasks(req, res) {
        try {
            const { start_date, end_date } = req.params;

            const tasksByUser = await IndicatorService.avgFinishedTasks(
                start_date,
                end_date
            );

            return res.status(200).json(tasksByUser);
        } catch (error) {
            console.log(error);
            return res
                .status(error.statusCode)
                .json({ message: error.message });
        }
    }

    /**
     * Gets the average time a tasks takes between open and started
     */
    async avgTimeOpenTasks(req, res) {
        try {
            const { start_date, end_date } = req.params;

            const avgTime = await IndicatorService.avgTimeOpenTasks(
                start_date,
                end_date
            );

            return res.status(200).json(avgTime);
        } catch (error) {
            console.log(error);
            return res
                .status(error.statusCode)
                .json({ message: error.message });
        }
    }

    /**
     * Gets the average time a task takes between started and finished
     */
    async avgTimeFinishedTasks(req, res) {
        try {
            const { start_date, end_date } = req.params;

            const avgTime = await IndicatorService.avgTimeFinishedTasks(
                start_date,
                end_date
            );

            return res.status(200).json(avgTime);
        } catch (error) {
            console.log(error);
            return res
                .status(error.statusCode)
                .json({ message: error.message });
        }
    }
}

module.exports = IndicatorController;
