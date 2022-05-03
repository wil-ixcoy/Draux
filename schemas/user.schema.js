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
const userId = joi.number().integer();
const comentaryId = joi.number().integer();
const postId = joi.number().integer();
const like = joi.number().integer();



const createUserSchema = joi.object({
  name: name.required(),
  userName: userName.required(),
  lastName: lastName.required(),
  country: country.required(),
  email: email.required(),
  password: password.required(),
});

const createLikePostUserSchema = joi.object({
  userId: userId.required(),
  postId: postId.required(),
  like: like.required(),
});

const createLikeComentaryUserSchema = joi.object({
  userId: userId.required(),
  comentaryId: comentaryId.required(),
  like: like.required(),
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

const newPasswordSchema = joi.object({
  newPassword: newPassword.required(),
  token: token.required(),
});

module.exports = {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
  newPasswordSchema,
  createLikePostUserSchema,
  createLikeComentaryUserSchema
};
