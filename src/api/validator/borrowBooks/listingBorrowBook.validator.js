const Joi = require('joi');

const listingBorrowBooksSchema = Joi.object({
    isOverdue: Joi.boolean().default(false),
    status: Joi.string().valid('BORROWED', 'RETURNED', 'ALL').default('ALL'),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).default(10),
});

module.exports = listingBorrowBooksSchema;
