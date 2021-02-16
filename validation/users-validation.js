const Joi = require('joi');

// * It requires the username, firstName and lastName, they also have a minLength
const schema = Joi.object({
    username: Joi.string().alphanum().required().min(1),
    firstName: Joi.string().required().min(1),
    lastName: Joi.string().required().min(1),
    age: Joi.number(),
    mail: Joi.string().email()
});

// * Receives an user and validates him, aborts the operation with the first wrong parameter
function validateUser(user) {
    return schema.validate(user, {
        abortEarly: true
    });
}

module.exports = validateUser;