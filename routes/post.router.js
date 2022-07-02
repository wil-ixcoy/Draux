const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');

const PostService = require('../services/post.service');

const {
  createPostSchema,
  updatePostSchema,
  getPostSchema,
  likePostSchema
} = require('../schemas/post.schema');
const { uploadImageHandler, helperImage } = require('../middlewares/image.handler');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');

const cloudinary = require("cloudinary");
const fs = require("fs-extra");
require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.SECRET_CLOUDINARY
});
const router = express.Router();
const service = new PostService();

/**
 *@swagger
 * components:
 *  schemas:
 *
 *    PostCreate:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        content:
 *          type: string
 *        userId:
 *          type: number
 *        categoryId:
 *          type: number
 *        file:
 *          type: file
 *      required:
 *        - title
 *        - content
 *        - userId
 *        - categoryId
 *        - file
 *      example:
 *       title: "Proyecto hecho con express.js"
 *       content: "API de un blogpost realizdo con express, postgress y sequelize"
 *       userId: 1
 *       categoryId: 1
 *       file: "image.jpg"
 *
 *    PostUpdate:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        content:
 *          type: string
 *      example:
 *        title: "Angular"
 *        content: "Angular es un framework de javascript"
 *
 *    PostLike:
 *      example:
 *        id: "1"
 *        isLike: "true"
 *
 *    ResponseCreatePost:
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
 *        title:
 *          type: string
 *        content:
 *          type: string
 *        UserId:
 *         type: number
 *        CategoryId:
 *         type: number
 *      example:
 *        createdAt: "2020-05-05T17:00:00.000Z"
 *        updatedAt: "2020-05-05T17:00:00.000Z"
 *        id: 1
 *        title: "Proyecto hecho con express.js"
 *        content: "API de un blogpost realizdo con express, postgress y sequelize"
 *        url_image: "url de la imagen subida"
 *        userId: 1
 *        categoryId: 1
 *        likes: "null"
 *
 *    ResponseGetOnePost:
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
 *        categoryId:
 *         type: number
 *      example:
 *        id: 1
 *        title: "Proyecto hecho con express.js"
 *        content: "API de un blogpost realizdo con express, postgress y sequelize"
 *        createdAt: "2020-05-05T17:00:00.000Z"
 *        updatedAt: "2020-05-05T17:00:00.000Z"
 *        userId: 1
 *        categoryId: 1
 *        user: [{
 *         id: 1,
 *         name: "Alexander",
 *         lastName: "Tzoc",
 *         country: "Guatemala",
 *         email: "wilicode34@gmail.com",
 *         createdAt: "2020-05-05T17:00:00.000Z",
 *         updatedAt: "2020-05-05T17:00:00.000Z",
 *         role: "user",
 *        }]
 *        comentary: [{
 *         id: 1,
 *         content: "Me gusto mucho el post",
 *         createdAt: "2020-05-05T17:00:00.000Z",
 *         updatedAt: "2020-05-05T17:00:00.000Z",
 *         userId: 2,
 *         postId: 1,
 *        }]
 *
 */

/**
 * @swagger
 * /post:
 *  post:
 *    description: Crea un nuevo post
 *    tags: [Post]
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *             $ref: '#/components/schemas/PostCreate'
 *    responses:
 *      200:
 *       description: Post creado
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseCreatePost'
 *      400:
 *       description: Bad request
 *      500:
 *       description: Internal server error
 *
 */
router.post(
  '/',
  validatorHandler(createPostSchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('user'),
  uploadImageHandler.single('file'),
  async (req, res, next) => {
    try {
      const imageResize = await helperImage(req.file.path, `resized-${req.file.originalname}`);
      const imageCloudinary = await cloudinary.v2.uploader.upload(imageResize.path);

      const data = {
        title: req.body.title,
        content: req.body.content,
        image_url: imageCloudinary.secure_url,
        userId: req.body.userId,
        categoryId: req.body.categoryId,
      };
      const newPost = await service.create(data);
      await fs.unlink(req.file.path)
      await fs.unlink(imageResize.path)
      res.json(newPost);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /post/like:
 *  post:
 *    description: Like y dislike a un post
 *    tags: [Post]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/PostLike'
 *    responses:
 *      200:
 *       description: Post creado
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/PostLike'
 *      409:
 *       description: email bust be unique
 *      400:
 *       description: Bad request
 *      500:
 *       description: Internal server error
 *
 */
router.post(
  '/like',
  validatorHandler(likePostSchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('user'),
  async (req, res, next) => {
    try {
      const { id, isLike } = req.body;
      const newLike = await service.likePost(id, isLike);
      res.json(newLike);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /post:
 *  get:
 *    description: Obtiene todos los posts
 *    tags: [Post]
 *    responses:
 *      200:
 *       description: Lista de posts
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseCreatePost'
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
    const allPosts = await service.findAll();
    res.json(allPosts);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /post/{id}:
 *  get:
 *    description: Obtiene un solo post
 *    tags: [Post]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *    responses:
 *      200:
 *       description: Retorna un post
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseGetOnePost'
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
  validatorHandler(getPostSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const post = await service.findOne(id);
      res.json(post);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /post/{id}:
 *  patch:
 *    tags: [Post]
 *    description: Actualiza un post, titulo y contenido
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/PostUpdate'
 *    responses:
 *      200:
 *       description: Datos actualizados
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseCreatePost'
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
  validatorHandler(getPostSchema, 'params'),
  validatorHandler(updatePostSchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('user'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedPost = await service.update(id, body);
      res.json(updatedPost);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /post/{id}:
 *  delete:
 *    description: elimina un post
 *    tags: [Post]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *    responses:
 *      200:
 *       description: Post eliminado
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
  validatorHandler(getPostSchema, 'params'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('user'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedPost = await service.delete(id);
      res.json(deletedPost);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
