/* eslint-disable no-undef */

/** @type {import('../app/services/userService')} */
const UserService = require('../app/services/userService');

const { User } = require('../app/models');

let userTester;

afterAll(async (done) => {
    await User.destroy({ where: { name: 'Test1' } });
    // db.sequelize.close();
    done();
});

describe('Test the user signup', () => {
    test('It should create a user and signup successfully', async () => {
        const token = await UserService.signup('test@test.com.br', 'test123');

        expect(typeof token).toBe('string');
    });
});

describe('Test the user creation', () => {
    test('It should create a user and receive a User object back', async () => {
        userTester = await UserService.createUser({
            email: 'test1@test.com.br',
            password: 'test123',
            name: 'Test1',
        });

        expect(userTester).toEqual(
            expect.objectContaining({
                email: 'test1@test.com.br',
                name: 'Test1',
            })
        );
    });
});

describe('Test the user update', () => {
    test('It should create a user and receive a User object back', async () => {
        const user = await UserService.updateUser({
            id: userTester.id,
            email: 'test.updated@test.com.br',
        });

        expect(user).toEqual(
            expect.objectContaining({
                email: 'test.updated@test.com.br',
                name: 'Test1',
                id: userTester.id,
                isAdmin: false,
            })
        );
    });
});
