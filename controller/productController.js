const db = require('../db')

//read all data
exports.getAllProduct = (req,res) => {
    db.query(`SELECT
                products.product_id,
                products.product_name,
                categories.category_name,
                products.price,
                products.created_at
                FROM products
                join categories ON products.category_id = categories.category_id;`, (err, results) => {
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
