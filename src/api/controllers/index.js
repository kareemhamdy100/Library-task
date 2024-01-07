const AuthController = require('./Auth.controller');
const BookController = require('./Book.controller');
const BorrowBookController = require('./BorrowBook.controller');
const BorrowerController = require('./Borrower.controller');

module.exports = class Controllers {
    constructor({ services }) {
        const { authService, bookService, borrowerService, borrowBookService } = services;

        this.authController = AuthController(authService);
        this.bookController = BookController(bookService);
        this.borrowerController = BorrowerController(borrowerService);
        this.borrowBookController = BorrowBookController(borrowBookService);
    }
};
