// backend/routes/teamRoutes.js

const express = require('express');
const router = express.Router();
const Team = require('../models/Team'); // adjust path if needed

// @route   GET /api/teams
// @desc    Get all teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   GET /api/teams/:id
// @desc    Get a single team by ID
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ error: 'Team not found' });
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTeam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update specific player in team
router.put('/:teamId/players/:playerIndex', async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId);
    if (!team) return res.status(404).json({ error: 'Team not found' });

    const { name, image, role } = req.body;
    team.players[req.params.playerIndex] = { name, image, role };

    await team.save();
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
