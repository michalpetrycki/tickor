import Joi from 'joi';

const create = Joi.object({

    id: Joi.number().required().positive().messages({
        'any.required': 'id is required',
        'number.base': 'id should be a number',
        'number.positive': 'id should be a positive number'
    }),
    name: Joi.string().required().max(120).messages({
        'any.required': 'name is required',
        'string.max': 'name exceeds allowed number of characters',
        'string.base': 'name should be a string'
    }),
    kind: Joi.string().allow('company', 'contractor', 'customer').messages({
        'string.base': 'kind should be a string',
        'any.allow': 'kind should be `company`, `contractor` or `customer`'
    })

});

const edit = Joi.object({

    id: Joi.number().required().positive().messages({
        'any.required': 'id is required',
        'number.base': 'id should be a number',
        'number.positive': 'id should be a positive number'
    }),
    name: Joi.string().optional().max(120).messages({
        'string.max': 'name exceeds allowed number of characters',
        'string.base': 'name should be a string'
    }),
    kind: Joi.string().optional().valid('company', 'contractor', 'customer').messages({
        'string.base': 'kind should be a string',
        'any.only': 'kind should be one of [`company`, `contractor` or `customer`]'
    })

});

const deleteCompany = Joi.object({

    id: Joi.number().required().positive().messages({
        'any.required': 'id is required',
        'number.base': 'id should be a number',
        'number.positive': 'id should be a positive number'
    })

});


export default { create, edit, deleteCompany };
