const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

//uso del servicio de autenticacion
const UserService = require('../../../services/user.service');
const AdminService = require('../../../services/admin.service');
const service = new UserService();
const serviceAdmin = new AdminService();

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
      const admin = await serviceAdmin.findEmailAdmin(email);
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          done(boom.unauthorized(), false);
        }
        delete user.dataValues.password;
        done(null, user);
      } else if (admin) {
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
          done(boom.unauthorized('contraseña de admin'), false);
        }
        delete admin.dataValues.password;
        done(null, admin);
      } else {
        done(boom.unauthorized(), false);
      }
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = localStrategy;
