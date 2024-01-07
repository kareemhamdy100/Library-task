const Joi = require('joi');

const createBookSchema = Joi.object({
    title: Joi.string().max(300),
    author: Joi.string().max(300),
    availableQuantity: Joi.number().integer().min(0),
    isbn: Joi.string().max(100),
    shelfLocation: Joi.string().max(50),
});

module.exports = createBookSchema;
