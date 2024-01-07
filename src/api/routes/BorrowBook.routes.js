const express = require('express');

const router = express.Router();

const expressMiddleWare = require('../middlewares/request.middleware');

module.exports = (borrowBookController) => {
    router.get('/listing', expressMiddleWare(borrowBookController.listingBorrowerBook));
    router.get('/by/:borrowerId/listing', expressMiddleWare(borrowBookController.listingBorrowerBookByUser));

    router.post('/by/:borrowerId/borrowBook/:bookId', expressMiddleWare(borrowBookController.borrowBook));
    router.post('/by/:borrowerId/backBook/:bookId', expressMiddleWare(borrowBookController.backBook));

    return router;
};
