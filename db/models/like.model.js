const { Sequelize, DataTypes, Model } = require('sequelize');

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

class Like extends Model {
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
