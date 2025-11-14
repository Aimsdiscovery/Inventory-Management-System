const db = require('../db')

//read all data
exports.getInventory = (req,res) => {
    db.query('SELECT* FROM inventory', (err, results) => {
        if(err) throw err;
        res.send(results);
    });
};