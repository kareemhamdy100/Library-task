const Joi = require('joi');

const listingBooksSchema = Joi.object({
    isbn: Joi.string(),
    author: Joi.string(),
    title: Joi.string(),
    fullTextSearch: Joi.string(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).default(10),
});

module.exports = listingBooksSchema;
