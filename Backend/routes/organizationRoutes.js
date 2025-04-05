const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');

// Get all aid organizations
router.get('/', organizationController.getAllOrganizations);

module.exports = router;
