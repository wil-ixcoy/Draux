const UserService = require('./user.service');
const AdminService = require('./admin.service');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
//uso del servicio de user par aobtener el email
const service = new UserService();
const adminService = new AdminService();
const config = require('./../config/config');

class AuthService {
  //obtenemos el usuario esto con el servicio de user con el metodo findEmail
  async getUser(email, password) {
    const user = await service.findEmail(email);
    const admin = await adminService.findEmailAdmin(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw boom.unauthorized();
      }
      delete user.dataValues.password;
      return user;
    } else if (admin) {
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        throw boom.unauthorized();
      }
      delete admin.dataValues.password;
      return admin;
    } else {
      throw boom.unauthorized();
    }
  }

  signToken(user) {
    //creamos el payload
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token,
    };
  }
  async sendEmail(email) {
    const emailUser = await service.findEmail(email);
    const emailAdmin = await adminService.findEmailAdmin(email);

    if (emailUser) {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: config.email,
          pass: config.emailPassword,
        },
      });
      //envamos el email
      await transporter.sendMail({
        from: config.email,
        to: `${emailUser.email}`,
        subject: 'Este es un correo enviado con node.js',
        text: 'Hola mundo con nodemailer',
        html: '<b>Hola mundo con nodemailer</b>',
      });
      return {
        message: 'email sent at user',
      };
    } else if (emailAdmin) {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: config.email,
          pass: config.emailPassword,
        },
      });
      //envamos el email
      await transporter.sendMail({
        from: config.email,
        to: `${emailAdmin.email}`,
        subject: 'Este es un correo enviado con node.js',
        text: 'Hola mundo con nodemailer',
        html: '<b>Hola mundo con nodemailer</b>',
      });
      return {
        message: 'email sent at admistrator',
      };
    } else {
      boom.unauthorized();
    }
  }
}

module.exports = AuthService;
