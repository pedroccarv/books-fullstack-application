'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderBook extends Model {
    static associate(models) {
      OrderBook.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
    }
  }
  OrderBook.init({
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'books',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'OrderBook',
  });
  return OrderBook;
};