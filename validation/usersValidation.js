const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string().alphanum().required().min(1),
    firstName: Joi.string().required().min(1),
    lastName: Joi.string().required().min(1),
    age: Joi.number(),
    mail: Joi.string().email()
});

function validateUser(user) {
    return schema.validateAsync(user);
}

module.exports = validateUser;