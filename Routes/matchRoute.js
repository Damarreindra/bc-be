const express = require('express')
const router = express.Router()
const matchController = require('../Controllers/MatchController');
const verifyToken = require('../Middleware/AuthMiddleware');

router.post('/',verifyToken,  matchController.createMatch);
router.get('/',verifyToken,  matchController.getAllMatches);
router.delete('/',verifyToken,  matchController.deleteMatch)
router.get('/:id',verifyToken,  matchController.getMatchById)
router.patch('/updateScore', verifyToken, matchController.updatePlayerScore);
router.patch('/getWinner', verifyToken, matchController.getWinner)



module.exports = router


