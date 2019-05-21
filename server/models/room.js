const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  roomName: String,
  player: [{ name: String, points: [Number], legs: Number }],
  activePlayer: Number,
  active: Boolean
});

module.exports = mongoose.model('Room', RoomSchema);
