const express = require('express');
const passport = require('passport');

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
    const rta = await service.sendEmail(email);
    res.json(rta);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
