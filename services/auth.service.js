const UserService = require('./user.service');
const AdminService = require('./admin.service');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
//uso del servicio de user par aobtener el email
const service = new UserService();
const adminService = new AdminService();
const { config } = require('./../config/config');

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
  async sendRecoveryPassword(email) {
    const emailUser = await service.findEmail(email);
    const emailAdmin = await adminService.findEmailAdmin(email);

    if (emailUser) {
      const tokenNewPassword = await this.tokenRecovery(emailUser);
      const link = `http://myfrontend.com/recovery?token=${tokenNewPassword}`;
      await service.update(emailUser.id, {
        recoveryToken: tokenNewPassword,
      });

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
        subject: 'Recupera tu contraseña',
        text: 'Ingresa a este link para poder crear tu nueva contraseña',
        html: `<b>${link}</b>`,
      });
      return {
        message: `email sent at user${link}`,
      };
      /* seccion para enviar email a administrador */
    } else if (emailAdmin) {
      const tokenNewPasswordAdmin = await this.tokenRecovery(emailAdmin);
      const link = `http://myfrontend.com/recovery?token=${tokenNewPasswordAdmin}`;
      console.log(
        'ESte es el id y el usuario' +
          emailAdmin.id +
          emailAdmin.name +
          emailAdmin.email
      );
      await adminService.update(emailAdmin.id, {
        recoveryToken: tokenNewPasswordAdmin,
      });
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
        subject: 'Recupera tu contraseña',
        text: 'Ingresa a este link para poder crear tu nueva contraseña',
        html: `<b>${link}</b>`,
      });
      return {
        message: 'email sent at admistrator ' + link,
      };
    } else {
      boom.unauthorized();
    }
  }

  async tokenRecovery(email) {
    const payload = {
      sub: email.id,
    };

    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
    return token;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);

      if (user.recoveryToken !== token) {
        return {
          message: 'Token invalido',
        };
      } else {
        const hash = await bcrypt.hash(newPassword, 10);
        await service.update(user.id, { password: hash, recoveryToken: null });
        return {
          message: 'Contraseña cambiada',
        };
      }
    } catch (error) {
      boom.unauthorized();
    }
  }
  async changePasswordAdmin(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const admin = await adminService.findOne(payload.sub);
      if (admin.recoveryToken !== token) {
        return {
          message: 'Token invalido',
        };
      } else {
        const hash = await bcrypt.hash(newPassword, 10);
        await adminService.update(admin.id, {
          password: hash,
          recoveryToken: null,
        });
        return {
          message: 'Contraseña cambiada',
        };
      }
    } catch (error) {
      boom.unauthorized();
    }
  }
}

module.exports = AuthService;
