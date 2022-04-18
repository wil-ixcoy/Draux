const { Sequelize, DataTypes, Model } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const { COMENTARY_TABLE } = require('./comentary.model');
const { POST_TABLE } = require('./post.model');

const LIKE_TABLE = 'likes';

const LikeSchema = {
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
  },
    postId: {
      field: 'post_id',
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: POST_TABLE,
        key: 'id',
      },
    },
    comentaryId: {
      field: 'comentary_id',
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: COMENTARY_TABLE,
        key: 'id',
      },
    },
};

class Like extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' });
    this.belongsTo(models.Post, { as: 'post' });
    this.belongsTo(models.Comentary, { as: 'comentary' });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: LIKE_TABLE,
      timestamps: false,
      modelName: 'Like',
    };
  }
}

module.exports = {
  LikeSchema,
  Like,
  LIKE_TABLE,
};
