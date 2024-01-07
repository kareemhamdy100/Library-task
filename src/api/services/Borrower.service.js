const { Op } = require('sequelize');

const HTTP_CODES = require('../../enums/HTTP_CODES');

module.exports = class BorrowerService {
    constructor({ UserModel }) {
        this.UserModel = UserModel;
    }

    /* Could move it to sign_up in auth service */
    async createBorrower(borrowerData) {
        const newBorrower = await this.UserModel.create(borrowerData);
        return newBorrower;
    }

    async getBorrowerById(borrowerId) {
        const borrower = await this.UserModel.findByPk(borrowerId);
        if (!borrower) {
            const error = new Error('BORROWER_NOT_FOUND');
            error.status = HTTP_CODES.NOT_FOUND;
            throw error;
        }
        return borrower;
    }

    async listingBorrowers(searchParams) {
        const { name, email, page, limit } = searchParams;

        const whereClause = {};
        if (email) {
            whereClause.email = email;
        }
        if (name) {
            whereClause.name = { [Op.iLike]: `%${name}%` };
        }

        const offset = (page - 1) * limit;

        const borrowers = await this.UserModel.findAll({
            where: whereClause,

            limit,
            offset,
            explain: true,

        });

        return borrowers;
    }

    async updateBorrower(borrowerId, newData) {
        const borrowerToUpdate = await this.UserModel.findByPk(borrowerId);

        if (!borrowerToUpdate) {
            const err = new Error('Borrower not found');
            err.status = HTTP_CODES.NOT_FOUND;
            throw err;
        }
        const borrowerAfterUpdate = await borrowerToUpdate.update(newData);

        return borrowerAfterUpdate;
    }

    async deleteBorrower(borrowerId) {
        const borrowerToDelete = await this.UserModel.findByPk(borrowerId);

        if (!borrowerToDelete) {
            const err = new Error('Borrower not found');
            err.status = HTTP_CODES.NOT_FOUND;
            throw err;
        }

        await borrowerToDelete.destroy();
    }
};
