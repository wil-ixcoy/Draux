//archivo para la conexion a la base de datos con sequelize
const { Sequelize } = require('sequelize');
const config = require('./../config/config');
const { setupModels } = require('./../db/models/index');

const options = {
  dialect: 'postgres',
  logging: config.isProd ? false : true,
};


if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
};

const sequelize = new Sequelize(config.databaseUrl, options);

setupModels(sequelize);

module.exports = sequelize;
