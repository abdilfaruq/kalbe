module.exports = (sequelize, DataTypes) => {
  const SalesOrder = sequelize.define('SalesOrder', {
    customerId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    dateOrder: DataTypes.DATE,
    quantity: DataTypes.DOUBLE,
    totalAmount: DataTypes.DECIMAL,
  });

  SalesOrder.associate = (models) => {
    SalesOrder.belongsTo(models.Product, { foreignKey: 'idProduct' });
    SalesOrder.belongsTo(models.Customer, { foreignKey: 'idCustomer' });
  };

  return SalesOrder;
};
