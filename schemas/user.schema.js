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
const tokenUser = joi.string();
const newPasswordUser = joi.string().min(8);

const userId = joi.number().integer();
const userFrom = joi.number().integer();


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

const followUserSchema = joi.object({
  userId,
  userFrom,
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
  token: tokenUser.required(),
  newPasswordUser: newPasswordUser.required(),
});
module.exports = {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
  newPasswordUserSchema,
  newPasswordAdminSchema,
  followUserSchema,
};
