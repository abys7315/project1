const express = require('express');
const router = express.Router();
const leader = require('../controllers/leaderboardController');
router.get('/', leader.getLeaderboard);
module.exports = router;
