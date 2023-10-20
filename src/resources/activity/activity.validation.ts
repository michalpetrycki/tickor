import Joi from 'joi';

const create = Joi.object({

    clientID: Joi.number().optional().positive().messages({
        'number.positive': 'clientID must be a positive number',
        'number.base': 'clientID should be an integer'
    }),
    personID: Joi.number().optional().positive().messages({
        'number.positive': 'personID must be a positive number',
        'number.base': 'personID should be an integer'
    }),
    projectID: Joi.number().optional().positive().messages({
        'number.positive': 'projectID must be a positive number',
        'number.base': 'projectID should be an integer'
    }),
    issueID: Joi.number().optional().positive().messages({
        'number.positive': 'issueID must be a positive number',
        'number.base': 'issueID should be an integer'
    }),
    issueCategoryID: Joi.number().optional().positive().messages({
        'number.positive': 'issueCategoryID must be a positive number',
        'number.base': 'issueCategoryID should be an integer'
    }),
    issueStatusID: Joi.number().optional().positive().messages({
        'number.positive': 'issueStatusID must be a positive number',
        'number.base': 'issueStatusID should be an integer'
    }),
    // activityDate: Joi.string().optional().max(400).messages({
    //     'string.max': 'subject exceeds allowed number of characters (200)',
    //     'date.base': 'activityDate should be a string'
    // }),
    // updated: Joi.string().optional().max(400).messages({
    //     'string.max': 'subject exceeds allowed number of characters (200)',
    //     'date.base': 'activityDate should be a string'
    // }),
    activityType: Joi.string().max(40).messages({
        'string.max': 'activityType exceeds allowed number of characters',
        'string.base': 'activityType should be a string'
    }),
    activityDetails: Joi.string().max(4000).messages({
        'string.max': 'activityDetails exceeds allowed number of characters',
        'string.base': 'activityDetails should be a string'
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

const deleteActivity = Joi.object({

    id: Joi.number().required().positive().messages({
        'any.required': 'id is required',
        'number.base': 'id should be a number',
        'number.positive': 'id should be a positive number'
    })

});

export default { create, edit, deleteActivity };
