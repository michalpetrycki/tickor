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
    updated: Joi.string().optional().max(19).messages({
        'string.base': 'updated should be a string',
        'string.max': 'updated exceeds allowed number of characters (19)'
    }),
    name: Joi.string().max(400).messages({
        'string.max': 'name exceeds allowed number of characters',
        'string.base': 'name should be a string'
    }),
    categoryID: Joi.number().optional().positive().messages({
        'number.positive': 'categoryID must be a positive number',
        'number.base': 'categoryID should be an integer'
    })

});

const edit = create.keys(
    {
        id: Joi.number().required().positive().messages({
            'number.positive': 'id must be a positivie number',
            'number.base': 'id should be an integer'
        })
    }
);

const deleteIssue = Joi.object({

    id: Joi.number().required().positive().messages({
        'any.required': 'id is required',
        'number.base': 'id should be a number',
        'number.positive': 'id should be a positive number'
    })

});

export default { create, edit, deleteIssue };
