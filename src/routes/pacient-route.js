'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controller/pacient-controller');
const authService = require('../services/auth-service');

router.post('/auth', controller.authenticate);
router.put('/games', authService.authorize, controller.put);
router.get('/', authService.authorize, controller.get);

module.exports = router;