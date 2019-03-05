'use strict';

const mongoose = require('mongoose');

const encService = require('../services/enc-service');
const user = mongoose.model('userSchema');

// var tempPassword = encService.encrypt(realpwd, global.KEY);
exports.resetAllPasswords = function(data) {
    return new Promise((resolve, reject)=>{

    });
}

exports.resetUserPassword = function(data) {
    return new Promise((resolve, reject)=>{

    });
}