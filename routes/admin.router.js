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
