const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

console.log('Auth routes loaded');
router.post('/register', register);


router.post('/login', login);



// Example protected route
router.get('/protected', protect, (req, res) => {
    res.json({ message: `Welcome ${req.user.name}!`, user: req.user });
});

// Example role-protected route
router.get('/admin-only', protect, authorizeRoles('admin'), (req, res) => {
    res.json({ message: 'Only admin can see this.' });
});

module.exports = router;