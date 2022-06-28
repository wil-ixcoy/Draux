const joi = require('joi');

const id = joi.number().integer();
const title = joi.string();
const content = joi.string();
const userId = joi.number().integer();
const categoryId = joi.number().integer();
const isLike = joi.boolean();
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

const likePostSchema = joi.object({
  id: id.required(),
  isLike: isLike.required(),
})

module.exports = {
  createPostSchema,
  getPostSchema,
  updatePostSchema,
  likePostSchema,
};
