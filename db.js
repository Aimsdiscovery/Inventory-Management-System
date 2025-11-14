const mysql = require('mysql2');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'aimanezz170202A@', // change if needed
  database: 'inventory_db', // change this
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ✅ Check database connection when starting
db.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed:', err.code);
    if (err.code === 'ECONNREFUSED') {
      console.error('⚠️  Cannot connect to MySQL — is it running?');
    }
    process.exit(1); // stop the app if DB is unreachable
  } else {
    console.log('✅ Connected to MySQL database!');
    connection.release(); // release the test connection
  }
});

module.exports = db;
