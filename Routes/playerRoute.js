const express = require('express');
const router = express.Router();
const playerController = require('../Controllers/PlayerController');
const verifyToken = require('../Middleware/AuthMiddleware');

router.post('/',verifyToken,  playerController.createPlayer);
router.get('/',verifyToken,  playerController.getAllPlayers);
router.delete('/:id', verifyToken, playerController.deletePlayer);
router.get('/getChamps',verifyToken,  playerController.getChamps)

module.exports = router;