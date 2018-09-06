'use strict';

const mongoose = require('mongoose');
const md5 = require('md5');
const emailService = require('../services/email-service');
const authService = require('../services/auth-service');
const repository = require('../repositories/user-repository');

exports.get = async (req, res, next) => {
    try {
        //recupera token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        //decodifica token
        const data = await authService.decodeToken(token);

        var datalogin = await repository.get(data.id);

        res.status(200).send({ data: datalogin, success: true });
    } catch (e) {
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
}

exports.getPacients = async (req, res, next) => {
    try {
        //recupera token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        //decodifica token
        const data = await authService.decodeToken(token);

        var dataPacients = await repository.getPacients(data.id);

        res.status(200).send({ data: dataPacients, success: true });
    } catch (e) {
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
}

exports.getPacient = async (req, res, next) => {
    try {
        //recupera token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        //decodifica token
        const data = await authService.decodeToken(token);

        var dataPacients = await repository.getPacient({
            id: data.id,
            pacient_ident: req.params.identifier
        });

        res.status(200).send({ data: dataPacients, success: true });
    } catch (e) {
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
}

exports.update = async (req, res, next) => {
    try {
        //token:{login,id}
        //recupera token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        //decodifica token
        const data = await authService.decodeToken(token);

        await repository.update({
            id: data.id,
            name: req.body.name,
            email: req.body.email
        });

        res.status(200).send({
            message: 'User: ' + req.body.name + ' atualizado com sucesso !',
            success: true
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
}

exports.createUser = async (req, res, next) => {
    console.log('logging user create');
    console.log(req.body);
    try {
        var name = req.body.name;
        var login = req.body.login;
        var realpwd = req.body.password;
        var email = req.body.email;

        var tempPassword = md5(realpwd + global.SALT_KEY);

        var subject = ('Bem vindo(a) name !').replace('name', name);

        var index = [
            'name',
            'login',
            'pwd'
        ];
        var index2 = [
            name,
            login,
            realpwd
        ];
        var body = global.EMAIL_TMPL_CREATE_USER;
        for (var i = 0; i < index.length; i++) {
            body = body.replace(index[i], index2[i]);
        }

        emailService.sendEMAIL(
            email,
            subject,
            body
        );

        await repository.createUser({
            login: login,
            password: tempPassword,
            email: email,
            name: name
        });

        res.status(201).send({
            message: 'Terapeuta ' + req.body.name + ' criado.',
            success: true,
            login: req.body.login
        });
        // console.log('*Usuário "%s" criado \npassword: %s', login, realpwd);
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
}

exports.setPacientGame = async (req, res, next) => {
    try {
        //token:{login,id}
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        let exists = await repository.getGameId({ gameID: req.body.toPlay, identifier: req.params.identifier });

        if (exists) {
            res.status(406).send({
                message: 'Jogo já foi criado para o paciente',
                success: false
            });
        } else {
            await repository.setPacientGame({
                identifier: req.params.identifier,
                gameID: req.body.toPlay,
                config: req.body.config,
                medic: data.id
            });
            res.status(200).send({
                message: 'Adicionado jogos para o Paciente: ' + req.params.identifier,
                success: true
            });

        }
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
}

exports.deletePacientGame = async (req, res, next) => {
    try {
        //token:{login,id}
        //recupera token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        //decodifica token
        const data = await authService.decodeToken(token);

        await repository.deletePacientGame({
            medic: data.id,
            pacient: req.params.pacientid,
            gameid: req.params.gameid
        });

        res.status(200).send({
            message: 'Jogo removido',
            success: true
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
}

exports.updatePacient = async (req, res, next) => {
    try {
        //token:{login,id}
        //recupera token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        //decodifica token
        const data = await authService.decodeToken(token);

        await repository.updatePacient({
            medic: data.id,
            identifier: req.params.identifier,
            name: req.body.name,
            sexo: req.body.sexo,
            age: req.body.age,
            active: req.body.active,
            objetivo: req.body.objetivo,
            patologia: req.body.patologia
        });

        res.status(200).send({
            message: 'Paciente: ' + req.body.name + ' atualizado com sucesso !',
            success: true
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
}

exports.createPacient = async (req, res, next) => {
    try {
        //token:{login,id}
        //recupera token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        //decodifica token
        const data = await authService.decodeToken(token);

        //i need to check identifier to be unique
        var identifier = (md5(req.body.name + global.SALT_KEY)).substring(0, 6);


        //validando se o usuario existe
        var validate = await repository.get(data.id);
        if (validate) {
            await repository.createPacient({
                pacient: {
                    name: req.body.name,
                    age: req.body.age,
                    sexo: req.body.sexo,
                    patologia: req.body.patologia,
                    objetivo: req.body.objetivo,
                    identifier: identifier,
                    medic: data.id,
                    games: req.body.games
                },
                id: data.id
            });
            var subject = ('Dados do seu paciente - name ').replace('name', req.body.name);
            var index = [
                'username',
                'namepaciente',
                'sexopaciente',
                'idadepaciente',
                'patologiapaciente',
                'objetivopaciente',
                'identifier'
            ];
            var index2 = [
                validate.name,
                req.body.name,
                req.body.sexo,
                req.body.age,
                req.body.patologia,
                req.body.objetivo,
                identifier
            ];
            var body = global.EMAIL_TMPL_CREATE_PACIENT;
            for (var i = 0; i < index.length; i++) {
                body = body.replace(index[i], index2[i]);
            }
            // console.log('subject: ', subject);
            // console.log('body: ', body);
            emailService.sendEMAIL(
                validate.email,
                subject,
                body
            );
            res.status(200).send({
                message: data.login + ' added pacient ' + req.body.name,
                pacient_identifier: identifier,
                success: true
            });
            return;
        } else {
            res.status(200).send({
                message: 'User doesnt exist, cannot create pacient',
                success: false
            });
        }

    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Failed process request'
        });
    }
}

exports.delete = async (req, res, next) => {
    try {
        //recupera token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        //decodifica token
        const data = await authService.decodeToken(token);

        await repository.delete(data.id);

        res.status(200).send({
            message: 'account ' + data.login + ' deleted',
            success: true
        });
    } catch (e) {
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
}

exports.removePacient = async (req, res, next) => {
    try {
        //recupera token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        //decodifica token
        const data = await authService.decodeToken(token);

        // deletando pelo identifier do paciente
        await repository.removePacient({
            pacient: req.body.pacient,
            identifier: req.params.identifier,
            id: data.id
        });
        res.status(200).send({
            message: 'Paciente excluído',
            success: true
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
}
exports.getGames = async (req, res, next) => {
    try {
        //recupera token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        //decodifica token
        const data = await authService.decodeToken(token);

        var dataPacients = await repository.getGames(data.id);

        res.status(200).send({ data: dataPacients, success: true });
    } catch (e) {
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
}
exports.getPacientGames = async (req, res, next) => {
    try {
        //recupera token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        //decodifica token
        const data = await authService.decodeToken(token);

        var dataPacients = await repository.getPacientGames({ medic: data.id, pacient: req.params.id });

        res.status(200).send({ data: dataPacients, success: true });
    } catch (e) {
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
}