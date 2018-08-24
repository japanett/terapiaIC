'use strict';
const mongoose = require('mongoose');
const pacient = mongoose.model('pacientSchema');
const user = mongoose.model('userSchema');
const game = mongoose.model('gameSchema');

exports.authenticate = async (data) => {
    const res = await pacient.findOne({
        identifier: data
    });
    return res;
}

exports.get = async (data) => {
    const res = await pacient.findById(data);
    return res;
}

exports.getGames = async (data) => {
    const res = await game.find({ pacient: data, played: false });
    return res;
}

exports.postGame = async (data) => {
    await game.findOneAndUpdate({ idToPlay: data.idToPlay }, {
        $set: {
            date: data.date,
            score: data.score,
            error: data.error,
            time: data.time,
            played: true
        }
    }, {
            new: true,
            rawResult: true
        })
        .then(() => {
            return pacient.findOneAndUpdate({ identifier: data.identifier }, {
                $pull: { games: { 'idToPlay': data.idToPlay } }
            }, {
                    new: true,
                    rawResult: true
                });
        });
}
