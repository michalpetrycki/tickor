import Joi from 'joi';

const create = Joi.object({

    name: Joi.string().max(40).messages({
        'string.max': 'name exceeds allowed number of characters (40)',
        'string.base': 'name should be a string'
    }),
    kind: Joi.string().max(40).valid('person', 'company').messages({
        'string.max': 'kind exceeds allowed number of characters (40)',
        'string.base': 'kind should be a string',
        'any.only': 'kind should be one of [`person` or `company`]'
    }),
    logo: Joi.string().optional().max(480).messages({
        'string.base': 'logo should be a string',
        'string.max': 'logo exceeds allowed number of characters (400)'
    })

});

const edit = {

    ...create,
    id: Joi.number().required().positive().messages({
        'number.positive': 'id must be a positivie number',
        'number.base': 'id should be an integer'
    })
    
};

const deleteClient = Joi.object({

    id: Joi.number().required().positive().messages({
        'any.required': 'id is required',
        'number.base': 'id should be a number',
        'number.positive': 'id should be a positive number'
    })

});

export default { create, edit, deleteClient };
