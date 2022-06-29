const { Sequelize, DataTypes, Model } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const FOLLOW_TABLE = 'follow';

const FollowSchema = {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    field: 'user_to',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  userFrom: {
    field: 'user_from',
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  followAt: {
    field: 'followed_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class Follow extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' });
  };
  static config(sequelize) {
    return {
      sequelize,
      tableName: FOLLOW_TABLE,
      timestamps: false,
      modelName: 'Follow',
    };
  }
}

module.exports = {
  FollowSchema,
  Follow,
  FOLLOW_TABLE,
};
