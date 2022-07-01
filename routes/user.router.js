const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const UserService = require('../services/user.service');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');

const AuthService = require('../services/auth.service');
const serviceAuth = new AuthService();

const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
  followUserSchema,
} = require('../schemas/user.schema');

const router = express.Router();
const service = new UserService();

/**
 *@swagger
 * components:
 *  schemas:
 *
 *    UserCreate:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        userName:
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
 *        - userName
 *        - lastName
 *        - country
 *        - email
 *        - password
 *      example:
 *        name: "Alexander"
 *        userName: "wilicode34"
 *        lastName: "Tzoc"
 *        country: "Guatemala"
 *        email: "wilicode34@gmail.com"
 *        password: "123456789"
 *
 *    UserUpdate:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        lastName:
 *          type: string
 *        userName:
 *         type: string
 *        country:
 *         type: string
 *        email:
 *          type: string
 *          format: email
 *      example:
 *        name: "Alexander"
 *        lastName: "Tzoc"
 *        userName: "wilicode34"
 *        country: "Guatemala"
 *        email: "wilicode34@gmail.com"
 *
 *    ResponseCreateUser:
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
 *      example:
 *        id: 1
 *        name: "Alexander"
 *        lastName: "Tzoc"
 *        country: "Guatemala"
 *        email: "wilicode34@gmail.com"
 *        createdAt: "2020-05-05T17:00:00.000Z"
 *        updatedAt: "2020-05-05T17:00:00.000Z"
 *        role: "user"
 *        posts: []
 *        comments: []
 *        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY1MjUzNzQyN30.zTXbt6851Mr79mBkje5Bo301msbwQKLdtULOrFc22L0"
 *
 *    ResponseGetAllUser:
 *      type: object
 *      properties:
 *        id:
 *         type: number
 *        name:
 *          type: string
 *        userName:
 *         type: string
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
 *      example:
 *        id: 1
 *        name: "Alexander"
 *        lastName: "Tzoc"
 *        userName: "wilicode34"
 *        country: "Guatemala"
 *        email: "wilicode34@gmail.com"
 *        createdAt: "2020-05-05T17:00:00.000Z"
 *        updatedAt: "2020-05-05T17:00:00.000Z"
 *        role: "user"
 *
 *    ResponseGetOneUser:
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
 *      example:
 *        id: 1
 *        name: "Alexander"
 *        lastName: "Tzoc"
 *        country: "Guatemala"
 *        email: "wilicode34@gmail.com"
 *        createdAt: "2020-05-05T17:00:00.000Z"
 *        updatedAt: "2020-05-05T17:00:00.000Z"
 *        role: "user"
 *        posts: [{
 *         id: 1,
 *         title: "Vue.js",
 *         content: "Es un framework progresivo de JavaScript",
 *         createdAt: "2020-05-05T17:00:00.000Z",
 *         updatedAt: "2020-05-05T17:00:00.000Z",
 *         userId: 1,
 *         categoryId: 1
 *        }]
 *        comments: [{
 *         id: 1,
 *         content: "React es una libreria de JavaScript",
 *         createdAt: "2020-05-05T17:00:00.000Z",
 *         updatedAt: "2020-05-05T17:00:00.000Z",
 *         userId: 1,
 *         postId: 1
 *        }]
 */

/**
 * @swagger
 * /user:
 *  post:
 *    description: Crea un nuevo usuario
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/UserCreate'
 *    responses:
 *      200:
 *       description: Usuario creado
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseCreateUser'
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
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const followed = await service.create(body);
      const user = await service.findOne(followed.id);
      const token = await serviceAuth.signToken(user);
      res.json(token);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/follow/:id',
  validatorHandler(getUserSchema, "params"),
  validatorHandler(followUserSchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('user', 'admin'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const userTo = req.body;
      const data = {
        userId: userTo.userId,
        userFrom: id
      }
      const followed = await service.follow(data);
      res.json(followed);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /user:
 *  get:
 *    description: Obtiene todos los usuarios
 *    tags: [User]
 *    responses:
 *      200:
 *       description: Lista de todos los usuarios
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseGetAllUser'
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
 * /user/{id}:
 *  get:
 *    description: Obtiene un solo usuario
 *    tags: [User]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *    responses:
 *      200:
 *       description: Retorna un usuario
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseGetOneUser'
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
  validatorHandler(getUserSchema, 'params'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('user', 'admin'),
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
 * /user/{id}:
 *  patch:
 *    description: Actualiza un usuario, ni un dato es requerido, se puede cambiar un solo campo o varios
 *    tags: [User]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *    responses:
 *      200:
 *       description: Datos actualizados.retorna todo el usuario
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseGetOneUser'
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
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('user'),
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
 * /user/{id}:
 *  delete:
 *    description: elimina un usuario
 *    tags: [User]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *    responses:
 *      200:
 *       description: Usuario eliminado
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *           message:
 *            type: string
 *          example: "User deleted"
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
  validatorHandler(getUserSchema, 'params'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('user'),
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
