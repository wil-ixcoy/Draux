const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const ComentaryService = require('../services/comentary.service');
const {
  createComentarySchema,
  updateComentarySchema,
  getComentarySchema,
} = require('../schemas/comentary.schema');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');

const router = express.Router();
const service = new ComentaryService();

/**
 *@swagger
 * components:
 *  schemas:
 *
 *    ComentaryCreate:
 *      type: object
 *      properties:
 *        content:
 *          type: string
 *        UserId:
 *          type: number
 *        postId:
 *          type: number
 *      required:
 *        - content
 *        - userId
 *        - postId
 *      example:
 *        content: "Me gusta el post"
 *        userId: 2
 *        postId: 1
 *
 *    ComentaryUpdate:
 *      type: object
 *      properties:
 *        content:
 *          type: string
 *      example:
 *        content: "Muy muy buen post"
 *
 *    ResponseCreateComentary:
 *      type: object
 *      properties:
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 *        id:
 *          type: number
 *        content:
 *          type: string
 *        UserId:
 *         type: number
 *        postId:
 *         type: number
 *      example:
 *        id: 1
 *        content: "Me gusta el post"
 *        createdAt: "2020-05-05T17:00:00.000Z"
 *        updatedAt: "2020-05-05T17:00:00.000Z"
 *        userId: 2
 *        postId: 1
 *
 *    ResponseGetOneComentary:
 *      type: object
 *      properties:
 *        id:
 *         type: number
 *        title:
 *          type: string
 *        content:
 *          type: string
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 *        userId:
 *         type: number
 *        postId:
 *         type: number
 *      example:
 *        id: 1
 *        content: "Me gusta el post"
 *        createdAt: "2020-05-05T17:00:00.000Z"
 *        updatedAt: "2020-05-05T17:00:00.000Z"
 *        userId: 2
 *        postId: 1
 *        user: [{
 *         id: 2,
 *         name: "Wiliams",
 *         lastName: "Tzoc",
 *         country: "Guatemala",
 *         email: "wilicode34@gmail.com",
 *         createdAt: "2020-05-05T17:00:00.000Z",
 *         updatedAt: "2020-05-05T17:00:00.000Z",
 *         role: "user",
 *        }]
 *        post: [{
 *         id: 1,
 *         title: "Proyecto hecho con express.js",
 *         content: "API de un blogpost realizdo con express, postgress y sequelize",
 *         createdAt: "2020-05-05T17:00:00.000Z",
 *         updatedAt: "2020-05-05T17:00:00.000Z",
 *         userId: 2,
 *         categoryId: 1
 *        }]
 *
 */

/**
 * @swagger
 * /comentary:
 *  post:
 *    description: Crea un nuevo comentario
 *    tags: [Comentary]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/ComentaryCreate'
 *    responses:
 *      200:
 *       description: Categoria creada
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseGetOneComentary'
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
  validatorHandler(createComentarySchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('user'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newComentary = await service.create(body);
      res.json(newComentary);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /comentary:
 *  get:
 *    description: Obtiene todos los comentarios
 *    tags: [Comentary]
 *    responses:
 *      200:
 *       description: Lista de comentarios
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseCreateComentary'
 *      400:
 *       description: Bad request
 *      401:
 *       description: unauthorized
 *      409:
 *       description: conflict
 *      500:
 *       description: Internal server error
 */
router.get('/', async (req, res, next) => {
  try {
    const allComentaries = await service.findAll();
    res.json(allComentaries);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /comentary/{id}:
 *  get:
 *    description: Obtiene un solo comentario
 *    tags: [Comentary]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *    responses:
 *      200:
 *       description: Retorna un comentario
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseGetOneComentary'
 *      400:
 *       description: Bad request
 *      401:
 *       description: unauthorized
 *      404:
 *       description: Comentary not found
 *      409:
 *       description: conflict
 *      500:
 *       description: Internal server error
 */
router.get(
  '/:id',
  validatorHandler(getComentarySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const comentary = await service.findOne(id);
      res.json(comentary);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /comentary/{id}:
 *  patch:
 *    tags: [Comentary]
 *    description: Actualiza un comentario, unico campo es el contenido
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/ComentaryUpdate'
 *    responses:
 *      200:
 *       description: Datos actualizados
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseGetOneComentary'
 *      400:
 *       description: Bad request
 *      401:
 *       description: unauthorized
 *      404:
 *       description: Comentary not found
 *      409:
 *       description: conflict
 *      500:
 *       description: Internal server error
 */
router.patch(
  '/:id',
  validatorHandler(getComentarySchema, 'params'),
  validatorHandler(updateComentarySchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('user'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedComentary = await service.update(id, body);
      res.json(updatedComentary);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /comentary/{id}:
 *  delete:
 *    description: elimina un comentario
 *    tags: [Comentary]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *    responses:
 *      200:
 *       description: Comentario eliminado
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *           message:
 *            type: string
 *          example: "Comentary deleted"
 *      400:
 *       description: Bad request
 *      401:
 *       description: unauthorized
 *      404:
 *       description: Comentary not found
 *      409:
 *       description: conflict
 *      500:
 *       description: Internal server error
 */
router.delete(
  '/:id',
  validatorHandler(getComentarySchema, 'params'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('user'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedComentary = await service.delete(id);
      res.json(deletedComentary);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
