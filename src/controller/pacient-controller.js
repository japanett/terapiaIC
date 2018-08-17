'use strict';

const mongoose = require('mongoose');

const pacient = mongoose.model('pacientSchema');
const userSchema = mongoose.model('userSchema');

const authService = require('../services/auth-service');
const repository = require('../repositories/pacient-repository');

exports.authenticate = async (req, res, next) => {
    try {
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

exports.put = async (req, res, next) => {
    try {
        //token:{identifier,medic_id}
        //recupera token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        //decodifica token
        const data = await authService.decodeToken(token);

        let temp = {
            "gameID": req.body.gameID,
            "title": null,
            "seconds": req.body.seconds,
            "date": Date.now(),
            "acertos":req.body.acertos,
            "description": null,
            "error": {
                "mao": req.body.error.mao,
                "caixa": req.body.error.caixa
            }
        }
        if (req.body.gameID === 1) {
            temp.title = "Jogo da maçã";
            temp.description = "Descrição do jogo da maçã";
        }

        const val = await repository.put({
            pacient_id: data.pacient_id,
            identifier: data.identifier,
            medic_id: data.medic_id,
            gameID: req.body.gameID,
            game: temp,
            idToPlay: req.body.idToPlay
        });
        if (val) {
            res.status(200).send({
                message: 'Informações do jogo ' + temp.title + ' para o paciente ' + data.identifier + ' atualizada',
                success: true
            });
        } else {
            res.status(400).send({
                message: 'Jogo inexistente na base de dados',
                success: false
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