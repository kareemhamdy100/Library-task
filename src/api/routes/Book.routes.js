const express = require('express');

const router = express.Router();

const expressMiddleWare = require('../middlewares/request.middleware');

module.exports = (bookController) => {
    router.get('/', expressMiddleWare(bookController.listingBooks));
    router.get('/:bookId', expressMiddleWare(bookController.getBookById));
    router.post('/', expressMiddleWare(bookController.createBook));
    router.put('/:bookId', expressMiddleWare(bookController.updateBook));

    router.delete('/:bookId', expressMiddleWare(bookController.deleteBook));

    return router;
};
