const express = require('express');
const router = express.Router();
const Controller = require('../controller/productController')


//read all data
router.get('/', Controller.getAllProduct);
//create new data
router.post('/' , Controller.createNewProduct );


module.exports = router;