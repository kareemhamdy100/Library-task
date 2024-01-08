const { Op } = require('sequelize');
const HTTP_CODES = require('../../enums/HTTP_CODES');

module.exports = class BorrowerService {
    constructor({ UserModel, BookModel, BorrowBookModel, sequelize }) {
        this.UserModel = UserModel;
        this.BookModel = BookModel;
        this.BorrowBookModel = BorrowBookModel;
        this.sequelize = sequelize;
    }

    async listingBorrowerBook(searchParams) {
        const { isOverdue, status, page, limit } = searchParams;

        const whereClause = {};
        if (status && status !== 'ALL') {
            whereClause.status = status;
        }

        if (isOverdue) {
            whereClause.status = 'BORROWED';
            whereClause.shouldReturnBookAt = { [Op.lt]: new Date() };
        }

        const offset = (page - 1) * limit;

        const borrowers = await this.BorrowBookModel.findAll({
            where: whereClause,
            include: this.BookModel,
            limit,
            offset,
        });

        return borrowers;
    }

    async listingBorrowerBookByUser({ searchParams, borrowerId }) {
        const { status, page, limit } = searchParams;

        const whereClause = { userId: borrowerId };
        if (status && status !== 'ALL') {
            whereClause.status = status;
        }

        const offset = (page - 1) * limit;

        const borrowers = await this.BorrowBookModel.findAll({
            where: whereClause,
            include: this.BookModel,
            limit,
            offset,
        });

        return borrowers;
    }

    async borrowBook({ borrowerId, bookId }) {
        const t = await this.sequelize.transaction();

        try {
            const book = await this.BookModel.findByPk(bookId, { transaction: t });
            if (!book || book.availableQuantity < 1) {
                const error = new Error('Book not available');
                error.status = HTTP_CODES.BAD_REQUEST;
                throw error;
            }
            const existingBorrowedBook = await this.BorrowBookModel.findOne({
                where: {
                    userId: borrowerId,
                    bookId,
                    status: 'BORROWED',
                    returnedAt: null,
                },
                transaction: t,
            });

            if (existingBorrowedBook) {
                const error = new Error('User already borrowed the book and not returned');
                error.status = HTTP_CODES.BAD_REQUEST;
                throw error;
            }

            const twoWeeksLater = new Date(Date.now() + (14 * 24 * 60 * 60 * 1000));

            const borrowedBook = await this.BorrowBookModel.create(
                {
                    userId: borrowerId,
                    bookId,
                    borrowedAt: new Date(),
                    shouldReturnBookAt: twoWeeksLater,
                    status: 'BORROWED',
                },
                { transaction: t },
            );

            await this.BookModel.update(
                { availableQuantity: book.availableQuantity - 1 },
                { where: { id: bookId }, transaction: t },
            );

            await t.commit();

            return borrowedBook;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    async backBook({ borrowerId, bookId }) {
        const t = await this.sequelize.transaction();

        try {
            const borrowedBook = await this.BorrowBookModel.findOne({
                where: {
                    userId: borrowerId,
                    bookId,
                    status: 'BORROWED',
                    returnedAt: null,
                },
                transaction: t,
            });
            if (!borrowedBook) {
                const error = new Error('Book not borrowed by the user or already returned');
                error.status = HTTP_CODES.BAD_REQUEST;
                throw error;
            }
            const borrowBookAfterUpdate = await borrowedBook.update(
                {
                    returnedAt: new Date(),
                    status: 'RETURNED',
                },
                { transaction: t },
            );
            await this.BookModel.increment('availableQuantity', {
                by: 1,
                where: { id: bookId },
                transaction: t,
            });

            await t.commit();
            return borrowBookAfterUpdate;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }
};
