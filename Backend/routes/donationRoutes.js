const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const { body } = require('express-validator');

// GET /api/donations
router.get('/', donationController.getAllDonations);

// POST /api/donations
router.post(
    '/',
    [
      body('donator_id').isInt({ min: 1 }).withMessage('Valid donator_id is required'),
      body('item_type_id').isInt({ min: 1 }).withMessage('Valid item_type_id is required'),
      body('aid_organization_id').isInt({ min: 1 }).withMessage('Valid aid_organization_id is required'),
      body('quantity')
        .optional()
        .isInt({ min: 1 })
        .withMessage('If provided, quantity must be a positive integer'),
      body('money')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('If provided, money must be 0 or greater'),
    ],
    donationController.createDonation
  );
  

// Dashboard view
router.get('/summary', donationController.getSummary);



module.exports = router;
