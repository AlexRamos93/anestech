const express = require('express');
const UserController = require('../app/controllers/userController');
const TaskController = require('../app/controllers/taskController');
const IndicatorController = require('../app/controllers/indicatorController');
const acl = require('../app/middlewares/acl');
const auth = require('../config/auth')();
// VALIDATION
const { validate } = require('express-validation');
const {
    createUserValidator,
    signupValidator,
    updateUserValidator,
} = require('../app/validators/userValidators');
const {
    createTaskValidator,
    getAllTasksValidator,
    updateTaskValidator,
} = require('../app/validators/taskValidators');

const router = express.Router();
const userController = new UserController();
const taskController = new TaskController();
const indicatorController = new IndicatorController();

/**
 * USER ROUTES
 */
router.post('/signup', validate(signupValidator), userController.signup);

router.post(
    '/user',
    [validate(createUserValidator), acl],
    userController.createUser
);

router.get('/users', acl, userController.getAllUsers);

router.patch(
    '/user',
    [validate(updateUserValidator), acl],
    userController.updateUser
);
router.delete('/user/:user_id', acl, userController.deleteUser);

/**
 * TASK ROUTES
 */
router.post(
    '/task',
    [validate(createTaskValidator), auth.authenticate()],
    taskController.createTask
);

router.post(
    '/tasks',
    [validate(getAllTasksValidator), auth.authenticate()],
    taskController.getAllTasks
);

router.patch(
    '/tasks',
    [validate(updateTaskValidator), auth.authenticate()],
    taskController.getAllTasks
);

router.get(
    '/start-task/:task_id/:user_id',
    auth.authenticate(),
    taskController.startTask
);

router.get(
    '/end-task/:task_id/:user_id',
    auth.authenticate(),
    taskController.endTask
);

/**
 * INDICATOR ROUTES
 */
router.get(
    '/indicator/finished/:start_date/:end_date',
    auth.authenticate(),
    indicatorController.finishedTasks
);
router.get(
    '/indicator/average/:start_date/:end_date',
    auth.authenticate(),
    indicatorController.avgFinishedTasks
);
router.get(
    '/indicator/average-time-open/:start_date/:end_date',
    auth.authenticate(),
    indicatorController.avgTimeOpenTasks
);
router.get(
    '/indicator/average-time-finished/:start_date/:end_date',
    auth.authenticate(),
    indicatorController.avgTimeFinishedTasks
);

module.exports = router;
