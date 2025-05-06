const express = require('express');
const router = express.Router();
const { createSponsorProfile, donatePads, getMyDonations, getSponsorProfile } = require('../controllers/sponsorController');
const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

// Sponsor routes
router.use(protect);
router.use(authorizeRoles('sponsor'));

router.get('/profile', getSponsorProfile)
router.post('/create-profile', createSponsorProfile);
router.post('/donate', donatePads);
router.get('/donations', getMyDonations);

module.exports = router;
