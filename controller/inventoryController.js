const db = require('../db')

//read all data
exports.getInventory = (req,res) => {
    db.query(`SELECT
                inventory.inventory_id,
                products.product_name,
                inventory.quantity,
                inventory.last_updated
                FROM inventory
                join products ON inventory.product_id = products.product_id;`, (err, results) => {
        if(err) throw err;
        res.send(results);
    });
};