'use strict';

const express = require('express');
const router = express.Router();
const {authorize} = require('../services/auth-service');
const {getUsers, login} = require('../controller/admin-controller');

router.post('/login', login);
router.get('/users', authorize, getUsers);

module.exports = router;