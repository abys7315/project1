const Team = require('../models/Team');
exports.listTeams = async (req, res) => {
  const teams = await Team.find().populate('teamHead', 'name email').lean();
  res.json(teams);
};
exports.toggleAttendance = async (req, res) => {
  try {
    const { teamId } = req.body;
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: 'Team not found' });
    team.attendance = !team.attendance;
    await team.save();
    res.json({ message: 'Toggled', attendance: team.attendance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
