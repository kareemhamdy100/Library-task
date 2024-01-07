const HTTP_CODES = require('../../enums/HTTP_CODES');

const getListingResponse = (data, { page, limit }) => ({
    statusCode: HTTP_CODES.OK,
    data: { data, hasNextPage: (data.length >= limit), page, limit, count: data.length },
});

const getResponse = (data) => ({
    statusCode: HTTP_CODES.OK,
    data: { data },
});
const createResponse = (data = {}) => ({
    statusCode: HTTP_CODES.CREATED,
    data: { data },
});

const badRequestResponse = (error) => (
    {
        error,
        statusCode: HTTP_CODES.BAD_REQUEST,
    }
);

const notFoundResponse = (error) => (
    {
        error,
        statusCode: HTTP_CODES.NOT_FOUND,
    }
);

module.exports = {
    getResponse,
    getListingResponse,
    createResponse,
    badRequestResponse,
    notFoundResponse,
};
