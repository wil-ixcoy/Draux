const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ComentaryService {
  async create(data) {
    const newComentary = await models.Comentary.create(data);
    return newComentary;
  }

  async findAll() {
    const comentary = await models.Comentary.findAll();
    return comentary;
  }
  async findOne(id) {
    const comentary = await models.Comentary.findByPk(id, {
      include: ['user', 'post'],
    });
    if (!comentary) {
      throw boom.notFound('Comentary not found');
    }
    return comentary;
  }
  async update(id, changes) {
    const comentary = await this.findOne(id);
    if (!comentary) {
      throw boom.notFound('Comentary not found');
    }

    const updatedComentary = await comentary.update(changes);
    return updatedComentary;
  }
  async delete(id) {
    const comentary = await this.findOne(id);
    if (!comentary) {
      throw boom.notFound('Comentary not found');
    }

    await comentary.destroy();
    return { id };
  }
}

module.exports = ComentaryService;
