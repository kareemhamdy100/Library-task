const Joi = require('joi');

const updateBorrowerSchema = Joi.object({
    name: Joi.string().max(300),
    email: Joi.string().email(),

});

module.exports = updateBorrowerSchema;
