const { Sequelize, DataTypes, Model } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  userName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  country: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
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
  //atributo para verificar el token de recuperacion de contraseña
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'user',
  },
};

class User extends Model {
  static associate(models) {
    this.hasMany(models.Post, { as: 'posts', foreignKey: 'userId' });
    this.hasMany(models.Comentary, { as: 'comments', foreignKey: 'userId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      timestamps: false,
      modelName: 'User',
    };
  }
}

module.exports = {
  User,
  UserSchema,
  USER_TABLE,
};
