const Joi = require('joi');

const createBorrowerSchema = Joi.object({
    name: Joi.string().max(300).required(),
    email: Joi.string().email().required(),

});

module.exports = createBorrowerSchema;
