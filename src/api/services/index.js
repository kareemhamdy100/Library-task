const AuthService = require('./Auth.service');
const BookService = require('./Book.service');
const BorrowerService = require('./Borrower.service');
const BorrowBookService = require('./BorrowBook.service');

module.exports = class Services {
    constructor({ models, sequelize }) {
        const { UserModel, BookModel, BorrowBookModel } = models;

        this.authService = new AuthService({ UserModel });
        this.bookService = new BookService({ BookModel });
        this.borrowerService = new BorrowerService({ UserModel });
        this.borrowBookService = new BorrowBookService({
            UserModel,
            BookModel,
            BorrowBookModel,
            sequelize,
        });
    }
};
