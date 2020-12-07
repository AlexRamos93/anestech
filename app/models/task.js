// const { User } = require('./user');

module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        userId: DataTypes.INTEGER,
        description: DataTypes.STRING,
        status: DataTypes.INTEGER,
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
    });

    /**
     * overrinding toJSON method to hide some values
     */
    Task.prototype.toJSON = function () {
        let values = Object.assign({}, this.get());

        delete values.user.password;
        delete values.user.createdAt;
        delete values.user.updatedAt;
        delete values.updatedAt;

        return values;
    };

    /**
     * RELATIONSHIPS
     */
    Task.associate = (models) => {
        Task.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };

    return Task;
};
