const express = require('express');
const router = express.Router();
const {
    getAllRequests,
    getAllDonations,
    allocatePads,
    getInventorySummary,
    addPads,
    disbursePads
} = require('../controllers/adminController');
const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const { getDashboardStats } = require('../controllers/dashBoardContoller');

// Admin routes
router.use(protect);
router.use(authorizeRoles('admin'));
router.get('/', getDashboardStats);
router.get('/requests', getAllRequests);
router.get('/donations', getAllDonations);
router.post('/allocate/:id', allocatePads);
router.get('/inventory', getInventorySummary);
router.get('/get-inventory', getInventorySummary);
router.post('/add-stock', addPads);

router.get('/:applicationId/disburse', disbursePads);

module.exports = router;
