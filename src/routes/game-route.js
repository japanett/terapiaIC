'use strict';

const express = require('express');
const router = express.Router();
const {findByGameId,listAllGames} = require('../controller/game-controller');

router.get('/:gameid', findByGameId);
router.get('/', listAllGames);

module.exports = router;


