const db = require('../models');

/** @type {import('../helpers/helperFunctions')} */
const { formatDate } = require('../helpers/helperFunctions');

/** @type {import('../transformers/indicatorTransformer')} */
const {
    avgTasksTransformer,
    avgTimeTransformer,
} = require('../transformers/indicatorTransformer');

class IndicatorService {
    /**
     * Gets the num of finished tasks by user and total in a period
     * @param {Date} startDate
     * @param {Date} endDate
     */
    async finishedTasks(startDate, endDate) {
        const total = await db.sequelize.query(
            'SELECT COUNT(*) as total FROM tasks where tasks.createdAt BETWEEN ? and ? and tasks.status = 2',
            {
                replacements: [formatDate(startDate), formatDate(endDate)],
                type: db.sequelize.QueryTypes.SELECT,
            }
        );

        const tasksByUser = await db.sequelize.query(
            'SELECT COUNT(*) as num_of_tasks, u.id as user_id, u.name FROM tasks inner join users as u on u.id = tasks.userId where tasks.createdAt BETWEEN ? and ? and tasks.status = 2 GROUP BY u.id',
            {
                replacements: [formatDate(startDate), formatDate(endDate)],
                type: db.sequelize.QueryTypes.SELECT,
            }
        );

        return { by_user: tasksByUser, total };
    }

    /**
     * Gets all tasks by user and returns the avg of finished tasks
     * @param {Date} startDate
     * @param {Date} endDate
     */
    async avgFinishedTasks(startDate, endDate) {
        const tasksByUser = await db.sequelize.query(
            'SELECT u.id, u.name, \
                ( \
                    SELECT COUNT(*) from tasks where u.id = tasks.userId \
                ) as total, \
                ( \
                    SELECT COUNT(*) from tasks where u.id = tasks.userId and status = 2 \
                ) as finished_total \
                from tasks \
                inner join users as u on u.id = tasks.userId \
                where tasks.createdAt BETWEEN ? and ? \
                GROUP BY u.id',
            {
                replacements: [formatDate(startDate), formatDate(endDate)],
                type: db.sequelize.QueryTypes.SELECT,
            }
        );

        return avgTasksTransformer(tasksByUser);
    }

    /**
     * Gets the average time a tasks takes between open and started
     * @param {Date} startDate
     * @param {Date} endDate
     */
    async avgTimeOpenTasks(startDate, endDate) {
        const avgTime = await db.sequelize.query(
            'SELECT AVG(DATEDIFF(startDate, createdAt)) as average_time FROM tasks where tasks.createdAt BETWEEN ? and ? and tasks.status != 2',
            {
                replacements: [formatDate(startDate), formatDate(endDate)],
                type: db.sequelize.QueryTypes.SELECT,
            }
        );

        return avgTimeTransformer(avgTime[0]);
    }

    /**
     * Gets the average time a task takes between started and finished
     * @param {Date} startDate
     * @param {Date} endDate
     */
    async avgTimeFinishedTasks(startDate, endDate) {
        const avgTime = await db.sequelize.query(
            'SELECT AVG(DATEDIFF(startDate, createdAt)) as average_time FROM tasks where tasks.createdAt BETWEEN ? and ? and tasks.status != 0',
            {
                replacements: [formatDate(startDate), formatDate(endDate)],
                type: db.sequelize.QueryTypes.SELECT,
            }
        );

        return avgTimeTransformer(avgTime[0]);
    }
}

module.exports = new IndicatorService();
