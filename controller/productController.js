const db = require('../db')

//read all data
exports.getAllProduct = (req,res) => {
    db.query('SELECT* FROM products', (err, results) => {
        if(err) throw err;
        res.send(results);
    });
};

//create new data
exports.createNewProduct = (req,res) => {
    const {product_name, category_id, price}= req.body;
    const sql = 'insert into products (product_name, category_id, price) values (?, ?, ?)'
    db.query(sql, [product_name, category_id, price], (err,results) => {
        if(err) throw err;
        res.send({ message: 'Product added'});
    });
};

