'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'user_id' })
      Order.hasMany(models.OrderBook, { foreignKey: 'order_id', as: 'orderBooks' });

    }
  }
  Order.init({
    status: {
      type: DataTypes.ENUM('PENDING', 'PAYED', 'FAILED'),
      allowNull: false,
      defaultValue: 'PENDING',
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};