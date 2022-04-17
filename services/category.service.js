const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
class CategoryService {
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async findAll() {
    const allCategories = await models.Category.findAll();
    return allCategories;
  }
  async findOne(id) {
    const category = await models.Category.findByPk(id);

    if (!category) {
      throw boom('Category not found');
    }
    return category;
  }
  async update(id, changes) {
    const category = this.findOne(id);
    if (!category) {
      throw boom('Category not found');
    }
    const updatedCategory = await category.update(changes);
    return updatedCategory;
  }
  async delete(id) {
    const category = this.findOne(id);
    if (!category) {
      throw boom('Category not found');
    }
    await category.destroy();
    return { id };
  }
}

module.exports = CategoryService;
