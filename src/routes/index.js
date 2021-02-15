'use strict';

const express = require('express');
const router = express.Router();
const {get} = require('../controller/index-controller');

router.get('/ping', get);

module.exports = router;
