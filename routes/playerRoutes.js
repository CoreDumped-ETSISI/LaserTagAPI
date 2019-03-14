'use strict'

const express = require('express');
const router = express.Router();
const playerCtrl = require('../controllers/playerController');

router.post('/', playerCtrl.createPlayer);
router.get('/', playerCtrl.getPlayers);
router.get('/:playerId', playerCtrl.getPlayer);
router.get('/byName/:name', playerCtrl.getPlayerByName);
router.put('/:playerId', playerCtrl.updatePlayer);
router.delete('/:playerId', playerCtrl.deletePlayer);

module.exports = router