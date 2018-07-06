'use strict';

const mongoose = require('mongoose');
const md5 = require('md5');
const emailService = require('../services/email-service');
const authService = require('../services/auth-service');
const repository = require('../repositories/user-repository');

// var config = require('../config');
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(config.sendgridKey);

// https://github.com/balta-io/1972/blob/master/src/repositories/product-repository.js
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

//Ao fazer o update do user, sempre pedir a senha e enviar no body
exports.update = async (req, res, next) => {
    try {
        //token:{login,id}
        //recupera token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        //decodifica token
        const data = await authService.decodeToken(token);

        var tempPassword = md5(req.body.password + global.SALT_KEY);

        await repository.update({
            id: data.id,
            name: {
                first: req.body.name.first,
                last: req.body.name.last
            },
            password: tempPassword,
            email: req.body.email
        });

        res.status(200).send({
            message: 'User: ' + req.body.name.first + ' atualizado com sucesso !',
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
    try {
        var firstname = req.body.name.first;
        var login = req.body.login;
        var realpwd = req.body.password;
        var email = req.body.email;

        var tempPassword = md5(realpwd + global.SALT_KEY);

        var subject = ('Bem vindo(a) name !').replace('name', firstname);

        var index = [
            'name',
            'login',
            'pwd'
        ];
        var index2 = [
            firstname,
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
            name: {
                first: firstname,
                last: req.body.name.last
            }
        });


        // const msg = {
        //     to: req.body.email,
        //     from: 'APP Terapeuta',
        //     subject: 'APP Terapeuta, Bem vindo(a) ' + req.body.name.first,
        //     // text: 'TEEESTand easy to do anywhere, even with Node.js',
        //     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        // };
        // await sgMail.send(msg);

        res.status(201).send({
            message: 'Terapeuta ' + req.body.name.first + ' ' + req.body.name.last + ' criado.',
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
        //recupera token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        //decodifica token
        const data = await authService.decodeToken(token);

        await repository.setPacientGame({
            identifier: req.params.identifier,
            toPlay: req.body.toPlay,
            id: data.id
        });

        res.status(200).send({
            message: 'Adicionado jogos para o Paciente: ' + req.params.identifier,
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

exports.deletePacientGame = async (req, res, next) => {
    try {
        //token:{login,id}
        //recupera token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        //decodifica token
        const data = await authService.decodeToken(token);

        await repository.deletePacientGame({
            identifier: req.params.identifier,
            toPlay: req.body.toPlay,
            id: data.id
        });

        res.status(200).send({
            message: 'Removido jogo ' + req.body.toPlay + ' do paciente: ' + req.params.identifier,
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
            identifier: req.params.identifier,
            id: data.id,
            name: {
                first: req.body.name.first,
                last: req.body.name.last
            },
            age: req.body.age,
            active: req.body.active
        });

        res.status(200).send({
            message: 'Paciente: ' + req.body.name.first + ' atualizado com sucesso !',
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
        var identifier = (md5(req.body.
            name.first + req.body.name.last + global.SALT_KEY)).substring(0, 5);


        //validando se o usuario existe
        var validate = await repository.get(data.id);
        if (validate) {
            await repository.createPacient({
                pacient: {
                    name: {
                        first: req.body.name.first,
                        last: req.body.name.last
                    },
                    age: req.body.age,
                    sexo: req.body.sexo,
                    patologia: req.body.patologia,
                    objetivo: req.body.objetivo,
                    identifier: identifier,
                    medic: {
                        id: data.id
                    },
                    toPlay: req.body.toPlay
                },
                id: data.id
            });
            var subject = ('Dados do seu paciente - name ').replace('name', req.body.name.first);
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
                validate.name.first,
                req.body.name.first,
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
                message: data.login + ' added pacient ' + req.body.name.first + ' ' + req.body.name.last,
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

        // deletando pelo identifier do paciente
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
