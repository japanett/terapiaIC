'use strict';

const mongoose = require('mongoose');
const pacient = mongoose.model('pacientSchema');
const game = mongoose.model('gameSchema');

exports.authenticate = async (data) => {
    return pacient.findOne({
        identifier: data
    });
};

exports.get = async (data) => {
    return await pacient.findById(data);
};

exports.postGame = async (data) => {
    let title;

    switch (data.gameID) {
        case 1:
            title = 'Jogo da Mercearia';
            break;

        case 2:
            title = 'Invasão Espacial';
            break;

        case 3:
            title = 'Bola na Caixa';
            break;

        case 4:
            title = 'Bloquinho';
            break;

        case 5:
            title = 'Pontes';
            break;

        case 6:
            title = 'Jogo do Labirinto';
            break;

        case 7:
            title = 'Fruit Jump';
            break;

        default:
            throw Error('GameID not specified!!!!');
    }

    let __game = {
        pacient: data.identifier,
        title: title,
        gameID: data.gameID,
        config: data.config,
        date: data.date,
        imersiveMode: data.imersiveMode,
        score: {
            esquerda: data.score.esquerda,
            direita: data.score.direita,
            cruzada: data.score.cruzada
        },
        error: {
            esquerda: data.error.esquerda,
            direita: data.error.direita,
            cruzada: data.error.cruzada
        },
        time: data.time,
    };
    let _game = new game(__game);

    await _game.save();
}
