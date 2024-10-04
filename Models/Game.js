const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  winner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
});

module.exports = mongoose.model('Game', gameSchema);