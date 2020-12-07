'use strict';

/** @type {import('../../../app/objects/constants')} */
const { TASK_STATUS } = require('../../../app/objects/constants');

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('users', [
            {
                name: 'Test',
                password:
                    '$2b$10$JKPwhe4E6bCdBsoTlNEFku4.XtjnW0XQTGOE8zvUYGzHtllkv4hea',
                email: 'test@test.com.br',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);

        const users = await queryInterface.sequelize.query(
            `SELECT id from USERS;`
        );

        const userRows = users[0];

        return await queryInterface.bulkInsert(
            'tasks',
            [
                {
                    description: 'Task 1',
                    userId: userRows[0].id,
                    status: TASK_STATUS.OPEN,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    description: 'Task 2',
                    userId: userRows[0].id,
                    status: TASK_STATUS.FINISHED,
                    createdAt: new Date('2020-12-03'),
                    startDate: new Date('2020-12-04 14:10:00'),
                    endDate: new Date('2020-12-04 17:10:00'),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },
    down: async (queryInterface) => {
        queryInterface.bulkDelete('users', null, {});
        queryInterface.bulkDelete('tasks', null, {});
    },
};
