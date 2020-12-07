const { Joi } = require('express-validation');

exports.createTaskValidator = {
    body: Joi.object({
        userId: Joi.number().required(),
        description: Joi.string().required(),
    }),
};

exports.updateTaskValidator = {
    body: Joi.object({
        taskId: Joi.number().required(),
        description: Joi.string(),
    }),
};

exports.getAllTasksValidator = {
    body: Joi.object({
        orderBy: Joi.string(),
        order: Joi.string(),
        filters: Joi.object({
            description: Joi.string(),
            status: Joi.number(),
        }),
    }),
};
