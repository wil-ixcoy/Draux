require('dotenv').config();
const { Strategy, ExtractJwt } = require('passport-jwt');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtStategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
});

module.exports = jwtStategy;
