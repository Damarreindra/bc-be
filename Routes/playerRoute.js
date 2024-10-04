const express = require('express');
const router = express.Router();
const playerController = require('../Controllers/PlayerController')

router.post('/', playerController.createPlayer);
router.get('/', playerController.getAllPlayers);
router.delete('/:id', playerController.deletePlayer);
router.get('/getChamps', playerController.getChamps)

module.exports = router;