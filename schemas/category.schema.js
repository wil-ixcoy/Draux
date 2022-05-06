const joi = require('joi');

const id = joi.number().integer();
const name = joi.number().integer();
const idAdmin = joi.number().integer();

const createCategorySchema = joi.object({
  name: name.required(),
  idAdmin: idAdmin.required(),

});

const getCategorySchema = joi.object({
  id: id.required(),
});

const updateCategorySchema = joi.object({
  name,

});

module.exports = {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
};
