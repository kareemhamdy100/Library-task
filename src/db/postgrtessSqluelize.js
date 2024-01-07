const { Sequelize } = require('sequelize');

module.exports = (config) => {
    const { dbConfig } = config;
    const sequelize = new Sequelize(
        dbConfig.DB,
        dbConfig.USER,
        dbConfig.PASSWORD,

        {
            host: dbConfig.HOST,
            dialect: dbConfig.dialect,
            // logging: false,
        },
    );

    return sequelize;
};
