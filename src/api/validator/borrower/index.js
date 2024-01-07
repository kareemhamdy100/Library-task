const createBorrowerSchema = require('./createBorrower.validator');
const updateBorrowerSchema = require('./updateBorrower.validator');
const listingBorrowersSchema = require('./listingBorrower.validator');

module.exports = { createBorrowerSchema, updateBorrowerSchema, listingBorrowersSchema };
