const express = require('express');

const router = express.Router();

const AuthRoutes = require('./Auth.routes');
const BookRoutes = require('./Book.routes');
const BorrowerRoutes = require('./Borrower.routes');
const BorrorBookRoutes = require('./BorrowBook.routes');

module.exports = ({ controllers }) => {
    const {
        authController, bookController, borrowerController,
        borrowBookController,
    } = controllers;
    const authRoutes = AuthRoutes(authController);
    const bookRoutes = BookRoutes(bookController);
    const borrowersRoutes = BorrowerRoutes(borrowerController);
    const borrowBookRoutes = BorrorBookRoutes(borrowBookController);

    router.use('/auth', authRoutes);
    router.use('/books', bookRoutes);
    router.use('/borrowers', borrowersRoutes);
    router.use('/borrowBook', borrowBookRoutes);

    return router;
};
