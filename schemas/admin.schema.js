const joi = require('joi');

const id = joi.number().integer();
const name = joi.string().max(50);
const lastName = joi.string().max(50);
const country = joi.string().max(30);
const email = joi.string().email();
const password = joi.string().min(8);
const newPassword = joi.string().min(8);
const token = joi.string();

const createAdminSchema = joi.object({
  name: name.required(),
  lastName: lastName.required(),
  country: country.required(),
  email: email.required(),
  password: password.required(),
});

const getAdminSchema = joi.object({
  id: id.required(),
});

const updateAdminSchema = joi.object({
  name,
  lastName,
  country,
  email,
});

const newPasswordSchema = joi.object({
  newPassword: newPassword.required(),
  token: token.required(),
});

module.exports = {
  createAdminSchema,
  getAdminSchema,
  updateAdminSchema,
  newPasswordSchema,
};
