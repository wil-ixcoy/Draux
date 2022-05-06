const boom = require('@hapi/boom');
const config = require('../config/config');

function checkApiKey(req, res, next) {
  const apikey = req.headers['api'];
  if (apikey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized('Invalid API key'));
  }
}
module.exports = {checkApiKey}
