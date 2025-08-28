const ScoreAudit = require('../models/ScoreAudit');
exports.listAudits = async (req, res) => {
  const audits = await ScoreAudit.find().populate('team changedBy', 'teamName name email').sort({ createdAt: -1 }).lean();
  res.json(audits);
};
