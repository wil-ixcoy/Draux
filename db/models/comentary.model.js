const { Sequelize, DataTypes, Model } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const {POST_TABLE} = require('./post.model');

const COMENTARY_TABLE = 'comments';

const ComentarySchema = {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  comentary: {
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
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  postId: {
    field: 'post_id',
    allowNull: false,
    references: {
      model: POST_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Comentary extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' });
    this.belongsTo(models.Post, { as: 'post' });
  };
  static config(sequelize) {
    return {
      sequelize,
      tableName: COMENTARY_TABLE,
      timestamps: false,
      modelName: 'Comentary',
    };
  }
}

module.exports = {
  ComentarySchema,
  Comentary,
  COMENTARY_TABLE,
};
