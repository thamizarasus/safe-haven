const express = require('express');
const cors = require('cors');
const path = require('path');
const donationRoutes = require('./routes/donationRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const donatorRoutes = require('./routes/donatorRoutes');
require('dotenv').config();
const pool = require('./models/db');

const app = express();

app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend/src')));

// API Routes
app.use('/api/donations', donationRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/donators', donatorRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.send('🚀 Safe Haven backend is running!');
});

// Serve frontend index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/src/html/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Server listening on http://localhost:${PORT}`);
});
