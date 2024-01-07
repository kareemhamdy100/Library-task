const HTTP_CODES = require('../../enums/HTTP_CODES');

module.exports = ({ jwt, UserModel }) => ({
    async checkToken(req, res, next) {
        let token = req.headers.authorization;
        if (!token) {
            const err = new Error('Auth token is not supplied');
            err.status = HTTP_CODES.NOT_AUTHENTICATED;
            return next(err);
        }

        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        try {
            const tokenData = await jwt.verify(token);
            const query = {
                _id: tokenData._id,
                role: tokenData.role,
                status: { $exists: true, $ne: 'DELETED' },
            };

            const user = await UserModel.findOne(query, '_id status role name phone').lean();
            if (user.status !== 'ACTIVE') {
                const err = new Error(`user is ${user.status}`);
                err.status = HTTP_CODES.FORBIDDEN;
                throw err;
            }
            req.user = user;
            return next();
        } catch (err) {
            err.status = err.status || HTTP_CODES.NOT_AUTHENTICATED;
            err.status = err.status === 404 ? HTTP_CODES.NOT_AUTHENTICATED : err.status;
            return next(err);
        }
    },
});
