'use strict';

const mongoose = require('mongoose');

const user = mongoose.model('userSchema');
const admin = mongoose.model('adminSchema');

exports.create = async (data) => {
    var _admin = new admin(data);
    await _admin.save();
}

exports.login = async (data) => {
    const res = await admin.findOne({
        login: data.login,
        password: data.password
    });
    return res;
}

exports.resetAllPasswords = function (data) {
    return new Promise((resolve, reject) => {
        let users;
        user.find({})
            .then((_users) => {
                users = _users;
                return _resetPassword(users, data);
            })
            .then(() => {
                resolve();
            })
            .catch(e => reject(e))
    });
}

function _resetPassword(users, newPwd) {
    return new Promise((resolve, reject) => {
        let promises = [];

        users.forEach(_user => {
            promises.push(
                user.findByIdAndUpdate(_user.id,
                    {
                        $set: {
                            password: newPwd
                        }
                    })
            );

        });

        Promise.all(promises)
            .then(() => {
                resolve();
            })
            .catch(e => reject(e))
    })
}

exports.resetUserPassword = function (data) {
    return new Promise((resolve, reject) => {

    });
}

exports.getUsers = async (data) => {
    const users = await user.find({});
    return users;
}

exports.getUser = function (data) {
    return new Promise((resolve, reject) => {

    });
}