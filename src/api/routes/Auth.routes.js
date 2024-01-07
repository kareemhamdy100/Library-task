const express = require('express');

const router = express.Router();

const expressMiddleWare = require('../middlewares/request.middleware');

module.exports = (authController) => {
    router.post('/sign-up', expressMiddleWare(authController.signUp));
    router.post('/login', expressMiddleWare(authController.login));

    return router;
};
