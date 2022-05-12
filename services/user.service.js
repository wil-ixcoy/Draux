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
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user;
  }

  async findAll() {
    const allUsers = await models.User.findAll();
    for (let i = 0; i < allUsers.length; i++) {
      delete allUsers[i].dataValues.password;
      delete allUsers[i].dataValues.recoveryToken;
    }
    return allUsers;
  }
  async findOne(id) {
    const user = await models.User.findByPk(id, {
      include: ['posts', 'comments'],
    });

    if (!user) {
      throw boom.notFound('User not found');
    }
    delete user.dataValues.password;
    return user;
  }
  async update(id, changes) {
    const user = await this.findOne(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    const updatedUser = await user.update(changes);
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;

    return updatedUser;
  }
  async delete(id) {
    const user = await this.findOne(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    await user.destroy();
    return { id };
  }

  async findEmail(email) {
    const response = await models.User.findOne({
      where: { email },
    });
    return response;
  }
}

module.exports = UserService;
