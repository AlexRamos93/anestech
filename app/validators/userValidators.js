const { Joi } = require('express-validation');

exports.signupValidator = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
};

exports.createUserValidator = {
    body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
};

exports.updateUserValidator = {
    body: Joi.object({
        id: Joi.number().required(),
        name: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string(),
    }),
};
