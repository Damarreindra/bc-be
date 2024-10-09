const Game = require("../Models/Game");
const Match = require("../Models/Match");
const Player = require("../Models/Player");

exports.createMatch = async (req, res) => {
  try {
    const { playerIds } = req.body;

    if (!playerIds || playerIds.length === 0) {
      return res
        .status(400)
        .json({ message: "Player IDs are required to start a match" });
    }

    const playersWithScores = playerIds.map((playerId, index) => ({
      player: playerId,
      score: 0,
    }));

    // const game = new Game({ date: Date.now() });
    // await game.save();

    const match = new Match({
      players: playersWithScores,
      date: Date.now(),
    });
    await match.save();

    res.status(201).json({ message: "Match created successfully", match });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find()
      .populate("winner")
      .populate("players.player");
    if (!matches) {
      res.status(505).json({ message: "Match cant be found" });
    }
    res.status(201).json(matches);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getMatchById = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Match.findById(id).populate("players.player");
    if (!match) {
      res.status(505).json({ messsage: "Match cant be found" });
    }
    res.status(201).json(match);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePlayerScore = async (req, res) => {
  try {
    const { matchId, playerId, score } = req.body;
    if (!matchId || !playerId) {
      return res
        .status(400)
        .json({ message: "Match ID, Player ID, and increment are required" });
    }

    const updatedMatch = await Match.findOneAndUpdate(
      { _id: matchId, "players.player": playerId },
      { $inc: { "players.$.score": score } },
      { new: true }
    ).populate("players.player");
    if (!updatedMatch) {
      return res.status(404).json({ message: "Match or Player not found" });
    }

    res.status(200).json({
      message: "Player score updated successfully",
      match: updatedMatch,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getWinner = async (req, res) => {
  try {
    const { matchId, playerId } = req.body;
    if (!playerId) {
      return res.status(400).json({ message: "Player are required" });
    }
    const updatedMatch = await Match.findOneAndUpdate(
      { _id: matchId },
      { winner: playerId },
      { new: true }
    ).populate("winner");
    if (!updatedMatch) {
      return res.status(404).json({ message: "Match or Player not found" });
    }

    const updatedPlayer = await Player.findByIdAndUpdate(
      playerId,
      { $inc: { wins: 1 } },
      { new: true }
    );

    if (!updatedPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.status(200).json({
      message: "Player score updated successfully",
      match: updatedMatch,
      player: updatedPlayer,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMatch = async (req, res) => {
  try {
    const { winnerId, matchId } = req.body;
    if (!matchId) {
      return res.status(400).json({ message: "Match Id are required" });
    }
    const deletedMatch = await Match.findByIdAndDelete(matchId);
    if (!deletedMatch) {
      return res.status(404).json({ message: "Match or Player not found" });
    }
    if (winnerId !== null) {
      const removeWin = await Player.findByIdAndUpdate(
        winnerId,
        { $inc: { wins: -1 } },
        { new: true }
      );
    }
    res.status(200).json({
      message: "Match deleted",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
