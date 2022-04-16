const { Sequelize, DataTypes, Model } = require('sequelize');
const { USER_TABLE } = require('./user.model');

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
  },
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL',
};

class Like extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' });
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
