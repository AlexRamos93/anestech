/* eslint-disable no-undef */

/** @type {import('../app/services/taskService')} */
const TaskService = require('../app/services/taskService');

/** @type {import('../app/objects/constants')} */
const { TASK_STATUS } = require('../app/objects/constants');

const { Task, User } = require('../app/models');

// const db = require('../app/models');

let userTester;

beforeAll(async () => {
    userTester = await User.findOne({ where: { name: 'Test' } });
});

afterAll(async (done) => {
    await Task.destroy({ where: { description: 'Test description' } });

    // db.sequelize.close();
    done();
});

describe('Test task creation', () => {
    test('It should create a task return a Task object', async () => {
        const task = await TaskService.createTask({
            userId: userTester.id,
            description: 'Test description',
        });

        expect(task).toEqual(
            expect.objectContaining({
                status: TASK_STATUS.OPEN,
                description: 'Test description',
                userId: userTester.id,
            })
        );
    });
});

describe('Test get all tasks', () => {
    test('It should return an array of tasks ordered desc by id', async () => {
        const tasks = await TaskService.getAllTasks({
            order: 'desc',
            orderBy: 'id',
        });

        expect(tasks).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    status: TASK_STATUS.FINISHED,
                    description: 'Task 2',
                }),
                expect.objectContaining({
                    status: TASK_STATUS.OPEN,
                    description: 'Task 1',
                }),
            ])
        );
    });
});
