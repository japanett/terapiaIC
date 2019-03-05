'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controller/admin-controller');
const authService = require('../services/auth-service');

router.post('/login', controller.login);
router.post('/create', controller.create);
router.patch('/users/reset-passwords', authService.authorize, controller.resetAllPasswords);
router.get('/users', authService.authorize, controller.getUsers);

module.exports = router;