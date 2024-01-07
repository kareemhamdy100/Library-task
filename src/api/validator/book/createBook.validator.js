const Joi = require('joi');

const createBookSchema = Joi.object({
    title: Joi.string().max(300).required(),
    author: Joi.string().max(300).required(),
    availableQuantity: Joi.number().integer().min(0).required(),
    isbn: Joi.string().max(100).required(),
    shelfLocation: Joi.string().max(50).required(),
});

module.exports = createBookSchema;
