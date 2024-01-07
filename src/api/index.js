const express = require('express');

const initDependices = require('./init');
const HTTP_CODES = require('../enums/HTTP_CODES');

module.exports = async (config) => {
    const dependices = await initDependices(config);
    const expressApp = express();
    expressApp.use(express.json());

    expressApp.use('/api', dependices.routers);

    // eslint-disable-next-line no-unused-vars
    expressApp.use((error, req, res, next) => {
        let statusCode = error.status || 500;

        let errorMessage = error.message;
        if (error.message === 'Validation error') {
            statusCode = HTTP_CODES.BAD_REQUEST;
            errorMessage = error.errors[0].message;
        }

        res.status(statusCode).json({ error: errorMessage.replace(/["]+/g, '') });
    });
    return expressApp;
};
