const Joi = require('joi');

const listingBooksSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).default(10),
});

module.exports = listingBooksSchema;
