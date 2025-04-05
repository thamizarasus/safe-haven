// app.js
const express = require('express');
const cors = require('cors');
const donationRoutes = require('./routes/donationRoutes');
const organizationRoutes = require('./routes/organizationRoutes');


require('dotenv').config();
const pool = require('./models/db'); // ← this uses your db.js

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/donations', donationRoutes);
app.use('/api/organizations', organizationRoutes);


// Simple route to test API
app.get('/', (req, res) => {
  res.send('🚀 Safe Haven backend is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Server listening on port ${PORT}`);
});
