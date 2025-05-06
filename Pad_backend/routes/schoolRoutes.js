const express = require('express');
const router = express.Router();
const { registerSchool, getSchoolProfile, uploadDocuments } = require('../controllers/schoolController');
const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const upload = require('../middleware/upload');


// All school routes require login and "school" role
// router.use(protect);
// router.use(authorizeRoles('school'));

// router.post('/register', registerSchool);
// router.get('/profile', getSchoolProfile);

router.post('/register', protect, authorizeRoles('school'), registerSchool);
router.get('/profile', protect, authorizeRoles('school'), getSchoolProfile);
router.post('/upload-docs', protect,  authorizeRoles('school'), upload.array('documents', 5), uploadDocuments);

module.exports = router;
