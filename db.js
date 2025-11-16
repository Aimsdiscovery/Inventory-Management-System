require('dotenv').config();

const mysql = require('mysql2');
const fs = require('fs');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    // Aiven requires SSL, only the CA certificate is needed
    ca: fs.readFileSync('./ca.pem')
  }
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
