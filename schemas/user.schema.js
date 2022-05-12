const joi = require('joi');

const id = joi.number().integer();
const name = joi.string().max(50);
const userName = joi.string().max(50);
const lastName = joi.string().max(50);
const country = joi.string().max(30);
const email = joi.string().email();
const password = joi.string().min(8);
const newPassword = joi.string().min(8);
const token = joi.string();
const tokenAdmin = joi.string();
const newPasswordAdmin = joi.string().min(8);

const createUserSchema = joi.object({
  name: name.required(),
  userName: userName.required(),
  lastName: lastName.required(),
  country: country.required(),
  email: email.required(),
  password: password.required(),
});

const getUserSchema = joi.object({
  id: id.required(),
});

const updateUserSchema = joi.object({
  name,
  userName,
  lastName,
  country,
  email,
});

const newPasswordUserSchema = joi.object({
  token: token.required(),
  newPassword: newPassword.required(),
});

const newPasswordAdminSchema = joi.object({
  token: tokenAdmin.required(),
  newPasswordAdmin: newPasswordAdmin.required(),
});
module.exports = {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
  newPasswordUserSchema,
  newPasswordAdminSchema,
};
