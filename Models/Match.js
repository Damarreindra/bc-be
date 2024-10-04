const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  players:  [{
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    score: { type: Number, default: 0 } 
}],
});

module.exports = mongoose.model('Match', matchSchema);