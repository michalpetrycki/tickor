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
    kind: Joi.string().valid('administrator', 'robot', 'joe').messages({
        'string.base': 'kind should be a string',
        'any.only': 'kind should be one of [`administrator`, `robot` or `joe`]'
    })

});

const create = Joi.object({

    username: Joi.string().required().max(30).messages({
        'any.required': 'username is required',
        'string.max': 'username exceeds allowed number of characters',
        'string.base': 'username should be a string'
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'email is required',
        'string.email': 'not a valid email address'
    }),
    kind: Joi.string().valid('administrator', 'robot', 'joe').messages({
        'string.base': 'kind should be a string',
        'any.only': 'kind should be one of [`administrator`, `robot` or `joe`]'
    })

});

// const login = Joi.object({
//     email: Joi.string().email().required().messages({
//         'any.required': 'email is required',
//         'string.email': 'not a valid email address'
//     }),
//     password: Joi.string().required().messages({
//         'any.required': 'password is required',
//         'string.base': 'password should be a string'
//     })
// });

const login = Joi.object({
    username: Joi.string().required().messages({
        'any.required': 'username is required',
        'string.base': 'username should be a string'
    }),
    password: Joi.string().required().messages({
        'any.required': 'password is required',
        'string.base': 'password should be a string'
    })
});

const deletePerson = Joi.object({

    id: Joi.number().required().positive().messages({
        'any.required': 'id is required',
        'number.base': 'id should be a number',
        'number.positive': 'id should be a positive number'
    })

});

export default { register, login, create, deletePerson };
