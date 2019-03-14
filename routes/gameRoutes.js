'use strict'

const express = require('express');
const router = express.Router();
const gameCtrl = require('../controllers/gameController');

router.post('/', gameCtrl.createGame);
router.get('/', gameCtrl.getGames);
router.get('/:gameId', gameCtrl.getGame);
router.delete('/:gameId', gameCtrl.deleteGame);

module.exports = router