const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../libs/sequelize');

class UserService {
  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);

    const user = await models.User.create({
      ...data,
      password: hash,
    });

    return user;
  }

  async createLike(data){
    const like = await models.Like.create(data);
    return like;
  }

  async findAll() {
    const allUsers = await models.User.findAll();
    return allUsers;
  }
  async findOne(id) {
    const user = await models.User.findByPk(id);

    if (!user) {
      throw boom.notFound('User not found');
    }

    return user;
  }
  async update(id, changes) {
    const user = await this.findOne(id);
    const updatedUser = await user.update(changes);
    return updatedUser;
  }
  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
