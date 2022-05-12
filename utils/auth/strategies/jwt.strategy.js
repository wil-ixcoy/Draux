const { Strategy, ExtractJwt } = require('passport-jwt');

const { config } = require('../../../config/config');
 const key = config.jwtSecret;
setTimeout(() => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: key,
  };

  const JwtStrategy = new Strategy(options, (payload, done) => {
    return done(null, payload);
  });

  module.exports = JwtStrategy;
} , 1000);
