// Dependencies
import Sequelize from 'sequelize';

// Configuration
import { $db } from '@config';

// Db Connection
const { database, host, username, password, dialect } = $db();
const sequelize = new Sequelize(database, username, password, {
    host,
    dialect,
    define: {
        underscored: true
    }
});

// Models
const models = {
    User: sequelize.import('./User'),
    Message: sequelize.import('./Message')
};

Object.keys(models).forEach(modelName => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;

export default models;
