'use strict';

const encService = require('../services/enc-service');
const authService = require('../services/auth-service');
const repository = require('../repositories/login-repository');
const logger = require('../winston');

exports.authenticate = async (req, res) => {
    try {
        const user = await repository.authenticate({
            login: req.body.login,
            password: encService.encrypt(req.body.password, global.KEY)
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
            success: true
        });
    } catch (e) {
        logger.error(e);
        res.status(500).send({
            message: 'Failed to process request',
            success: false
        });
    }
};