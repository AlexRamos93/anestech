'use strict';

module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert('users', [
            {
                name: 'Admin',
                password: 'admin',
                email: 'admin@admin.com.br',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface) => {
        queryInterface.bulkDelete('users', null, {});
    },
};
