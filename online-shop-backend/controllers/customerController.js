const { Customer } = require('../models');

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createCustomer = async (req, res) => {
  try {
    const { customerName, customerAddress, gender, birthDate } = req.body;
    const customer = await Customer.create({ customerName, customerAddress, gender, birthDate });
    res.status(201).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
