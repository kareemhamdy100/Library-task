const {
    createBookSchema,
    updateBookSchema,
    listingBooksSchema,
} = require('../validator/book');
const { idSchema } = require('../validator/commen.validator');

const validate = require('../validator/validateFunction');
const { createResponse, getListingResponse, getResponse } = require('../utils/response');

module.exports = (bookService) => ({

    createBook: async ({ body }) => {
        const bookData = await validate(body, createBookSchema);

        const newBookData = await bookService.createBook(bookData);

        return createResponse(newBookData);
    },

    getBookById: async ({ params }) => {
        const { bookId } = params;
        const bookObj = await bookService.getBookById(bookId);

        return getResponse(bookObj);
    },
    listingBooks: async ({ queryParams }) => {
        const searchParams = await validate(queryParams, listingBooksSchema);

        const bookList = await bookService.listingBooks(searchParams);

        return getListingResponse(bookList, { page: searchParams.page, limit: searchParams.limit });
    },
    updateBook: async ({ body, params }) => {
        const updateBookData = await validate(body, updateBookSchema);
        const { bookId } = params;
        const validBookId = await validate(bookId, idSchema);

        const bookAfterUpdate = await bookService.updateBook(validBookId, updateBookData);

        return createResponse(bookAfterUpdate);
    },

    deleteBook: async ({ params }) => {
        const { bookId } = params;
        const validBookId = await validate(bookId, idSchema);
        await bookService.deleteBook(validBookId);
    },
});
