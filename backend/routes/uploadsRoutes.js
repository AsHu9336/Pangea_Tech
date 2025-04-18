// routes/upload.js
const express = require('express');
const router = express.Router();
const Team = require('../models/Team'); // Your Mongoose model

router.post('/upload', async (req, res) => {
  try {
    const data = req.body; // JSON data
    if (!Array.isArray(data)) return res.status(400).json({ error: 'Invalid data format' });

    for (const team of data) {
      const teamExists = await Team.findOne({ team_code: team.team_code });
      if (teamExists) continue;

      await Team.create(team);
    }

    res.status(201).json({ message: 'Teams uploaded successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
