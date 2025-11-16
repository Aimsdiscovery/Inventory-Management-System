const db = require('../db')

//get data
exports.getAllSales = (req,res) => {
    db.query(`SELECT sales.sale_id,
products.product_name,
customers.customer_name,
sale_items.quantity,
sale_items.unit_price,
sales.total_amount
FROM sale_items
join sales ON sale_items.sale_id = sales.sale_id
join customers ON sales.customer_id = customers.customer_id
join products ON sale_items.product_id = products.product_id;`, (err, results) => {
        if(err) throw err;
        res.send(results);
    });
};


//create new data
exports.createSales = (req, res) => {
  console.log('BODY RECEIVED:', req.body);
  const { customer_id, items } = req.body;

  if (!customer_id || !Array.isArray(items) || items.length === 0) {
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

      const saleQuery = `
        INSERT INTO sales (customer_id, total_amount) VALUES (?, ?)
      `;
      connection.query(saleQuery, [customer_id, total_amount], (err, saleResult) => {
        if (err) {
          return connection.rollback(() => {
            connection.release();
            res.status(500).send('Failed to insert purchase');
          });
        }

        const sale_id = saleResult.insertId;
        const itemValues = items.map(item => [
          sale_id,
          item.product_id,
          item.quantity,
          item.unit_price
        ]);

        const itemsQuery = `
          INSERT INTO sale_items (sale_id, product_id, quantity, unit_price)
          VALUES ?
        `;

        connection.query(itemsQuery, [itemValues], (err) => {
          if (err) {
            return connection.rollback(() => {
              connection.release();
              res.status(500).send('Failed to insert sale items');
            });
          }

          connection.commit((err) => {
            if (err) {
              return connection.rollback(() => {
                connection.release();
                res.status(500).send('Failed to commit transaction');
              });
            }

            res.send('✅ Sale created successfully');
            connection.release();
          });
        });
      });
    });
  });
};