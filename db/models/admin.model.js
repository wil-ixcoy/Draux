const { Sequelize, DataTypes, Model } = require('sequelize');

const ADMIN_TABLE = 'administrators';

const AdminSchema = {
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
    defaultValue: 'admin',
  },
};

class Admin extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: ADMIN_TABLE,
      timestamps: false,
      modelName: 'Admin',
    };
  }
}

module.exports = {
  AdminSchema,
  Admin,
  ADMIN_TABLE,
};
