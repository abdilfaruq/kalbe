module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    customerName: DataTypes.STRING,
    customerAddress: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    birthDate: DataTypes.DATE,
    dtInserted: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
  });

  Customer.associate = (models) => {
    Customer.hasMany(models.SalesOrder, { foreignKey: 'idCustomer' });
  };

  return Customer;
};
