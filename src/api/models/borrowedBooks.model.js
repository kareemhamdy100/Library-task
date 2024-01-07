const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const BorrowedBooks = sequelize.define('BorrowedBooks', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        borrowedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        shouldReturnBookAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        returnedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('BORROWED', 'RETURNED'),
            allowNull: true,
        },
    });

    return BorrowedBooks;
};
