const joi = require('joi');

const id = joi.number().integer();
const userId = joi.number().integer();
const postId = joi.number().integer();
const comentaryId = joi.number().integer();


const createLikeSchema = joi.object({
  userId: userId.required(),
  postId: postId,
  comentaryId: comentaryId,
});


module.exports = {
  createLikeSchema,

};
