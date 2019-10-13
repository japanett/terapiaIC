'use strict';

const mongoose = require('mongoose');
const user = mongoose.model('userSchema');
const admin = mongoose.model('adminSchema');

exports.create = async (data) => {
    let _admin = new admin(data);
    await _admin.save();
};

exports.login = async (data) => {
    return admin.findOne({
        login: data.login,
        password: data.password
    });
};

exports.getUsers = async () => {
    return user.find({}).sort({'name':1});
};
