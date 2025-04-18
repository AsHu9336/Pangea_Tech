const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: String,
  image: String, // image URL
  role: String   // Batter, Bowler, All-rounder, Wicket Keeper
});
const teamSchema = new mongoose.Schema({
  team_code: {
    type: String,
    required: true,
    unique: true, // Optional, but useful to avoid duplicate teams
  },
  team_name: {
    type: String,
    required: true,
    unique: true,
  },
  owners: [String],
  captain: String,
  head_coach: String,
  support_staff: [String],
  players: [playerSchema],
  championshipYears: [Number],
  logoUrl: String,
});

module.exports = mongoose.model("Team", teamSchema);
