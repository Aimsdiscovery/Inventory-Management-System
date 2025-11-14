const express = require('express');
const router = express.Router();
const saleController = require('../controller/saleController')


//read all data
router.get('/', saleController.getAllSales)
//create new data
router.post('/', saleController.createSales);

module.exports = router;