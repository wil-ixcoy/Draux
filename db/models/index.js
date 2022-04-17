const {Admin, AdminSchema} = require('./admin.model');
const {Category, CategorySchema} = require('./category.model.js');
const {Comentary, ComentarySchema} = require('./comentary.model.js');
const {Like, LikeSchema} = require('./like.model.js');
const { Post, PostSchema } = require('./post.model.js');
const { User, UserSchema } = require('./user.model.js');





function setupModels(sequelize) {
  //iniciar modelos
  Admin.init(AdminSchema, Admin.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Comentary.init(ComentarySchema, Comentary.config(sequelize));
  Like.init(LikeSchema, Like.config(sequelize));
  Post.init(PostSchema, Post.config(sequelize));
  User.init(UserSchema, User.config(sequelize));

  //asociaciones
/*   Admin.associate(sequelize.models); */
  Category.associate(sequelize.models);
  Comentary.associate(sequelize.models);
  Like.associate(sequelize.models);
  Post.associate(sequelize.models);
  User.associate(sequelize.models);

}

module.exports = { setupModels };
