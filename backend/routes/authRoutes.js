const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const authCtrl = require('../controllers/authController');

router.post('/login', authCtrl.login);
router.post('/register', authCtrl.registerTeamHead);
router.post('/logout', authCtrl.logout);

// ✅ Add this route
router.get('/check', requireAuth, (req, res) => {
  res.json({
    message: 'User authenticated',
    user: { id: req.user._id, role: req.user.role, name: req.user.name }
  });
});

module.exports = router;
