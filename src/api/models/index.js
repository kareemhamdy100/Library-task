const createUserModel = require('./user.model');
const createBookModel = require('./book.model');
const createBorrowedBooksModel = require('./borrowedBooks.model');

module.exports = async (sequelize) => {
    try {
        await sequelize.authenticate();

        const UserModel = createUserModel(sequelize);
        const { BookModel, bookModelCreateFullTextSearchField } = createBookModel(sequelize);
        const BorrowBookModel = createBorrowedBooksModel(sequelize);

        UserModel.hasMany(BorrowBookModel);
        BorrowBookModel.belongsTo(UserModel);

        BookModel.hasMany(BorrowBookModel);
        BorrowBookModel.belongsTo(BookModel);

        await sequelize.sync({ force: false, alter: false });

        await bookModelCreateFullTextSearchField();

        return { UserModel, BookModel, BorrowBookModel };
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error with connect database', error);
        throw error;
    }
};
