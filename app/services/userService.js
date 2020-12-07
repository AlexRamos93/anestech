require('dotenv').config();
const { User } = require('../models');
const jwt = require('jwt-simple');

const ErrorHandler = require('../errorHandler/errorHandler');

class UserService {
    /**
     * Signs up an user and returns a token
     * @param {string} email
     * @param {string} password
     */
    async signup(email, password) {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new ErrorHandler('User not found', 404);
        }

        const isValidPassword = await user.validPassword(password);

        if (!isValidPassword) {
            throw new ErrorHandler('Email or Password wrong!', 422);
        }

        const token = jwt.encode({ id: user.id }, process.env.SECRET);

        return token;
    }

    /**
     * Creates a user agent account
     * @param {object} data
     */
    async createUser(data) {
        const user = await User.create(data);

        return user;
    }

    /**
     * Updates a user
     * @param {object} data
     */
    async updateUser(data) {
        const updated = await User.update(
            {
                name: data.name || this.name,
                email: data.email || this.email,
                password: data.password || this.password,
            },
            { where: { id: data.id } }
        )
            .then((success) => success)
            .catch((error) => {
                throw new Error(error);
            });

        if (updated) {
            return User.findOne({ where: { id: data.id } });
        }

        return false;
    }

    /**
     * Deletes a user
     * @param {Number} userId
     */
    async deleteUser(userId) {
        const isDeleted = await User.destroy({ where: { id: userId } });

        return isDeleted;
    }

    /**
     * Get all users
     */
    async getAllUsers() {
        const users = await User.findAll();

        return users;
    }
}

module.exports = new UserService();
