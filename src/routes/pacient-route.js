'use strict';

const express = require('express');
const router = express.Router();
const {authorize} = require('../services/auth-service');
const {authenticate, postGame, get, relatorio} = require('../controller/pacient-controller');

router.post('/auth', authenticate);
router.put('/games', authorize, postGame);
router.get('/', authorize, get);
router.get('/relatorio', relatorio);

module.exports = router;
