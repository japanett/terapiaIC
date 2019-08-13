'use strict';

const encService = require('../services/enc-service');
const repository = require('../repositories/admin-repository');
const authService = require('../services/auth-service');
const logger = require('../winston');

exports.create = async (req, res) => {
    try {
        let name = req.body.name;
        let login = req.body.login;
        let pwd = encService.encrypt(req.body.password, global.KEY);
        let email = req.body.email;

        await repository.create({
            login: login,
            password: pwd,
            email: email,
            name: name,
            admin: true
        });

        res.status(201).send({
            message: 'Admin ' + req.body.name + ' criado.',
            success: true,
            login: req.body.login
        });
    } catch (e) {
        logger.error(e);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
};

exports.login = async (req, res) => {
    try {
        const admin = await repository.login({
            login: req.body.login,
            password: encService.encrypt(req.body.password, global.KEY)
        });
        if (!admin) {
            res.status(401).send({
                message: 'Invalid login or password !',
                success: false
            });
            return;
        }

        const token = await authService.generateToken({
            id: admin.id,
            admin: admin.admin
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

exports.getUsers = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        const data = await authService.decodeToken(token);
        if (!data.admin) {
            res.status(403).send({message: 'unauthorized access'});
            return;
        }
        const users = await repository.getUsers(data.id);

        res.status(200).send({data: users});

    } catch (e) {
        logger.error(e);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
};

exports.resetUserPassword = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const recoveredPassword = await repository.resetUserPassword(data, global.KEY);

        res.status(200).send({data: recoveredPassword, success: true});
    } catch (e) {
        logger.error(e);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
};