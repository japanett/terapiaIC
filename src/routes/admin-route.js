'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controller/admin-controller');
const authService = require('../services/auth-service');

router.put('/reset-passwords', controller.resetPwd);

module.exports = router;