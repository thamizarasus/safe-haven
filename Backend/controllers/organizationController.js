const pool = require('../models/db');

exports.getAllOrganizations = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        o.id,
        o.name,
        o.description,
        o.contact_email,
        o.contact_phone,
        l.address,
        l.city,
        l.state,
        l.zip_code,
        l.latitude,
        l.longitude
      FROM Organization o
      JOIN Location l ON o.location_id = l.id
      ORDER BY o.name ASC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching organizations:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
