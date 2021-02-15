'use strict';

const md5 = require('md5');
const encService = require('../services/enc-service');
const emailService = require('../services/email-service');
const authService = require('../services/auth-service');
const repository = require('../repositories/user-repository');
const logger = require('../winston');

exports.get = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        let datalogin = await repository.get(data.id);

        res.status(200).send({data: datalogin, success: true});
    } catch (e) {
        logger.error(e);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);
        const newPassword = encService.encrypt(req.body.password, process.env.KEY_ENCRYPT);
        const user = await repository.changePassword(newPassword, data);
        return res.status(200).send({data: user});
    } catch (e) {
        logger.error(e);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
};

exports.recoverPassword = async (req, res) => {
    try {
        const email = req.params.email;
        const recovered = await repository.recoverPassword(email, process.env.KEY_ENCRYPT);
        if (recovered.pwd) {
            let subject = ('GamesVR Recuperação de senha');
            let body = 'Login: ' + recovered.login + '<br><br>Senha: ' + recovered.pwd;
            await emailService.sendEMAIL(
                email,
                subject,
                body
            );
        }
        res.status(200).send({data: recovered, success: true});
    } catch (e) {
        logger.error(e);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
};

exports.generateReport = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);
        const report = await repository.generateReport(data.id);
        if (!!report) {
            res.status(200).send({message: 'CSV ENVIADO COM SUCESSO', success: true});
        } else {
            res.status(503).send({message: 'CSV GENERATION ERROR', success: false});
        }
    } catch (e) {
        logger.error(e);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
};

exports.getPacients = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);
        let dataPacients = await repository.getPacients(data.id);
        res.status(200).send({data: dataPacients, success: true});
    } catch (e) {
        logger.error(e);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
};

exports.getPacient = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);
        let dataPacients = await repository.getPacient({
            id: data.id,
            pacient_ident: req.params.identifier
        });
        res.status(200).send({data: dataPacients, success: true});
    } catch (e) {
        logger.error(e);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
};

exports.update = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
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
        logger.error(e);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
};

exports.createUser = async (req, res) => {
    logger.info('logging user create');
    try {
        let name = req.body.name;
        let login = req.body.login;
        let encPwd = encService.encrypt(req.body.password, process.env.KEY_ENCRYPT);
        let email = req.body.email;
        let subject = ('Bem vindo(a) name !').replace('name', name);
        let index = [
            'name',
            'login',
            'pwd'
        ];
        let index2 = [
            name,
            login,
            req.body.password
        ];
        let body = 'Olá, <strong>name</strong><br>Você acabou de se cadastrar no <b>APP Games VR</b> !<br><br><strong>Usuário</strong>: login<br><strong>Senha</strong>: pwd';
        for (let i = 0; i < index.length; i++) {
            body = body.replace(index[i], index2[i]);
        }
        await emailService.sendEMAIL(
            email,
            subject,
            body
        );
        await repository.createUser({
            login: login,
            password: encPwd,
            email: email,
            name: name
        });
        res.status(201).send({
            message: 'Terapeuta ' + req.body.name + ' criado.',
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

exports.setPacientGame = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);
        await repository.setPacientGame({
            identifier: req.params.identifier,
            gameID: parseInt(req.body.toPlay),
            config: req.body.config,
            medic: data.id,
            time: req.body.time,
            imersiveMode: req.body.imersiveMode
        });
        res.status(200).send({
            message: 'Adicionado jogos para o Paciente: ' + req.params.identifier,
            success: true
        });
    } catch (e) {
        logger.error(e);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
};

exports.deletePacientGame = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);
        await repository.removePacientGame({
            medic: data.id,
            pacient: req.params.pacientid,
            gameid: parseInt(req.params.gameid)
        });
        res.status(200).send({
            message: 'Jogo removido',
            success: true
        });
    } catch (e) {
        logger.error(e);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
};

exports.updatePacient = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);
        await repository.updatePacient({
            medic: data.id,
            identifier: req.params.identifier,
            name: req.body.name,
            sexo: req.body.sexo,
            age: req.body.age,
            mao_dominante: req.body.mao_dominante,
            gmfcs: req.body.gmfcs,
            active: req.body.active,
            objetivo: req.body.objetivo,
            patologia: req.body.patologia
        });
        res.status(200).send({
            message: 'Paciente: ' + req.body.name + ' atualizado com sucesso !',
            success: true
        });
    } catch (e) {
        logger.error(e);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
};

