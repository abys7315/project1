const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const requireRole = require('../middleware/roles');
const auditCtrl = require('../controllers/auditController');
router.get('/', requireAuth, requireRole(['admin','event-manager']), auditCtrl.listAudits);
module.exports = router;
