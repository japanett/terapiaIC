'use strict';

const mongoose = require('mongoose');
const game = mongoose.model('gameSchema');

exports.findByGameId = async (gameID) => {
    return game.find({
        gameID: gameID
    });
};

exports.listAllGames = async (gameID) => {
    return game.find({});
};
