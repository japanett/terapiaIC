'use strict';

const mongoose = require('mongoose');
const user = mongoose.model('userSchema');
const md5 = require('md5');
const authService = require('../services/auth-service');
const repository = require('../repositories/login-repository');

exports.authenticate = async (req, res, next) => {
    try {
        const user = await repository.authenticate({
            login: req.body.login,
            password: md5(req.body.password + global.SALT_KEY)
        });
        if (!user) {
            res.status(401).send({
                message: 'Invalid login or password !',
                success: false
            });
            return;
        }
        const token = await authService.generateToken({
            login: user.login,
            id: user._id
        });

        res.status(200).send({
            token: token,
            success: true,
            data: {
                login: user.login,
                id: user._id
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Failed to process request',
            success: false
        });
    }
}