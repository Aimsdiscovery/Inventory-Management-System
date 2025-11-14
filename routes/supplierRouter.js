const express = require('express');
const router = express.Router();
const Controller = require('../controller/supplierController')


//read all data
router.get('/', Controller.getSupplier);
//create new data
router.post('/' , Controller.createNewSupplier);


module.exports = router;