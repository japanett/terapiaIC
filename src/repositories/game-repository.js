'use strict';

const mongoose = require('mongoose');
const game = mongoose.model('gameSchema');

exports.findByGameId = async (gameID) => {
    return game.find({
        gameID: gameID
    });
};

exports.listAllGames = async () => {
    return game.find({}).sort({'title': 1});
};

exports.listByPacient = async (pacientId) => {
    return game.find({'pacient': pacientId}).sort({'title': 1});
};

exports.filtrarPor = async (title, pacientId) => {
    return game.find({'pacient': pacientId, 'title': title});
};
