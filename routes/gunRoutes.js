'use strict'

const express = require('express');
const router = express.Router();
const gunCtrl = require('../controllers/gunController');

router.post('/', gunCtrl.createGun);
router.get('/', gunCtrl.getGuns);
router.get('/:gunId', gunCtrl.getGun);
router.get('/byName/:name', gunCtrl.getGunByName);
router.put('/:gunId', gunCtrl.updateGun);
router.delete('/:gunId', gunCtrl.deleteGun);

module.exports = router