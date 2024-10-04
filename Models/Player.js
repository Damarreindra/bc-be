const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    photoUrl: {type: String, required: true},
    wins: {type: Number,required: true},

})


module.exports = mongoose.model('Player', playerSchema)