const joi = require('joi');

const id = joi.number().integer();
const content = joi.string().max(50);
const userId = joi.number().integer();
const postId = joi.number().integer();

const createComentarySchema = joi.object({
  content: content.required(),
  userId: userId.required(),
  postId: postId.required(),
});

const getComentarySchema = joi.object({
  id: id.required(),
});

const updateComentarySchema = joi.object({
  title,
  content,
});

module.exports = {
  createComentarySchema,
  getComentarySchema,
  updateComentarySchema,
};
