// models/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool();

pool.connect((err, client, release) => {
  if (err) {
    return console.error('❌ Error acquiring client', err.stack);
  }
  console.log('✅ Connected to PostgreSQL!');
  release();
});

async function createTable() {
  pool.query("CREATE TABLE IF NOT EXISTS users (name varchar(100), email varchar(100), password varchar(100));");
  pool.query("CREATE TABLE IF NOT EXISTS donors (name varchar(100), email varchar(100), phoneNumber varchar(100), food varchar(100), clothes varchar(100), toys varchar(100), card varchar(100), cardNumber varchar(100), expiryDate varchar(5), cvv varchar(3), organization varchar(100));")
}

createTable();

module.exports = pool;
