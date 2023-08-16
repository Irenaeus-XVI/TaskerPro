
import Joi from 'joi';

export const signUpSchema = Joi.object({
    userName: Joi.string().min(1).max(10).required(),
    email: Joi.string().email({ tlds: { allow: ['com', 'outlook', 'lol'] } }).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    age: Joi.number().min(16).max(50).required(),
    gender: Joi.string().valid('male', 'female').required(), // Adjust the valid values as needed
    phone: Joi.string().required()

})
export const signInSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: ['com', 'outlook', 'lol'] } }).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});