'use strict';

const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');

const user = mongoose.model('userSchema');
const pacient = mongoose.model('pacientSchema');
const game = mongoose.model('gameSchema');

//OK
exports.createPacient = async (data) => {
    var tempPacient = new pacient(data.pacient);

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
}

//OK
exports.setPacientGame = async (data) => {

    var id = uuidv1();

    var title;
    if (data.gameID === 1) {
        title = 'Jogo da maca'
    }
    var __game = {
        pacient: data.identifier,
        title: title,
        gameID: data.gameID,
        config: data.config,
        ordem: data.ordem,
        medic: data.medic,
        idToPlay: id
    };
    var _game = new game(__game);

    await _game.save();

    await pacient.findOneAndUpdate({
        identifier: data.identifier
    }, {
            $push: {
                games: {
                    idToPlay: id
                }
            }
        }, {
            new: true,
            rawResult: true
        });
}

// OK, fazer validação da existencias jogo
exports.deletePacientGame = async (data) => {
    // await Promise.all([pacient.findByIdAndUpdate(data.pacient, {
    //     $pull: { games: { 'idToPlay': data.gameid } }
    // }, {
    //         new: true,
    //         rawResult: true
    //     }), game.findOneAndRemove({ idToPlay: data.gameid })]);
    pacient.findByIdAndUpdate(data.pacient, {
        $pull: { games: { 'idToPlay': data.gameid } }
    }, {
            new: true,
            rawResult: true
        })
        .then(() => {
            return game.findOneAndRemove({ idToPlay: data.gameid });
        });
}

//OK
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
}
//OK
exports.updatePacient = async (data) => {
    await pacient.findOneAndUpdate({ identifier: data.identifier, medic: data.medic }, {
        $set: {
            name: data.name,
            age: data.age,
            sexo: data.sexo,
            active: data.active,
            objetivo: data.objetivo,
            patologia: data.patologia
        }
    }, {
            new: true,
            rawResult: true
        });
}
//OK
exports.createUser = async (data) => {
    var tempUser = new user(data);
    await tempUser.save();
}
//OK
exports.get = async (data) => {
    const res = await user.findById(data);
    return res;
}
//OK
exports.getPacients = async (data) => {
    const res = await pacient.find({ medic: data });
    return res;
}
//OK
exports.getPacient = async (data) => {
    const res = await pacient.find({ medic: data.id, identifier: data.pacient_ident });
    return res;
}

exports.delete = async (data) => {
    await user.findByIdAndRemove(data);
}

exports.removePacient = async (data) => {
    //tratar o erro caso o usuario n exista, exemplo no createPacient
    await user.findByIdAndUpdate(data.id, {
        $pull: {
            'pacients': {
                'identifier': data.identifier
            }
        }
    }, {
            new: true,
            rawResult: true
        });

    await pacient.findOneAndRemove({
        identifier: data.identifier
    });
    //http://mongoosejs.com/docs/subdocs.html
}