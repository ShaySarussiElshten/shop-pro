import Joi from 'joi';


export const userLogin = Joi.object({
    email: Joi
        .string()
        .email({ minDomainSegments: 2})
        .required(),
    password: Joi
        .string()
        .pattern(new RegExp('^[a-zA-Z0-9]{6,}$'))
        .required()
});