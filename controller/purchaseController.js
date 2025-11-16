const db = require('../db')

//read all data
exports.getAllPurchases = (req,res) => {
    db.query(`SELECT purchases.purchase_id,
                products.product_name,
                suppliers.supplier_name,
                purchase_items.quantity,
                purchase_items.unit_price,
                purchases.total_amount
                FROM purchase_items
                join purchases ON purchase_items.purchase_id = purchases.purchase_id
                join suppliers ON purchases.supplier_id = suppliers.supplier_id
                join products ON purchase_items.product_id = products.product_id;`, (err, results) => {
        if(err) throw err;
        res.send(results);
    });
};

//create new data
exports.createPurchase = (req, res) => {
  console.log('BODY RECEIVED:', req.body);
  const { supplier_id, items } = req.body;

  if (!supplier_id || !Array.isArray(items) || items.length === 0) {
    return res.status(400).send('Invalid purchase data');
  }

  if (items.some(i => !i.product_id || !i.quantity || !i.unit_price)) {
    return res.status(400).send('Invalid item data');
  }

  const total_amount = items.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0
  );

  db.getConnection((err, connection) => {
    if (err) return res.status(500).send('Database connection failed');

    connection.beginTransaction((err) => {
      if (err) {
        connection.release();
        return res.status(500).send('Failed to start transaction');
      }

      const purchaseQuery = `
        INSERT INTO purchases (supplier_id, total_amount) VALUES (?, ?)
      `;
      connection.query(purchaseQuery, [supplier_id, total_amount], (err, purchaseResult) => {
        if (err) {
          return connection.rollback(() => {
            connection.release();
            res.status(500).send('Failed to insert purchase');
          });
        }

        const purchase_id = purchaseResult.insertId;
        const itemValues = items.map(item => [
          purchase_id,
          item.product_id,
          item.quantity,
          item.unit_price
        ]);

        const itemsQuery = `
          INSERT INTO purchase_items (purchase_id, product_id, quantity, unit_price)
          VALUES ?
        `;

        connection.query(itemsQuery, [itemValues], (err) => {
          if (err) {
            return connection.rollback(() => {
              connection.release();
              res.status(500).send('Failed to insert purchase items');
            });
          }

          connection.commit((err) => {
            if (err) {
              return connection.rollback(() => {
                connection.release();
                res.status(500).send('Failed to commit transaction');
              });
            }

            res.send('✅ Purchase created successfully');
            connection.release();
          });
        });
      });
    });
  });
};

