const pool = require('../models/db');

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
