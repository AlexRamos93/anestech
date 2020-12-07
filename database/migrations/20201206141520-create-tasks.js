'use strict';

module.exports = {
    up: async (queryInterface, DataTypes) => {
        return queryInterface.createTable('Tasks', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            userId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            startDate: {
                allowNull: true,
                type: DataTypes.DATE,
            },
            endDate: {
                allowNull: true,
                type: DataTypes.DATE,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        });
    },

    down: async (queryInterface) => {
        return queryInterface.dropTable('Tasks');
    },
};
