const { Strategy } = require('passport-local');

//uso del servicio de autenticacion
const AuthService = require('../../../services/auth.service');
const service = new AuthService();

const localStrategy = new Strategy(
  {
    //nombres que sel el da para enviar en el json
    usernameField: 'email',
    passwordField: 'password',
  },

  async (email, password, done) => {
    try {
      const user = await service.getUser(email, password);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = localStrategy;
