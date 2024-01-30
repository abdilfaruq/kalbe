const express = require('express');
const router = express.Router();
const salesOrderController = require('../controllers/salesOrderController');

router.get('/', salesOrderController.getAllSalesOrders);
router.post('/', salesOrderController.createSalesOrder);

module.exports = router;
