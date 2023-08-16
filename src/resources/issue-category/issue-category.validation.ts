import Joi from 'joi';

const create = Joi.object({
    
    name: Joi.string().optional().max(40).messages({
        'string.max': 'subject exceeds allowed number of characters',
        'string.base': 'subject should be a string'
    })

});

const edit = {
    
    ...create, 
    id: Joi.number().required().positive().messages({
        'number.positive': 'id must be a positivie number',
        'number.base': 'id should be an integer'
    })
    
};

const deleteIssue = Joi.object({

    id: Joi.number().required().positive().messages({
        'any.required': 'id is required',
        'number.base': 'id should be a number',
        'number.positive': 'id should be a positive number'
    })

});

export default { create, edit, deleteIssue };
