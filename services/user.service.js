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
  };
  async findAll() {
    const allUsers = await models.User.findAll();
    let followers;
    let data = [];
    for (let i = 0; i < allUsers.length; i++) {
      delete allUsers[i].dataValues.password;
      delete allUsers[i].dataValues.recoveryToken;
      followers = await models.Follow.findAll({
        where: { userFrom: allUsers[i].id },

      });
      let total = followers.length;
      data.push({ user: allUsers[i], followers: total });
    }
    return { data };
  };
  async findOne(id) {
    const user = await models.User.findByPk(id, {
      include: ['posts', 'comments'],
    });
    const followed = await models.Follow.findAll({
      where: { userId: id },
    });
    const followers = await models.Follow.findAll({
      where: { userFrom: id },
    });
    let totalFollowed = followed.length;
    let totalFollowers = followers.length;

    if (!user) {
      throw boom.notFound('User not found');
    }
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return { user, totalFollowed, totalFollowers };
  };
  async update(id, changes) {
    const user = await this.findOne(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    const updatedUser = await user.update(changes);
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;

    return updatedUser;
  };
  async delete(id) {
    const user = await this.findOne(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    await user.destroy();
    const message = "User deleted";
    return message;
  };

  async findEmail(email) {
    const response = await models.User.findOne({
      where: { email },
    });
    return response;
  };
  async follow(data) {
    const isFollow = await models.Follow.findOne({
      where: { userId: data.userId, userFrom: data.userFrom },
    });

    if (isFollow) {
      await models.Follow.destroy({
        where: { userId: data.userId, userFrom: data.userFrom },
      });
      const message = "unfollowed";
      return message;
    }
    const follow = await models.Follow.create(data);
    return follow;

  };
}

module.exports = UserService;
