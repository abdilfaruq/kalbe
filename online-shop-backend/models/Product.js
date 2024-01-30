'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.SalesOrder, { foreignKey: 'idProduct' });
    }
  }

  Product.init({
    productCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    dtInserted: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Product',
  });

  Product.associate = (models) => {
    Product.hasMany(models.SalesOrder, { foreignKey: 'idProduct' });
  };

  return Product;
};
