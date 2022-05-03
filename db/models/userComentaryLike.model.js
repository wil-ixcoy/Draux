const { Sequelize, DataTypes, Model } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const { COMENTARY_TABLE } = require('./comentary.model');

const USER_COMENTARY_TABLE = 'user-comentary';

const UserComentarySchema = {
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
  comentaryId: {
    field: 'comentary_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: COMENTARY_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class UserComentary extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_COMENTARY_TABLE,
      timestamps: false,
      modelName: 'UserComentary',
    };
  }
}

module.exports = {
  UserComentarySchema,
  UserComentary,
  USER_COMENTARY_TABLE,
};
