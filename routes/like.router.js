const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const LikeService = require('../services/like.service');

const {
  createLikeComentarySchema,
  createLikePostSchema,
  getLikeSchema
} = require('../schemas/like.schema');

const router = express.Router();
const service = new LikeService();

router.post(
  '/post',
  validatorHandler(createLikePostSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newLike = await service.create(body);
      res.json(newLike);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/comentary',
  validatorHandler(createLikeComentarySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newLike = await service.create(body);
      res.json(newLike);
    } catch (err) {
      next(err);
    }
  }
);

router.get('/', async (req, res, next) => {
  try {
    const allLikes = await service.findAll();
    res.json(allLikes);
  } catch (err) {
    next(err);
  }
});

router.delete(
  '/:id',
  validatorHandler(getLikeSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedLike = await service.delete(id);
      res.json(deletedLike);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
