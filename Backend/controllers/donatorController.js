const pool = require('../models/db');
const { validationResult } = require('express-validator');

exports.createDonator = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO Donator (name, email, phone)
       VALUES ($1, $2, $3) RETURNING *`,
      [name, email, phone]
    );

    res.status(201).json({
      message: 'Donator created successfully',
      donator: result.rows[0],
    });
  } catch (err) {
    console.error('Error creating donator:', err);
    res.status(500).json({ error: 'Could not create donator' });
  }
};
