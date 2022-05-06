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

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user', 'admin'),
  async (req, res, next) => {
    try {
      const allComentaries = await service.findAll();
      res.json(allComentaries);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/:id',
  validatorHandler(getComentarySchema, 'params'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('user', 'admin'),
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
