import Joi from 'joi';

const register = Joi.object({

    username: Joi.string().required().max(30).messages({
        'any.required': 'username is required',
        'string.max': 'username exceeds allowed number of characters',
        'string.base': 'username should be a string'
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'email is required',
        'string.email': 'not a valid email address'
    }),
    password: Joi.string().min(6).required().messages({
        'any.required': 'password is required',
        'string.min': 'password too short',
        'string.base': 'password should be a string'
    }),
    kind: Joi.string().allow('administrator', 'robot', 'joe').messages({
        'any.allow': 'kind should be `administrator`, `robot` or `joe`'
    })

});

const login = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'email is required',
        'string.email': 'not a valid email address'
    }),
    password: Joi.string().required().messages({
        'any.required': 'password is required',
        'string.base': 'password should be a string'
    })
});

export default { register, login };
