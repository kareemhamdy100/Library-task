const config = {
    dbConfig: {
        DB: 'bostatask',
        USER: process.env.DB_USER || 'kareem',
        PASSWORD: process.env.DB_PASSWORD || 'password',
        HOST: process.env.DB_HOST || 'localhost',
        dialect: process.env.DB_DIALECT || 'postgres',

    },

    server: { PORT: 5000 },

};

module.exports = config;
