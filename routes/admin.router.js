const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const AdminService = require('../services/admin.service');

const AuthService = require('../services/auth.service');
const serviceAuth = new AuthService();
const {
  createAdminSchema,
  getAdminSchema,
  updateAdminSchema,
} = require('../schemas/admin.schema');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');
const router = express.Router();
const service = new AdminService();

/**
 *@swagger
 * components:
 *  schemas:
 *    AdminCreate:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        lastName:
 *          type: string
 *        country:
 *         type: string
 *        email:
 *          type: string
 *          format: email
 *        password:
 *          type: string
 *          format: password
 *      required:
 *        - name
 *        - lastName
 *        - country
 *        - email
 *        - password
 *      example:
 *        name: "Williams"
 *        lastName: "Ixcoy"
 *        country: "Guatemala"
 *        email: "wiliamsg200295@gmail.com"
 *        password: "123456789"
 *    AdminUpdate:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        lastName:
 *          type: string
 *        country:
 *         type: string
 *        email:
 *          type: string
 *          format: email
 *      example:
 *        name: "Williams"
 *        lastName: "Ixcoy"
 *        country: "Guatemala"
 *        email: "wiliamsg200295@gmail.com"
 *
 *    ResponseCreate:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        name:
 *          type: string
 *        lastName:
 *          type: string
 *        country:
 *         type: string
 *        email:
 *          type: string
 *          format: email
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 *        categories:
 *         type: array
 *        token:
 *          type: string
 *      required:
 *        - name
 *        - lastName
 *        - country
 *        - email
 *        - createdAt
 *        - updatedAt
 *        - token
 *      example:
 *        id: 1
 *        name: "Williams"
 *        lastName: "Ixcoy"
 *        country: "Guatemala"
 *        email: "wiliamsg200295@gmail.com"
 *        createdAt: "2020-05-05T17:00:00.000Z"
 *        updatedAt: "2020-05-05T17:00:00.000Z"
 *        categories: []
 *        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY1MjUzNzQyN30.zTXbt6851Mr79mBkje5Bo301msbwQKLdtULOrFc22L0"
 *
 *    ResponseGetAll:
 *      type: object
 *      properties:
 *        id:
 *         type: number
 *        name:
 *          type: string
 *        lastName:
 *          type: string
 *        country:
 *         type: string
 *        email:
 *          type: string
 *          format: email
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 *        role:
 *         type: string
 *      required:
 *        - name
 *        - lastName
 *        - country
 *        - email
 *        - createdAt
 *        - updatedAt
 *      example:
 *        id: 1
 *        name: "Williams"
 *        lastName: "Ixcoy"
 *        country: "Guatemala"
 *        email: "wiliamsg200295@gmail.com"
 *        createdAt: "2020-05-05T17:00:00.000Z"
 *        updatedAt: "2020-05-05T17:00:00.000Z"
 *        role: "admin"
 *
 *    ResponseGetOne:
 *      type: object
 *      properties:
 *        id:
 *         type: number
 *        name:
 *          type: string
 *        lastName:
 *          type: string
 *        country:
 *         type: string
 *        email:
 *          type: string
 *          format: email
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 *        role:
 *         type: string
 *        categories:
 *         type: object
 *      required:
 *        - name
 *        - lastName
 *        - country
 *        - email
 *        - createdAt
 *        - updatedAt
 *      example:
 *        id: 1
 *        name: "Williams"
 *        lastName: "Ixcoy"
 *        country: "Guatemala"
 *        email: "wiliamsg200295@gmail.com"
 *        createdAt: "2020-05-05T17:00:00.000Z"
 *        updatedAt: "2020-05-05T17:00:00.000Z"
 *        role: "admin"
 *        categories: []
 */

/**
 * @swagger
 * /admin:
 *  post:
 *    description: Crea un nuevo administrador
 *    tags: [Admin]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/AdminCreate'
 *    responses:
 *      200:
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseCreate'
 *      409:
 *       description: email bust be unique
 *      400:
 *       description: Bad request
 *      500:
 *       description: Internal server error
 *
 */
router.post(
  '/',
  validatorHandler(createAdminSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newAdmin = await service.create(body);
      const admin = await service.findOne(newAdmin.id);
      const token = serviceAuth.signToken(admin);
      res.json(token);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /admin:
 *  get:
 *    description: Obtiene todos los administradores
 *    tags: [Admin]
 *    responses:
 *      200:
 *       description: Lista de administradores
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseGetAll'
 *      400:
 *       description: Bad request
 *      401:
 *       description: unauthorized
 *      409:
 *       description: conflict
 *      500:
 *       description: Internal server error
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const allUsers = await service.findAll();
      res.json(allUsers);
    } catch (err) {
      next(err);
    }
  }
);
/**
 * @swagger
 * /admin/{id}:
 *  get:
 *    description: Obtiene todos los administradores
 *    tags: [Admin]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *    responses:
 *      200:
 *       description: Lista de administradores
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseGetAll'
 *      400:
 *       description: Bad request
 *      401:
 *       description: unauthorized
 *      404:
 *       description: Admin not found
 *      409:
 *       description: conflict
 *      500:
 *       description: Internal server error
 */
router.get(
  '/:id',
  validatorHandler(getAdminSchema, 'params'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /admin/{id}:
 *  patch:
 *    description: Actualiza un administrador, ni un dato es requerido, se puede cambiar un solo campo o varios
 *    tags: [Admin]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/AdminUpdate'
 *    responses:
 *      200:
 *       description: Datos actualizados
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseGetOne'
 *      400:
 *       description: Bad request
 *      401:
 *       description: unauthorized
 *      404:
 *       description: Admin not found
 *      409:
 *       description: conflict
 *      500:
 *       description: Internal server error
 */
router.patch(
  '/:id',
  validatorHandler(getAdminSchema, 'params'),
  validatorHandler(updateAdminSchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedUser = await service.update(id, body);
      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /admin/{id}:
 *  delete:
 *    description: elimina un administrador
 *    tags: [Admin]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *    responses:
 *      200:
 *       description: Administrador eliminado correctamente
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *           message:
 *            type: string
 *          example: "Admin delete"
 *      400:
 *       description: Bad request
 *      401:
 *       description: unauthorized
 *      404:
 *       description: Admin not found
 *      409:
 *       description: conflict
 *      500:
 *       description: Internal server error
 */
router.delete(
  '/:id',
  validatorHandler(getAdminSchema, 'params'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedUser = await service.delete(id);
      res.json(deletedUser);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
