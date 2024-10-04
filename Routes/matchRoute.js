const express = require('express')
const router = express.Router()
const matchController = require('../Controllers/MatchController')

router.post('/', matchController.createMatch);
router.get('/', matchController.getAllMatches)
router.patch('/updateScore', matchController.updatePlayerScore);


module.exports = router


