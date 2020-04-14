'use strict';

const mongoose = require('mongoose');

const csvService = require('../services/csv-service');
const encService = require('../services/enc-service');
const user = mongoose.model('userSchema');
const pacient = mongoose.model('pacientSchema');
const game = mongoose.model('gameSchema');
const logger = require('../winston');
const {findGameById} = require("../util/game-util");


exports.createPacient = async (data) => {
    let tempPacient = new pacient(data.pacient);
    await tempPacient.save();
    await user.findByIdAndUpdate(data.id, {
        $push: {
            pacients: {
                identifier: data.pacient.identifier
            }
        }
    }, {
        rawResult: true,
        new: true
    });
};

exports.recoverPassword = function (data, key) {
    return new Promise((resolve, reject) => {
        user.findOne({email: data})
            .then((_user) => {
                let decPassword = encService.decrypt(_user.password, key);
                resolve({pwd: decPassword, login: _user.login});
            })
            .catch(function (e) {
                logger.error(e);
                reject(e);
            })
    })
};

exports.changePassword = function (newPassword, data) {
    return new Promise((resolve, reject) => {
        user.findByIdAndUpdate(data.id, {
            $set: {
                password: newPassword
            }
        })
            .then((_user) => {
                resolve(_user);
            })
            .catch(function (e) {
                logger.error(e);
                reject(e);
            })
    });
};

exports.generateReport = function (data) {
    return new Promise((resolve) => {
        let _user;
        user.findById(data)
            .then((__user) => {
                _user = __user;
                return pacient.find({medic: _user._id})
            })
            .then((pacients) => {
                // _identifiers = pacients.map(x => x.identifier);
                return _getGamesCSV(pacients);
            })
            .then((csvJsonObject) => {
                return csvService.sendReport(_user, csvJsonObject);
            })
            .then((filePath) => {
                resolve(filePath);
            })
            .catch(function (e) {
                logger.error(e.message);
            })
    });
};

function _getGamesCSV(pacients) {
    return new Promise((resolve, reject) => {
        let promises = [];
        let _games = [];
        pacients.forEach((pacient) => {
            let _pacient = pacient;
            promises.push(
                game.find({pacient: _pacient.identifier})
                    .then((games) => {
                        games.forEach((game) => {
                            let _filtered = _filterGameAndPacient(_pacient, game);
                            _games.push(_filtered);
                        });
                    })
                    .catch(function (e) {
                        logger.error(e);
                        reject(e);
                    })
            );
        });
        Promise.all(promises)
            .then(() => {
                resolve(_games);
            })
            .catch((e) => {
                logger.error(e);
                reject(e);
            })
    });
}

function _filterGameAndPacient(pacient, game) {
    let _date = game.date;
    let _translateImserviseMode = game.imersiveMode ? 'Ativado' : 'Desativado';
    let _config = game.config
        .replace('2', 'Mão Direita')
        .replace('1', 'Mão Esquerda')
        .replace('3', 'Alternada');
    return {
        nome: pacient.name,
        sexo: pacient.sexo,
        idade: pacient.age,
        patologia: pacient.patologia,
        objetivo: pacient.objetivo,
        nome_jogo: game.title,
        observation: game.observation,
        mao_dominante: pacient.mao_dominante,
        gmfcs: pacient.gmfcs,
        config: _config,
        imersiveMode: _translateImserviseMode,
        data_jogo: _date.toLocaleDateString(),
        hora_jogo: _date.toLocaleTimeString(),
        tempo: game.time,
        score_mao_direita: game.score.direita,
        score_mao_esquerda: game.score.esquerda,
        score_mao_cruzada: game.score.cruzada,
        erro_mao_direita: game.error.direita,
        erro_mao_esquerda: game.error.esquerda,
        erro_mao_cruzada: game.error.cruzada,
    };
}

exports.setPacientGame = async (data) => {
    let title = findGameById(data.gameID);
    await pacient.findOneAndUpdate({
        identifier: data.identifier
    }, {
        $push: {
            games: {
                gameID: data.gameID,
                config: data.config,
                title: title,
                time: data.time,
                imersiveMode: data.imersiveMode
            }
        }
    }, {
        new: true,
        rawResult: true
    });
};

exports.removePacientGame = async (data) => {
    await pacient.update({_id: data.pacient}, {"$pull": {"games": {"gameID": data.gameid}}}, {safe: true});
};

exports.updatePacientGame = async (data) => {
    await pacient.update({_id: data.pacientId}, {"$pull": {"games": {"gameID": data.gameID}}}, {safe: true})
        .then(() => {
            let title = findGameById(data.gameID);
            return pacient.findOneAndUpdate({
                _id: data.pacientId
            }, {
                $push: {
                    games: {
                        gameID: data.gameID,
                        config: data.config,
                        title: title,
                        time: data.time,
                        imersiveMode: data.imersiveMode
                    }
                }
            }, {
                new: true,
                rawResult: true
            });
        });
};

exports.update = async (data) => {
    await user.findByIdAndUpdate(data.id,
        {
            $set: {
                name: data.name,
                email: data.email
            }
        }, {
            new: true,
            rawResult: true
        });
};

exports.updatePacient = async (data) => {
    await pacient.findOneAndUpdate({identifier: data.identifier, medic: data.medic}, {
        $set: {
            name: data.name,
            age: data.age,
            sexo: data.sexo,
            active: data.active,
            objetivo: data.objetivo,
            patologia: data.patologia,
            mao_dominante: data.mao_dominante,
            gmfcs: data.gmfcs
        }
    }, {
        new: true,
        rawResult: true
    });
};

exports.createUser = async (data) => {
    let tempUser = new user(data);
    await tempUser.save();
};

exports.get = async (data) => {
    return user.findById(data);
};

exports.getPacients = async (data) => {
    return pacient.find({medic: data}).sort({'name':1});
};

exports.getPacient = async (data) => {
    return pacient.find({medic: data.id, identifier: data.pacient_ident});
};

exports.delete = async (data) => {
    await user.findByIdAndRemove(data);
    await pacient.remove({medic: data});
    await game.remove({medic: data});
};

exports.removePacient = async (data) => {
    await user.findByIdAndUpdate(data.id, {
        $pull: {pacients: {'identifier': data.identifier}}
    }, {
        new: true,
        rawResult: true
    });

    await pacient.findOneAndRemove({
        identifier: data.identifier
    });
    await game.remove({
        pacient: data.identifier
    });
};

exports.getGameId = async (data) => {
    return game.findOne({gameID: data.gameID, pacient: data.identifier});
};

exports.getPacientGames = async (data) => {
    return game.find({pacient: data.pacient}).sort({'title':1});
};

exports.getPacientGame = async (data) => {
    return game.findOne({_id: data.gameId, pacient: data.identifier});
};

exports.deletePacientGameReport = function (gameId) {
    return new Promise((resolve, reject) => {
        game.findByIdAndRemove(gameId)
            .then((removedGame) => {
                return resolve(removedGame);
            })
            .catch(e => {
                logger.error(e);
                return reject(false);
            })
    })
};

exports.setGameReportObservation = async (data) => {
    await game.findByIdAndUpdate(data.id,
        {
            $set: {
                observation: data.observation
            }
        });
};