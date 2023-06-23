import Joi from 'joi';

const create = Joi.object({

    statusID: Joi.number().optional().positive().messages({
        'number.positive': 'statusID must be a positive number',
        'number.base': 'statusID should be an integer'
    }),
    subject: Joi.string().optional().max(400).messages({
        'string.max': 'subject exceeds allowed number of characters (200)',
        'string.base': 'subject should be a string'
    }),
    updated: Joi.string().optional().max(18).messages({
        'string.base': 'updated should be a string',
        'string.max': 'updated exceeds allowed number of characters (18)'
    }),
    name: Joi.string().optional().max(400).messages({
        'string.max': 'subject exceeds allowed number of characters',
        'string.base': 'subject should be a string'
    }),
    categoryID: Joi.number().optional().positive().messages({
        'number.positive': 'categoryID must be a positive number',
        'number.base': 'categoryID should be an integer'
    })

});

const edit = {
    
    ...create, 
    id: Joi.number().required().positive().messages({
        'number.positive': 'id must be a positivie number',
        'number.base': 'id should be an integer'
    })
    
};

const deleteIssueStatus = Joi.object({

    id: Joi.number().required().positive().messages({
        'any.required': 'id is required',
        'number.base': 'id should be a number',
        'number.positive': 'id should be a positive number'
    })

});

export default { create, edit, deleteIssueStatus };
