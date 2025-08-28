const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const teamCtrl = require('../controllers/teamController');

// Get current user's team
router.get('/me', requireAuth, teamCtrl.getMyTeam);

// Assign a category to the team
router.post('/assign-category', requireAuth, teamCtrl.selectCategory);

// Optional duplicate route if needed
router.post('/select-category', requireAuth, teamCtrl.selectCategory);

// ✅ New route to fetch available categories
router.get('/get-category', requireAuth, teamCtrl.getCategories);

module.exports = router;
