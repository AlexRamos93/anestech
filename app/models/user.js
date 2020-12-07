// const { Task } = require('./task');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            isAdmin: DataTypes.BOOLEAN,
        },
        {
            hooks: {
                /**
                 * Hashing the password before saving at the db
                 */
                beforeCreate: (user) => {
                    const salt = bcrypt.genSaltSync();
                    user.password = bcrypt.hashSync(user.password, salt);
                },
            },
        }
    );

    /**
     * method to validate the password
     */
    User.prototype.validPassword = async function (password) {
        return bcrypt.compare(password, this.password);
    };

    /**
     * overrinding toJSON method to hide some values
     */
    User.prototype.toJSON = function () {
        let values = Object.assign({}, this.get());

        delete values.password;
        delete values.createdAt;
        delete values.updatedAt;

        return values;
    };

    /**
     * RELATIONSHIPS
     */
    User.associate = (models) => {
        User.hasMany(models.Task, { as: 'tasks', foreignKey: 'id' });
    };

    return User;
};
