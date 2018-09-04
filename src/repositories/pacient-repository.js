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

exports.authenticatePromise = (data) => {
    return new Promise(function (resolve, reject) {
        resolve(pacient.findOne({
            identifier: data
        }))
    })
}

exports.get = async (data) => {
    const res = await pacient.findById(data);
    return res;
}

exports.getPromise = (data) => {
    return new Promise(function (resolve, reject) {
        resolve(pacient.findById(data))
    })
}

exports.getGames = async (data) => {
    const res = await game.find({ pacient: data, played: false });
    return res;
}

exports.getGamesPromise = (data) => {
    return new Promise(function (resolve, reject) {
        resolve(game.find({ pacient: data, played: false }))
    })
}

exports.postGame = async (data) => {
    await game.findOneAndUpdate({ idToPlay: data.idToPlay }, {
        $set: {
            date: data.date,
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
