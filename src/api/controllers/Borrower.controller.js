const {
    createBorrowerSchema,
    updateBorrowerSchema,
    listingBorrowersSchema,
} = require('../validator/borrower');
const validate = require('../validator/validateFunction');
const { createResponse, getListingResponse, getResponse } = require('../utils/response');
const { idSchema } = require('../validator/commen.validator');

module.exports = (borrowerService) => ({

    createBorrower: async ({ body }) => {
        const borrowerData = await validate(body, createBorrowerSchema);

        const newBorrowerData = await borrowerService.createBorrower(borrowerData);

        return createResponse(newBorrowerData);
    },
    getBorrowerById: async ({ params }) => {
        const { borrowerId } = params;
        const validId = await validate(borrowerId, idSchema);
        const borrowerObject = await borrowerService.getBorrowerById(validId);

        return getResponse(borrowerObject);
    },
    listingBorrowers: async ({ queryParams }) => {
        const searchParams = await validate(queryParams, listingBorrowersSchema);

        const borrowerList = await borrowerService.listingBorrowers(searchParams);

        return getListingResponse(borrowerList, {
            page: searchParams.page,
            limit: searchParams.limit,
        });
    },
    updateBorrower: async ({ body, params }) => {
        const updateBorrowerData = await validate(body, updateBorrowerSchema);
        const { borrowerId } = params;
        const validBorrowerId = await validate(borrowerId, idSchema);
        const borrowerAfterUpdate = await borrowerService.updateBorrower(
            validBorrowerId,
            updateBorrowerData,
        );

        return createResponse(borrowerAfterUpdate);
    },

    deleteBorrower: async ({ params }) => {
        const { borrowerId } = params;
        const validBorrowerId = await validate(borrowerId, idSchema);
        await borrowerService.deleteBorrower(validBorrowerId);
    },
});
