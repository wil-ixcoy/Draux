const express = require('express');
const passport = require('passport');

const validatorHandler = require('../middlewares/validator.handler');
const { newPasswordUserSchema } = require('./../schemas/user.schema');

const AuthService = require('../services/auth.service');
const service = new AuthService();

const router = express.Router();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery', async (req, res, next) => {
  try {
    const { email } = req.body;
    const rta = await service.sendRecoveryPassword(email);
    res.json(rta);
  } catch (e) {
    next(e);
  }
});

router.post(
  '/change-password',
  validatorHandler(newPasswordUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const response = await service.changePassword(token, newPassword);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
