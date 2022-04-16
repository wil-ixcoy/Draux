const { Sequelize, DataTypes, Model } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const COMENTARY_TABLE = 'comentaries';

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
  },
};

class Comentary extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' });
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
