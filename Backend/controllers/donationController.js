const pool = require('../models/db');
const { validationResult } = require('express-validator');

// GET /api/donations
exports.getAllDonations = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        d.id,
        dn.name AS donator,
        i.name AS item_type,
        d.money,
        d.quantity,
        o.name AS organization,
        d.donation_date
      FROM Donation d
      JOIN Donator dn ON d.donator_id = dn.id
      JOIN ItemType i ON d.item_type_id = i.id
      JOIN Organization o ON d.aid_organization_id = o.id
      ORDER BY d.donation_date DESC;
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching donations:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /api/donations
exports.createDonation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  const { donator_id, item_type_id, money, quantity, aid_organization_id } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO Donation (donator_id, item_type_id, money, quantity, aid_organization_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [donator_id, item_type_id, money || null, quantity || null, aid_organization_id]
    );

    res.status(201).json({
      message: 'Donation successfully recorded!',
      donation: result.rows[0],
    });
  } catch (err) {
    console.error('Error inserting donation:', err);
    res.status(500).json({ error: 'Could not create donation' });
  }
};

// GET /api/donations/summary
exports.getSummary = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        (SELECT COUNT(*) FROM Donation) AS total_donations,
        (SELECT COALESCE(SUM(quantity), 0) FROM Donation) AS total_items_donated,
        (SELECT COUNT(DISTINCT donator_id) FROM Donation) AS unique_donators,
        (SELECT COUNT(*) FROM Organization) AS total_organizations
    `);

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching summary:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
