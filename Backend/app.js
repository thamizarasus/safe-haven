const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const donationRoutes = require('./routes/donationRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const donatorRoutes = require('./routes/donatorRoutes');
require('dotenv').config();
const pool = require('./models/db');

const app = express();
const urlencodedParser = bodyParser.urlencoded();

app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend/src')));

// API Routes
app.use('/api/donations', donationRoutes);
app.use('/api/organizations', organizationRoutes);
// Health check endpoint
app.get('/api/health', (req, res) => {
  res.send('🚀 Safe Haven backend is running!');
});

// Serve frontend index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/src/html/index.html'));
});

app.post('/auth/register', urlencodedParser, (req, res) => {
  pool.query(`INSERT INTO users VALUES ('${req.body.name}', '${req.body.email}', '${req.body.password}');`);
  res.sendFile(path.join(__dirname, '../frontend/src/html/index-signed-in.html'));
});

app.post('/auth/login', urlencodedParser, (req, res) => {
  pool.query(`SELECT name FROM users WHERE password='${req.body.password}' AND email='${req.body.email}';`).then((result) => {
    if (result.rows.length == 0) {
      res.sendFile(path.join(__dirname, '../frontend/src/html/login-fail.html'));
    } else {
      res.sendFile(path.join(__dirname, '../frontend/src/html/index-signed-in.html'));
    }
  });
});

app.post('/donators', urlencodedParser, (req, res) => {
  pool.query(`INSERT INTO donors VALUES ('${req.body.name}', '${req.body.email}', '${req.body["phone number"]}', '${req.body.food}', '${req.body.clothes}', '${req.body.toys}', '${req.body.card}', '${req.body.cardNumber}', '${req.body.expiry}', '${req.body.cvv}', '${req.body.organization}');`);
  res.sendFile(path.join(__dirname, '../frontend/src/html/index.html'));
});

app.post('/donators-signed-in', urlencodedParser, (req, res) => {
  pool.query(`INSERT INTO donors VALUES ('${req.body.name}', '${req.body.email}', '${req.body["phone number"]}', '${req.body.food}', '${req.body.clothes}', '${req.body.toys}', '${req.body.card}', '${req.body.cardNumber}', '${req.body.expiry}', '${req.body.cvv}', '${req.body.organization}');`);
  res.sendFile(path.join(__dirname, '../frontend/src/html/index-signed-in.html'));
});

// 🌟 Gemini Chatbot Proxy Route
app.post('/api/gemini-chat', async (req, res) => {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const userInput = req.body.message;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userInput }] }]
      })
    });

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, no reply from Gemini.";
    res.json({ reply });

  } catch (err) {
    console.error("Gemini fetch error:", err);
    res.status(500).json({ reply: "Internal server error." });
  }
});


app.listen(4000, () => {
  console.log(`💎 Server started! Running on http://localhost:4000/`);
});