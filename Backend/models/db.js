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
  pool.query("CREATE TABLE IF NOT EXISTS donators (name varchar(100), email varchar(100), password varchar(100));");
}

createTable();

module.exports = pool;
