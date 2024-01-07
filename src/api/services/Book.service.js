const { Op, literal } = require('sequelize');

const HTTP_CODES = require('../../enums/HTTP_CODES');

module.exports = class BookService {
    constructor({ BookModel }) {
        this.BookModel = BookModel;
    }

    async getBookById(bookId) {
        const book = await this.BookModel.findByPk(bookId);
        if (!book) {
            const error = new Error('BOOK_NOT_FOUND');
            error.status = HTTP_CODES.NOT_FOUND;
            throw error;
        }
        return book;
    }

    async createBook(bookData) {
        const newbook = await this.BookModel.create(bookData);
        return newbook;
    }

    async listingBooks(searchParams) {
        const { isbn, author, title, fullTextSearch, page, limit } = searchParams;

        const whereClause = {};
        let replacements = null;
        if (isbn) {
            whereClause.isbn = isbn;
        }
        if (author) {
            whereClause.author = { [Op.iLike]: `%${author}%` };
        }
        if (title) {
            whereClause.title = { [Op.iLike]: `%${title}%` };
        }
        if (fullTextSearch) {
            whereClause.fullTextSearch = literal('"fullTextSearch" @@ to_tsquery(\'simple\', :term)');
            replacements = { term: fullTextSearch };
        }

        const offset = (page - 1) * limit;

        const books = await this.BookModel.findAll({
            where: whereClause,

            replacements,

            limit,
            offset,
            explain: true,

        });

        return books;
    }

    async updateBook(bookId, newData) {
        const bookToUpdate = await this.BookModel.findByPk(bookId);

        if (!bookToUpdate) {
            const err = new Error('Book not found');
            err.status = HTTP_CODES.NOT_FOUND;
            throw err;
        }
        const bookAfterUpdate = await bookToUpdate.update(newData);

        return bookAfterUpdate;
    }

    async deleteBook(bookId) {
        const bookToDelete = await this.BookModel.findByPk(bookId);

        if (!bookToDelete) {
            const err = new Error('Book not found');
            err.status = HTTP_CODES.NOT_FOUND;
            throw err;
        }

        await bookToDelete.destroy();
    }
};
