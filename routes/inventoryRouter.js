const express = require('express');
const router = express.Router();
const Controller = require('../controller/inventoryController')


//read all data
router.get('/', Controller.getInventory);

module.exports = router;