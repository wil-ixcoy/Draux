const { Sequelize, DataTypes, Model } = require('sequelize');

const POST_TABLE = 'posts';

const PostSchema = {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tile: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  content: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    field: 'created_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    field: 'updated_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class Post extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: POST_TABLE,
      timestamps: false,
      modelName: 'Post',
    };
  }
}

module.exports = {
  PostSchema,
  Post,
  POST_TABLE,
};
