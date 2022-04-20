const { Sequelize, DataTypes, Model } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const { POST_TABLE } = require('./post.model');

const USER_POST_TABLE = 'user-post';

const UserPostSchema = {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  like: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    field: 'created_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
    postId: {
      field: 'post_id',
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: POST_TABLE,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
};

class UserPost extends Model {

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_POST_TABLE,
      timestamps: false,
      modelName: 'UserPost',
    };
  }
}

module.exports = {
  UserPostSchema,
  UserPost,
  USER_POST_TABLE,
};
