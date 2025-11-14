const express = require('express');
const router = express.Router();
const purchaseController = require('../controller/purchaseController')


//read all data
router.get('/', purchaseController.getAllPurchases);
//create new data
router.post('/', purchaseController.createPurchase);

module.exports = router;