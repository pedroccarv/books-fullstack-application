'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // Category.hasMany(models.Book, { foreignKey: 'category_id', as: 'book' });
    }
  }
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  }, {
    sequelize,
    modelName: 'Category',
    tableName: "Categories"
  });
  return Category;
};