const path = require('path');
const { Product, Customer, SalesOrder } = require('../models');

async function seedData() {
  try {
    await Product.sync({ force: true });
    await Customer.sync({ force: true });
    await SalesOrder.sync({ force: true });

    const products = await Product.bulkCreate([
      { productCode: 'P0001', productName: 'CERNEVIT', quantity: 10, price: 270000.00 },
      { productCode: 'P0002', productName: 'FAVIKAL', quantity: 20, price: 22705.00 },
      { productCode: 'P0003', productName: 'LEUCOGEN', quantity: 15, price: 450000.00 },
    ]);

    const customers = await Customer.bulkCreate([
      { customerName: 'Customer 1', customerAddress: 'Address 1', gender: true, birthDate: '1998-01-01' },
      { customerName: 'Customer 2', customerAddress: 'Address 2', gender: false, birthDate: '1996-02-15' },
      { customerName: 'Customer 3', customerAddress: 'Address 3', gender: false, birthDate: '2001-01-05' },
    ]);

    await SalesOrder.bulkCreate([
      { customerId: customers[0].id, productId: products[0].id, dateOrder: new Date(), quantity: 5 },
      { customerId: customers[1].id, productId: products[1].id, dateOrder: new Date(), quantity: 3 },
      { customerId: customers[2].id, productId: products[2].id, dateOrder: new Date(), quantity: 15 },
    ]);

    console.log('Data seeded successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

seedData();
