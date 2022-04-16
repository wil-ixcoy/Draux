const { Sequelize, DataTypes, Model } = require('sequelize');
const {USER_TABLE}  = require('./user.model')
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
  userId: {
    field: 'user_id',
    allowNull: false,
    references: {
      model: USER_TABLE,
      key: 'id'
    }

  }
};
class Post extends Model {
    static associate(models) {
      this.belongsTo(models.User, { as: 'user' });
    }
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