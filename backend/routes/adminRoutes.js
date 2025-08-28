const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const requireRole = require('../middleware/roles');
const adminCtrl = require('../controllers/adminController');

// Dashboard: accessible by admin or event-manager
router.get(
  '/dashboard',
  requireAuth,
  requireRole(['admin', 'event-manager']),
  adminCtrl.getDashboard
);

// Assign score: accessible by admin or event-manager
router.post(
  '/assign-score',
  requireAuth,
  requireRole(['admin', 'event-manager']),
  adminCtrl.assignScore
);

// Compute top 2 qualifiers per category: admin only
router.post(
  '/compute-qualifiers',
  requireAuth,
  requireRole(['admin']),
  adminCtrl.computeQualifiers
);

// Compute top 3 winners: admin only
router.get(
  '/compute-winners',
  requireAuth,
  requireRole(['admin']),
  adminCtrl.computeWinners
);

module.exports = router;
