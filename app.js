const express = require('express');
const path = require ('path');
const app = express();
const port = 3000;
const productRoute = require('./routes/productRouter');
const purchaseRoute = require('./routes/purchaseRouter');
const salesRoute = require('./routes/saleRouter');
const supplierRoute = require('./routes/supplierRouter');
const inventoryRoute = require('./routes/inventoryRouter');


app.use(express.json());
app.use(express.static('public'));
app.use('/api/products', productRoute);
app.use('/api/purchase', purchaseRoute);
app.use('/api/sales', salesRoute);
app.use('/api/suppliers', supplierRoute);
app.use('/api/inventory', inventoryRoute);


app.listen(port, ()=>{
  console.log('Server running at http://localhost:3000/');
});
