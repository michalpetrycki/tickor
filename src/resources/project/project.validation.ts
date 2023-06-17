import Joi from 'joi';

const create = Joi.object({

    name: Joi.string().required().max(30).messages({
        'any.required': 'name is required',
        'string.max': 'name exceeds allowed number of characters',
        'string.base': 'name should be a string'
    }),
    active: Joi.boolean().required().messages({
        'any.required': 'active is required',
        'boolean.base': 'active should be a boolean'
    }),
    clientID: Joi.number().required().messages({
        'any.required': 'clientID is required',
        'number.base': 'clientID should be a number'
    }),
    logo: Joi.string().required().max(480).messages({
        'any.required': 'logo is required',
        'string.max': 'logo exceeds allowed number of characters',
        'string.base': 'logo should be a string'
    }),

});

const edit = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'name is required',
        'string.base': 'name should be a string'
    }),
    active: Joi.boolean().required().messages({
        'any.required': 'active is required',
        'boolean.base': 'active should be a boolean'
    }),
    clientID: Joi.number().required().messages({
        'any.required': 'clientID is required',
        'number.base': 'clientID should be a number'
    }),
    logo: Joi.string().required().max(480).messages({
        'any.required': 'logo is required',
        'string.max': 'logo exceeds allowed number of characters',
        'string.base': 'logo should be a string'
    }),
});

const remove = Joi.object({

    id: Joi.number().required().positive().messages({
        'any.required': 'id is required',
        'number.base': 'id should be a number',
        'number.positive': 'id should be a positive number'
    })

});

export default { create, edit, remove };
