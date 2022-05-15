const express = require('express');
const passport = require('passport');

const validatorHandler = require('../middlewares/validator.handler');
const {
  newPasswordUserSchema,
  newPasswordAdminSchema,
} = require('./../schemas/user.schema');

const AuthService = require('../services/auth.service');
const service = new AuthService();

const router = express.Router();
/**
 *@swagger
 * components:
 *  schemas:
 *    Login:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *        password:
 *          type: string
 *          format: password
 *      required:
 *        - email
 *        - password
 *      example:
 *        email: "wiliamsg200295@gmail.com"
 *        password: "123456789"
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *    description: Login de usuario
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/Login'
 *    responses:
 *      200:
 *       description: Retorna usuario y token
 */

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);
/**
 *@swagger
 * components:
 *  schemas:
 *    Recovery:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *      required:
 *        - email
 *      example:
 *        email: wiliamsg200295@gmail.com
 */

/**
 * @swagger
 * /api/v1/auth/recovery:
 *  post:
 *    description: Login de usuario
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/Recovery'
 *    responses:
 *      200:
 *       description: Email enviado a wiliamsg200295@gmail.com
 */
router.post('/recovery', async (req, res, next) => {
  try {
    const { email } = req.body;
    const rta = await service.sendRecoveryPassword(email);
    res.json(rta);
  } catch (e) {
    next(e);
  }
});
/**
 *@swagger
 * components:
 *  schemas:
 *    ChangePasswordUser:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 *        newPassword:
 *          type: string
 *          format: password
 *      required:
 *        - token
 *        - newPassword
 *      example:
 *        token: "eyasreqfatrdfvwa-.adfqerfasfq34refd.adsfqerfdjywhtrgr"
 *        newPassword: "nuevacontraseña"
 */
/**
 * @swagger
 * /api/v1/auth/change-password:
 *  post:
 *    description: Cambia la contraseña de un usuario
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/ChangePasswordUser'
 *    responses:
 *      200:
 *       description: Return admin y token de acceso
 */
router.post(
  '/change-password',
  validatorHandler(newPasswordUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const response = await service.changePassword(token, newPassword);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /api/v1/auth/change-password-admin:
 *  post:
 *    description: Cambia la contraseña de un administrador
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/ChangePasswordUser'
 *    responses:
 *      200:
 *       description: Contraseña cambiada
 */
router.post(
  '/change-password-admin',
  validatorHandler(newPasswordAdminSchema, 'body'),
  async (req, res, next) => {
    try {
      const { token, newPasswordAdmin } = req.body;
      const response = await service.changePasswordAdmin(
        token,
        newPasswordAdmin
      );
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
