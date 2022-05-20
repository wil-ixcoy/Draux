const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
class PostService {
  async create(data) {
    const newPost = await models.Post.create(data);
    return newPost;
  }

  async findAll() {
    const post = await models.Post.findAll({
      include: ['comentary'],
    });
    return post;
  }
  async findOne(id) {
    const post = await models.Post.findByPk(id, {
      include: ['user', 'comentary'],
    });
    if (!post) {
      throw boom.notFound('Post not found');
    }
    delete post.dataValues.user.dataValues.password;
    delete post.dataValues.user.dataValues.recoveryToken;
    return post;
  }
  async update(id, changes) {
    const post = await models.Post.findByPk(id);
    if (!post) {
      throw boom.notFound('Post not found');
    }
    const updatedPost = await post.update(changes);

    return updatedPost;
  }
  async delete(id) {
    const post = await models.Post.findByPk(id);
    if (!post) {
      throw boom.notFound('Post not found');
    }
    await post.destroy();
    const message = "Post deleted";
    return message;
  }
}

module.exports = PostService;
