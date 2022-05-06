const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');

const PostService = require('../services/post.service');

const {
  createPostSchema,
  updatePostSchema,
  getPostSchema,
} = require('../schemas/post.schema');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');

const router = express.Router();
const service = new PostService();

router.post(
  '/',
  validatorHandler(createPostSchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('user'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newPost = await service.create(body);
      res.json(newPost);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user', 'admin'),
  async (req, res, next) => {
    try {
      const allPosts = await service.findAll();
      res.json(allPosts);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/:id',
  validatorHandler(getPostSchema, 'params'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('user', 'admin'),
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
