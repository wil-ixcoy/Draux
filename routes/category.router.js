const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const CategoryService = require('../services/category.service');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');

const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} = require('../schemas/category.schema');

const router = express.Router();
const service = new CategoryService();

/**
 *@swagger
 * components:
 *  schemas:
 *
 *    CategoryCreate:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        idAdmin:
 *          type: number
 *      required:
 *        - name
 *        - idAdmin
 *      example:
 *        name: "Frontend"
 *        idAdmin: 1
 *
 *    CategoryUpdate:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *      example:
 *        name: "Frontend"
 *
 *    ResponseCreateCategory:
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
 *        name:
 *          type: string
 *        idAdmin:
 *         type: number
 *      example:
 *        createdAt: "2020-05-05T17:00:00.000Z"
 *        updatedAt: "2020-05-05T17:00:00.000Z"
 *        id: 1
 *        name: "Frontend"
 *        idAdmin: 1
 *
 *    ResponseGetOneCategory:
 *      type: object
 *      properties:
 *        id:
 *         type: number
 *        name:
 *          type: string
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 *        idAdmin:
 *         type: number
 *      example:
 *        id: 1
 *        name: "Frontend"
 *        createdAt: "2020-05-05T17:00:00.000Z"
 *        updatedAt: "2020-05-05T17:00:00.000Z"
 *        idAdmin: 1
 *        posts: [{
 *         id: 1,
 *         title: "Vue.js",
 *         content: "Es un framework progresivo de JavaScript",
 *         createdAt: "2020-05-05T17:00:00.000Z",
 *         updatedAt: "2020-05-05T17:00:00.000Z",
 *         userId: 1,
 *         categoryId: 1
 *        }
 *        ]
 */

/**
 * @swagger
 * /category:
 *  post:
 *    description: Crea un nueva categoria
 *    tags: [Category]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/CategoryCreate'
 *    responses:
 *      200:
 *       description: Categoria creada
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseCreateCategory'
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
  validatorHandler(createCategorySchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.json(newCategory);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /category:
 *  get:
 *    description: Obtiene todas las categorias
 *    tags: [Category]
 *    responses:
 *      200:
 *       description: Lista de categorias
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseCreateCategory'
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
    const allCategories = await service.findAll();
    res.json(allCategories);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /category/{id}:
 *  get:
 *    description: Obtiene una sola categoria
 *    tags: [Category]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *    responses:
 *      200:
 *       description: Retorna una categoria
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseGetOneCategory'
 *      400:
 *       description: Bad request
 *      401:
 *       description: unauthorized
 *      404:
 *       description: Category not found
 *      409:
 *       description: conflict
 *      500:
 *       description: Internal server error
 */
router.get(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /category/{id}:
 *  patch:
 *    tags: [Category]
 *    description: Actualiza una categoria, solo se puede actualizar el nombre
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/CategoryUpdate'
 *    responses:
 *      200:
 *       description: Datos actualizados
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseGetOneCategory'
 *      400:
 *       description: Bad request
 *      401:
 *       description: unauthorized
 *      404:
 *       description: Category not found
 *      409:
 *       description: conflict
 *      500:
 *       description: Internal server error
 */
router.patch(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedCategory = await service.update(id, body);
      res.json(updatedCategory);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /category/{id}:
 *  delete:
 *    description: elimina una categoria
 *    tags: [Category]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *    responses:
 *      200:
 *       description: Categoria eliminada
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *           message:
 *            type: string
 *          example: "Category deleted"
 *      400:
 *       description: Bad request
 *      401:
 *       description: unauthorized
 *      404:
 *       description: Category not found
 *      409:
 *       description: conflict
 *      500:
 *       description: Internal server error
 */
router.delete(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedCategory = await service.delete(id);
      res.json(deletedCategory);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
