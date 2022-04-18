const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class LikeService {
  async create(data) {
    const newLike = await models.Like.create(data);
    return newLike;
  }

  async findAll() {
    const like = await models.Like.findAll();
    return like;
  }
  async findOne(id) {
    const like = await models.Like.findByPk(id);
    if (!like) {
      throw boom.notFound('Like not found');
    }
    return like;
  }
  async delete(id) {
    const like = await this.findOne(id);
    if (!like) {
      throw boom.notFound('Like not found');
    }

    await like.destroy();
    return { id };
  }
}

module.exports = LikeService;
