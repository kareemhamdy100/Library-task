const Joi = require('joi');

const listingBorrowBooksByUserSchema = Joi.object({
    status: Joi.string().valid('BORROWED', 'RETURNED', 'ALL').default('ALL'),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).default(10),
});

module.exports = listingBorrowBooksByUserSchema;
