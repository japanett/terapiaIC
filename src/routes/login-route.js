'use strict';

const express = require('express');
const router = express.Router();
const {authenticate} = require('../controller/login-controller');

router.post('/', authenticate);

module.exports = router;