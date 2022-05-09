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
} = require('../schemas/user.schema');

const router = express.Router();
const service = new UserService();

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
       const newUser = await service.create(body);
       const user = await service.findOne(newUser.id);
      const token = await serviceAuth.signToken(user);
      res.json(token);
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
      const allUsers = await service.findAll();
      res.json(allUsers);
    } catch (err) {
      next(err);
    }
  }
);

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
