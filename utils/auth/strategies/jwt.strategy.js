const config = require('../../../config/config');
const { Strategy, ExtractJwt } = require('passport-jwt');


const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};
const jwtStategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
});

module.exports = jwtStategy;
