const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const requireRole = require('../middleware/roles');
const attendanceCtrl = require('../controllers/attendanceController');
router.get('/', requireAuth, requireRole(['event-manager']), attendanceCtrl.listTeams);
router.post('/toggle', requireAuth, requireRole(['event-manager']), attendanceCtrl.toggleAttendance);
module.exports = router;
