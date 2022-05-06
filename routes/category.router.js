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

router.get('/', async (req, res, next) => {
  try {
    const allCategories = await service.findAll();
    res.json(allCategories);
  } catch (err) {
    next(err);
  }
});

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
