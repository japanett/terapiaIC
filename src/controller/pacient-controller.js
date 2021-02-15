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
        logger.error(e.stack);
        res.status(500).send({
            message: 'Failed to process request',
            success: false
        });
    }
};

exports.get = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);
        let pacient = await repository.get(data.pacient_id);
        res.status(200).send({data: pacient, success: true});
    } catch (e) {
        logger.error(e);
        logger.error(e.stack);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
};

// TODO - refatorar
exports.postGame = async (req, res) => {
    try {
        const requestBody = req.body;
        const token = requestBody.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);
        await repository.postGame({
            identifier: data.identifier,
            config: requestBody.config,
            gameID: requestBody.gameID,
            imersiveMode: requestBody.imersiveMode,
            date: Date.now(),
            score: {
                esquerda: requestBody.score.esquerda,
                direita: requestBody.score.direita,
                cruzada: requestBody.score.cruzada
            },
            error: {
                esquerda: requestBody.erros.esquerda,
                direita: requestBody.erros.direita,
                cruzada: requestBody.erros.cruzada
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

exports.relatorio = async (req, res) => {
    try {
        const relatorio = await repository.relatorios();
        res.status(200).send({data: relatorio, success: true});
    } catch (e) {
        logger.error(e);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }

};
