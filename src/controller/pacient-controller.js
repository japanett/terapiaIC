'use strict';

const authService = require('../services/auth-service');
const repository = require('../repositories/pacient-repository');
const logger = require('../winston');

exports.authenticate = async (req, res) => {
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
        logger.error(e);
        res.status(500).send({
            message: 'Failed to process request',
            success: false
        });
    }
};

exports.get = async (req, res) => {
    try {
        //recupera token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        //decodifica token
        const data = await authService.decodeToken(token);

        let pacient = await repository.get(data.pacient_id);

        res.status(200).send({data: pacient, success: true});
    } catch (e) {
        logger.error(e);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
};

// TODO - refatorar
exports.postGame = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        const data = await authService.decodeToken(token);
        await repository.postGame({
            identifier: data.identifier,
            config: req.body.config,
            gameID: req.body.gameID,
            imersiveMode: req.body.imersiveMode,
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
        logger.error(e);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
};
