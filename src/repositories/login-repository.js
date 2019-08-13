'use strict';

const mongoose = require('mongoose');
const user = mongoose.model('userSchema');

exports.authenticate = async (data) => {
    return user.findOne({
        login: data.login,
        password: data.password
    });
};