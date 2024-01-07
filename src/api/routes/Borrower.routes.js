const express = require('express');

const router = express.Router();

const expressMiddleWare = require('../middlewares/request.middleware');

module.exports = (borrowerController) => {
    router.get('/:borrowerId', expressMiddleWare(borrowerController.getBorrowerById));

    router.get('/', expressMiddleWare(borrowerController.listingBorrowers));
    router.post('/', expressMiddleWare(borrowerController.createBorrower));
    router.put('/:borrowerId', expressMiddleWare(borrowerController.updateBorrower));

    router.delete('/:borrowerId', expressMiddleWare(borrowerController.deleteBorrower));
    return router;
};
