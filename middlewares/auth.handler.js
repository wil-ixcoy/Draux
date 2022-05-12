const boom = require('@hapi/boom');
const { config } = require('../config/config');

function checkApiKey(req, res, next) {
  const apikey = req.headers['api'];
  if (apikey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized('Invalid API key'));
  }
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;

    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized('Acceso no autorizado'));
    }
  };
}
module.exports = { checkApiKey, checkRoles };