exports.createPacient = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);
        //i need to check identifier to be unique
        let identifier = (md5(req.body.name + process.env.SALT_KEY)).substring(0, 6);
        //validando se o usuario existe
        let validate = await repository.get(data.id);
        if (validate) {
            await repository.createPacient({
                pacient: {
                    name: req.body.name,
                    age: req.body.age,
                    sexo: req.body.sexo,
                    mao_dominante: req.body.mao_dominante,
                    gmfcs: req.body.gmfcs,
                    patologia: req.body.patologia,
                    objetivo: req.body.objetivo,
                    identifier: identifier,
                    medic: data.id,
                    games: req.body.games
                },
                id: data.id
            });
            let subject = ('Dados do seu paciente - name ').replace('name', req.body.name);
            let index = [
                'username',
                'namepaciente',
                'sexopaciente',
                'idadepaciente',
                'patologiapaciente',
                'objetivopaciente',
                'identifier'
            ];
            let index2 = [
                validate.name,
                req.body.name,
                req.body.sexo,
                req.body.age,
                req.body.patologia,
                req.body.objetivo,
                identifier
            ];
            let body = '<h2>Olá, username</h2><br><h2>Você acabou de cadastrar um paciente !</h2><br>Seguem os dados do mesmo: <br><br><strong>Identificador</strong>: identifier<br><strong>Nome</strong>: namepaciente<br><strong>Sexo</strong>: sexopaciente<br><strong>Idade</strong>: idadepaciente<br><strong>Patologia</strong>: patologiapaciente<br><strong>Objetivo</strong>: objetivopaciente<br><br><h3><u style="color:blue;">Lembrando que o paciente irá utilizar o Identificador para se logar no jogo !</u></h3>';
            for (let i = 0; i < index.length; i++) {
                body = body.replace(index[i], index2[i]);
            }
            await emailService.sendEMAIL(
                validate.email,
                subject,
                body
            );
            res.status(200).send({
                message: data.login + ' added pacient ' + req.body.name,
                pacient_identifier: identifier,
                success: true
            });
        } else {
            res.status(200).send({
                message: 'User doesnt exist, cannot create pacient',
                success: false
            });
        }
    } catch (e) {
        logger.error(e);
        res.status(500).send({
            message: 'Failed process request'
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);
        await repository.delete(data.id);
        res.status(200).send({
            message: 'account ' + data.login + ' deleted',
            success: true
        });
    } catch (e) {
        logger.error(e);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
};

exports.removePacient = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);
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
        logger.error(e);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
};

exports.updatePacientGame = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);
        await repository.updatePacientGame({
            config: req.body.config,
            time: req.body.time,
            id: data.id,
            gameID: parseInt(req.body.gameID),
            pacientId: req.params.pacientId,
            imersiveMode: req.body.imersiveMode
        })
            .then(() => {
                res.status(200).send({message: 'Jogo atualizado', success: true});
            });
    } catch (e) {
        logger.error(e);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
};

exports.getPacientGames = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        await authService.decodeToken(token);
        let dataPacients = await repository.getPacientGames({pacient: req.params.id});
        res.status(200).send({data: dataPacients, success: true});
    } catch (e) {
        logger.error(e);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
};

exports.getPacientGame = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        await authService.decodeToken(token);
        const gameId = req.params.gameId;
        const pacientIdentifier = req.params.id;
        let dataPacientGame = await repository.getPacientGame({
            gameId: gameId,
            identifier: pacientIdentifier
        });
        res.status(200).send({data: dataPacientGame, success: true});
    } catch (e) {
        logger.error(e);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
};

exports.deletePacientGameReport = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        await authService.decodeToken(token);
        const gameId = req.params.gameId;
        const gameDeleted = await repository.deletePacientGameReport(gameId);
        if (gameDeleted) {
            res.status(200).send({game: gameDeleted, message: 'Report deleted successfully', success: true});
        }
        if (!gameDeleted) {
            res.status(204).send();
        }
    } catch (e) {
        logger.error(e);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
};

exports.setGameReportObservation = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        await authService.decodeToken(token);
        const gameId = req.params.gameId;
        const observation = req.body.observation;
        await repository.setGameReportObservation({
            id: gameId,
            observation: observation
        })
            .then(() => {
                res.status(202).send({message: 'Game observation updated!', success: true});
            });
    } catch (e) {
        logger.error(e);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
};
