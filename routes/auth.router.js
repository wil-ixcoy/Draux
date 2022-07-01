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
 *
 *    ResponseLogin:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 *      example:
 *       user: [{
 *        id: 1,
 *        name: "Alexander",
 *        lastName: "Tzoc",
 *        country: "Guatemala",
 *        email: "wilicode34@gmail.com",
 *        createdAt: "2020-05-05T17:00:00.000Z",
 *        updatedAt: "2020-05-05T17:00:00.000Z",
 *        role: "user",
 *        }]
 *       token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjUyNjUxNTY5fQ.qd-TIpmLpIiON5SF7_UZCLaXkvmi2xHLm65Pl7Prld4"
 */

/**
 * @swagger
 * /auth/login:
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
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseLogin'
 *      409:
 *       description: email bust be unique
 *      400:
 *       description: Bad request
 *      500:
 *       description: Internal server error
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
 * /auth/recovery:
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
 *       description: Email enviado de manera exitosa
 *      404:
 *       description: Email no encontrado
 *      400:
 *       description: Bad request
 *      500:
 *       description: Internal server error
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
 *        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY1MjMxMTk4NCwiZXhwIjoxNjUyMzEyODg0fQ.QDPqftYvIfATCa3Y-RczXtfj52w1k5d5nK_c6602se6o"
 *        newPassword: "nuevacontraseña"
 */
/**
 * @swagger
 * /auth/change-password:
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
 *       description: Contraseña cambiada
 *      401:
 *       description: Token invalido
 *      400:
 *       description: Bad request
 *      500:
 *       description: Internal server error
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
 * /auth/change-password-admin:
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
 *      401:
 *       description: Token invalido
 *      400:
 *       description: Bad request
 *      500:
 *       description: Internal server error
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
