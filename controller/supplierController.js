const db = require('../db')

//read all data
exports.getSupplier = (req,res) => {
    db.query('SELECT* FROM suppliers', (err, results) => {
        if(err) throw err;
        res.send(results);
    });
};

//create new data
exports.createNewSupplier = (req,res) => {
    const {supplier_name, contact, address}= req.body;
    const sql = 'insert into suppliers (supplier_name, contact, address) values (?, ?, ?)'
    db.query(sql, [supplier_name, contact, address], (err,results) => {
        if(err) throw err;
        res.send({ message: 'Supplier details added'});
    });
};