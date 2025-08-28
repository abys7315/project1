const mongoose = require('mongoose');
const ScoreAuditSchema = new mongoose.Schema({
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  oldScores: Object,
  newScores: Object,
  changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  role: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('ScoreAudit', ScoreAuditSchema);
