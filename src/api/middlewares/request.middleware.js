const HTTP_CODES = require('../../enums/HTTP_CODES');

const requestMiddleware = (handler) => async (req, res, next) => {
    try {
        const result = await handler({
            user: req.user,
            body: req.body,
            params: req.params,
            queryParams: req.query,
            headers: req.headers,
        });
        if (result) {
            const { data, statusCode } = result;
            res.statusCode = statusCode || HTTP_CODES.OK;
            return res.json(data);
        }
        return res.json();
    } catch (error) {
        return next(error);
    }
};

module.exports = requestMiddleware;
