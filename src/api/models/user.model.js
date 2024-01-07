const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const UserModel = sequelize.define('user', {
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        name: { type: DataTypes.STRING, allowNull: false },
        isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
    });

    return UserModel;
};
