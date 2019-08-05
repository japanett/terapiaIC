'use strict';

const encService = require('../services/enc-service');
const repository = require('../repositories/admin-repository');
const authService = require('../services/auth-service');

exports.create = async (req, res) => {
    console.log(req.body);
    try {
        var name = req.body.name;
        var login = req.body.login;
        var pwd = encService.encrypt(req.body.password, global.KEY);
        var email = req.body.email;

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
        console.log(e);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
}

exports.login = async (req, res, next) => {
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
        res.status(500).send({
            message: 'Failed to process request',
            success: false
        });
    }
}

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
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
};

exports.getUser = async (req, res) => {
    try {

    } catch (e) {
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
};

exports.resetAllPasswords = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const newPassword = encService.encrypt(req.body.password, global.KEY);

        if (!data.admin) {
            res.status(403).send({message: 'unauthorized access'});
            return;
        }

        repository.resetAllPasswords(newPassword)
            .then(() => {
                res.status(200).send({message: 'Senhas atualizadas'});
            })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
}

exports.resetUserPassword = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const recoveredPassword = await repository.resetUserPassword(data, global.KEY);

        res.status(200).send({data: recoveredPassword, success: true});
    } catch (e) {
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
}