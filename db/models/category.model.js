const { Sequelize, DataTypes, Model } = require('sequelize');

const CATEGORY_TABLE = 'category';

const CategorySchema = {
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

class Category extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      timestamps: false,
      modelName: 'Category',
    };
  }
}

module.exports = {
  CategorySchema,
  Category,
  CATEGORY_TABLE,
};
