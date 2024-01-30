const { SalesOrder } = require('../models');

exports.getAllSalesOrders = async (req, res) => {
  try {
    const salesOrders = await SalesOrder.findAll();
    res.json(salesOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createSalesOrder = async (req, res) => {
  try {
    const { customerId, productId, dateOrder, quantity } = req.body;
    const salesOrder = await SalesOrder.create({ customerId, productId, dateOrder, quantity });
    res.status(201).json(salesOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
