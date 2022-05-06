const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

//uso del servicio de autenticacion
const UserService = require('../../../services/user.service');
const service = new UserService();

//estrategia cola y creamos una instancia de la estrategia creada.
//obtenemos lo que necesitamos, y la funcion done para usarla cuando salga bien o mal
const localStrategy = new Strategy(
  {
    //nombres que sel el da para enviar en el json
    usernameField: 'email',
    passwordField: 'password',
  },

  async (email, password, done) => {
    try {
      //obtenemos el email del servicio en la function findEmail
      const user = await service.findEmail(email);
      //validamos que exista y si no lanzamos un error
      if (!user) {
        done(boom.unauthorized(), false);
      }
      //comparmos que el password sea igual al hash de la base de datos

      //REVISAR ESTO
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        done(boom.unauthorized(), false);
      }
      delete user.dataValues.password;
      //usamos done pero null por que no hay error y el user,
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = localStrategy;
