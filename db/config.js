const config = require('./../config/config');

module.exports = {
  development: {
    url:config.databaseUrl,
    dialect: 'postgres',
  },
  production: {
    url:config.databaseUrl,
    dialect: 'postgres',
    dialectOptions: {
      ssl:{
        rejectUnauthorized: false
      }
    }
  }
}

