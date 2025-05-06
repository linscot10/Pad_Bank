const express = require('express');
const router = express.Router();
const { applyForPads, getApplicationStatus } = require('../controllers/padApplicationController');
const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

// Only schools can apply
router.use(protect);
router.use(authorizeRoles('school'));

router.post('/apply', applyForPads);
router.get('/status', getApplicationStatus);

module.exports = router;
