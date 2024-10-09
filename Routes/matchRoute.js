const express = require('express')
const router = express.Router()
const matchController = require('../Controllers/MatchController')

router.post('/', matchController.createMatch);
router.get('/', matchController.getAllMatches);
router.delete('/', matchController.deleteMatch)
router.get('/:id', matchController.getMatchById)
router.patch('/updateScore', matchController.updatePlayerScore);
router.patch('/getWinner', matchController.getWinner)



module.exports = router


