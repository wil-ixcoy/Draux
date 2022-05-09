const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../libs/sequelize');
class AdminService {
  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const admin = await models.Admin.create({
      ...data,
      password: hash,
    });
    delete admin.dataValues.password;
    delete admin.dataValues.recoveryToken;
    return admin;
  }

  async findAll() {
    const allAdmin = await models.Admin.findAll();
    for (let i = 0; i < allAdmin.length; i++) {
      delete allAdmin[i].dataValues.password;
      delete allAdmin[i].dataValues.recoveryToken;
    }
    return allAdmin;
  }
  async findOne(id) {
    const admin = await models.Admin.findByPk(id, {
      include: ['categories'],
    });
    if (!admin) {
      throw boom.notFound('User not found');
    }
    delete admin.dataValues.password;
    delete admin.dataValues.recoveryToken;
    return admin;
  }
  async update(id, changes) {
    const admin = await this.findOne(id);
    if (!admin) {
      throw boom.notFound('User not found');
    }
    const updatedAdmin = await admin.update(changes);
    delete updatedAdmin.dataValues.password;
    delete updatedAdmin.dataValues.recoveryToken;
    return updatedAdmin;
  }
  async delete(id) {
    const admin = await this.findOne(id);
    if (!admin) {
      throw boom.notFound('User not found');
    }
    await admin.destroy();
    return { id };
  }
  async findEmailAdmin(email) {
    const response = await models.Admin.findOne({
      where: { email },
    });
    return response;
  }
}

module.exports = AdminService;
