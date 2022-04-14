const joi = require('joi');

const id = joi.number().integer();
const title = joi.string().max(50);
const content = joi.string().max(50);
const userId = joi.number().integer();
const categoryId = joi.number().integer();

const createPostSchema = joi.object({
  title: title.required(),
  content: content.required(),
  userId: userId.required(),
  categoryId: categoryId.required(),
});

const getPostSchema = joi.object({
  id: id.required(),
});

const updatePostSchema = joi.object({
  title,
  content,
});

module.exports = {
  createPostSchema,
  getPostSchema,
  updatePostSchema,
};
