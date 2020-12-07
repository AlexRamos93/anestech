/** @type {import('../services/userService')} */
const UserService = require('../services/userService');

class UserController {
    /**
     * Signs up an user and returns a token
     */
    async signup(req, res) {
        try {
            const { email, password } = req.body;

            const token = await UserService.signup(email, password);

            return res.status(200).json({ token });
        } catch (error) {
            console.log('here', error);
            return res
                .status(error.statusCode)
                .json({ message: error.message });
        }
    }

    /**
     * Creates a user agent account
     */
    async createUser(req, res) {
        try {
            const data = req.body;

            const user = await UserService.createUser(data);

            return res.status(200).json(user);
        } catch (error) {
            console.log(error);
            return res
                .status(error.statusCode)
                .json({ message: error.message });
        }
    }

    /**
     * Updates a user
     */
    async updateUser(req, res) {
        try {
            const data = req.body;

            const user = await UserService.updateUser(data);

            return res.status(200).json(user);
        } catch (error) {
            console.log(error);
            return res
                .status(error.statusCode)
                .json({ message: error.message });
        }
    }

    /**
     * Deletes a user
     */
    async deleteUser(req, res) {
        try {
            const userId = req.params.user_id;

            const isDeleted = await UserService.deleteUser(userId);

            return res.status(200).json(isDeleted);
        } catch (error) {
            console.log(error);
            return res
                .status(error.statusCode)
                .json({ message: error.message });
        }
    }

    /**
     * Get all users
     */
    async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();

            return res.status(200).json(users);
        } catch (error) {
            console.log(error);
            return res
                .status(error.statusCode)
                .json({ message: error.message });
        }
    }
}

module.exports = UserController;
