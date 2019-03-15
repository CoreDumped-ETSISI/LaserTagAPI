'use strict'

const express = require('express');
const router = express.Router();
const teamCtrl = require('../controllers/teamController');

router.post('/', teamCtrl.createTeam);
router.get('/', teamCtrl.getTeams);
router.get('/:teamId', teamCtrl.getTeam);
router.get('/byName/:name', teamCtrl.getTeamByName);
router.put('/:teamId', teamCtrl.updateTeam);
router.put('/:teamId/player/:playerId/add', teamCtrl.addPlayer);
router.put('/:teamId/player/:playerId/remove', teamCtrl.removePlayer);
router.delete('/:teamId', teamCtrl.deleteTeam);

module.exports = router