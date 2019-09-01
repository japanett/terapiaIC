'use strict';

const mongoose = require('mongoose');
const pacient = mongoose.model('pacientSchema');
const game = mongoose.model('gameSchema');
const {findGameById} = require("../util/game-util");

exports.authenticate = async (data) => {
    return pacient.findOne({
        identifier: data
    });
};

exports.get = async (data) => {
    return pacient.findById(data);
};

exports.postGame = async (data) => {
    let title = findGameById(data.gameID);
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
};
