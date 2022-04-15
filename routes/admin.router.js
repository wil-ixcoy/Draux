const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const AdminService = require('../services/admin.service');

const {
  createAdminSchema,
  getAdminSchema,
  updateAdminSchema,
} = require('../schemas/admin.schema');

const router = express.Router();
const service = new AdminService();

router.post(
  '/',
  validatorHandler(createAdminSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.json(newUser);
    } catch (err) {
      next(err);
    }
  }
);

router.get('/', async (req, res, next) => {
  try {
    const allUsers = await service.findAll();
    res.json(allUsers);
  } catch (err) {
    next(err);
  }
});

router.get(
  '/:id',
  validatorHandler(getAdminSchema, 'params'),
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
