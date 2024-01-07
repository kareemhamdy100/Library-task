const Services = require('./services');
const Controllers = require('./controllers');
const Routes = require('./routes');
const sequelizePostgres = require('../db/postgrtessSqluelize');
const Models = require('./models');

module.exports = async (config) => {
    const sequelize = sequelizePostgres(config);

    const models = await Models(sequelize);
    const services = new Services({ models, sequelize });
    const controllers = new Controllers({ services });
    const routers = Routes({ controllers });

    return {
        models,
        services,
        controllers,
        routers,
    };
};
