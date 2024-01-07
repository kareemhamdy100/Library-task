const validate = require('../validator/validateFunction');
const { createResponse, getListingResponse } = require('../utils/response');
const { idSchema } = require('../validator/commen.validator');
const { listingBorrowBooksSchema, listingBorrowBooksByUserSchema } = require('../validator/borrowBooks');

module.exports = (borrowerBookService) => ({

    listingBorrowerBook: async ({ queryParams }) => {
        const searchParams = await validate(queryParams, listingBorrowBooksSchema);

        const borrowerList = await borrowerBookService.listingBorrowerBook(searchParams);

        return getListingResponse(borrowerList, {
            page: searchParams.page,
            limit: searchParams.limit,
        });
    },

    listingBorrowerBookByUser: async ({ queryParams, params }) => {
        const { borrowerId } = params;

        const validBorrowId = await validate(borrowerId, idSchema);

        const searchParams = await validate(queryParams, listingBorrowBooksByUserSchema);

        const borrowerList = await borrowerBookService.listingBorrowerBookByUser({
            searchParams,
            borrowerId: validBorrowId,
        });

        return getListingResponse(borrowerList, {
            page: searchParams.page,
            limit: searchParams.limit,
        });
    },

    borrowBook: async ({ params }) => {
        const { borrowerId, bookId } = params;
        const validBorrowId = await validate(borrowerId, idSchema);
        const validBookId = await validate(bookId, idSchema);

        const borrowBookResult = await borrowerBookService.borrowBook({
            bookId: validBookId,
            borrowerId: validBorrowId,
        });

        return createResponse(borrowBookResult);
    },
    backBook: async ({ params }) => {
        const { borrowerId, bookId } = params;
        const validBorrowId = await validate(borrowerId, idSchema);
        const validBookId = await validate(bookId, idSchema);

        const backBookResult = await borrowerBookService.backBook({
            bookId: validBookId,
            borrowerId: validBorrowId,
        });

        return createResponse(backBookResult);
    },
});
