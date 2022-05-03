const { Admin, AdminSchema } = require('./admin.model');
const { Category, CategorySchema } = require('./category.model.js');
const { Comentary, ComentarySchema } = require('./comentary.model.js');
const { UserPost,  UserPostSchema } = require('./userPostLike.model.js');
const { UserComentary,  UserComentarySchema } = require('./userComentaryLike.model.js');
const { Post, PostSchema } = require('./post.model.js');
const { User, UserSchema } = require('./user.model.js');

function setupModels(sequelize) {
  //iniciar modelos
  Admin.init(AdminSchema, Admin.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Comentary.init(ComentarySchema, Comentary.config(sequelize));
  Post.init(PostSchema, Post.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
  UserPost.init(UserPostSchema, UserPost.config(sequelize));
  UserComentary.init(UserComentarySchema, UserComentary.config(sequelize));

  //asociaciones
  /*   Admin.associate(sequelize.models); */
  User.associate(sequelize.models);
  Category.associate(sequelize.models);
  Comentary.associate(sequelize.models);
  Post.associate(sequelize.models);
  /*   Like.associate(sequelize.models); */
}

module.exports = { setupModels };
