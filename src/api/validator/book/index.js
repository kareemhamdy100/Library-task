const createBookSchema = require('./createBook.validator');
const updateBookSchema = require('./updateBook.validator');
const listingBooksSchema = require('./listingBook.validator');

module.exports = { createBookSchema, updateBookSchema, listingBooksSchema };
