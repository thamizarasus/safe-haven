const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const donatorController = require('../controllers/donatorController');

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').optional().isLength({ min: 5 }).withMessage('Phone number should be valid')
  ],
  donatorController.createDonator
);

module.exports = router;
