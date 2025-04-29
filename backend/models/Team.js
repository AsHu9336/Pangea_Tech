const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: String,
  image: String, 
  role: String   
});
const teamSchema = new mongoose.Schema({
  team_code: {
    type: String,
    required: true,
    unique: true, 
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
