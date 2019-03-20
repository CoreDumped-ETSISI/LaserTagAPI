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
router.put('/:playerId/gun/:gunId/add', playerCtrl.addGun);
router.put('/:playerId/remove', playerCtrl.removeGun);
router.put('/:playerId/shot/:playerIdShot', playerCtrl.playerShot);
router.put('/shoot/:playerId', playerCtrl.shootPlayer);

module.exports = router