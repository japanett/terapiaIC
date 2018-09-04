'use strict';

const mongoose = require('mongoose');

const pacient = mongoose.model('pacientSchema');
const userSchema = mongoose.model('userSchema');
const game = mongoose.model('gameSchema');

const authService = require('../services/auth-service');
const repository = require('../repositories/pacient-repository');

exports.authenticate = async (req, res, next) => {
    try {
        let pacientPromise
        repository.authenticatePromise(req.body.identifier)
            .then(function (resp) {
                pacientPromise = resp
                console.log(pacientPromise)
            })
        
        const pacient = await repository.authenticate(req.body.identifier);
        if (!pacient) {
            res.status(404).send({
                message: 'Identificador inválido !',
                success: false
            });
            return;
        }
        const token = await authService.generateToken({
            pacient_id: pacient.id,
            medic_id: pacient.medic.id,
            identifier: pacient.identifier
        });

        res.status(200).send({
            message: 'Paciente ' + pacient.name + ' logado',
            success: true,
            token: token,
            data: {
                medic_id: pacient.medic.id,
                identifier: pacient.identifier
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Failed to process request',
            success: false
        });
    }
}

exports.get = async (req, res, next) => {
    try {
        //recupera token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        //decodifica token
        const data = await authService.decodeToken(token);

        var pacient = await repository.get(data.pacient_id);

        res.status(200).send({ data: pacient, success: true });
    } catch (e) {
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
        var dataGames = await repository.getGames(data.identifier);

        res.status(200).send({ data: dataGames, success: true });
    } catch (e) {
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
}

exports.postGame = async (req, res, next) => {
    try {
        //token:{identifier,medic_id}
        //recupera token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        //decodifica token
        const data = await authService.decodeToken(token);

        await repository.postGame({
            pacient_id: data.pacient_id,
            identifier: data.identifier,
            medic_id: data.medic_id,
            idToPlay: req.body.idToPlay,
            date: Date.now(),
            score: {
                esquerda: req.body.score.esquerda,
                direita: req.body.score.direita,
                cruzada: req.body.score.cruzada
            },
            error: {
                esquerda: req.body.erros.esquerda,
                direita: req.body.erros.direita,
                cruzada: req.body.erros.cruzada
            },
            time: req.body.time
        });

        res.status(200).send({
            message: 'Informações do jogo atualizado com sucesso ',
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
