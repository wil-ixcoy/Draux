const joi = require('joi');

const id = joi.number().integer();
const userId = joi.number().integer();
const postId = joi.number().integer();
const comentaryId = joi.number().integer();
const like = joi.boolean();

const createLikePostSchema = joi.object({
  like: like.required(),
  userId: userId.required(),
  postId: postId.required(),
});

const createLikeComentarySchema = joi.object({
  like: like.required(),
  userId: userId.required(),
  comentaryId: comentaryId.required(),
});

const getLikeSchema = joi.object({
  id: id.required(),
});

module.exports = {
  createLikeComentarySchema,
  createLikePostSchema,
  getLikeSchema,
};
