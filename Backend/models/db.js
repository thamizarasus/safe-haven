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

module.exports = pool;
