const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  players:  [{
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    score: { type: Number, default: 0 } 
}],
date: { type: Date, default: Date.now },
winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
});

module.exports = mongoose.model('Match', matchSchema);