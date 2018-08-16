'use strict';

const mongoose = require('mongoose');
const user = mongoose.model('userSchema');
const pacient = mongoose.model('PacientSchema');

const uuidv1 = require('uuid/v1');

exports.createPacient = async (data) => {
    var tempPacient = new pacient(data.pacient);

    await tempPacient.save();

    await user.findByIdAndUpdate(data.id, {
        $push: {
            'pacients': data.pacient
        }
    }, {
            rawResult: true,
            new: true
        });
}

exports.setPacientGame = async (data) => {

    var id = uuidv1();

    await user.findOneAndUpdate({
        'pacients.identifier': data.identifier
    }, {
            $push: {
                'pacients.$.toPlay': { 
                    gameID: data.toPlay,
                    config: data.config,
                    ordem: data.ordem,
                    idToPlay: id
                }
            }
        }, {
            new: true,
            rawResult: true
        });


    await pacient.findOneAndUpdate({ //WORKING
        identifier: data.identifier
    }, {
            $push: {
                toPlay: {
                    gameID: data.toPlay,
                    config: data.config,
                    ordem: data.ordem,
                    idToPlay: id
                }
            }
        }, {
            new: true,
            rawResult: true
        });
}

exports.deletePacientGame = async (data) => {

    await user.findOneAndUpdate({
        'pacients.identifier': data.identifier
    }, {
            $pull: {
                'pacients.$.toPlay': { idToPlay: data.gameid }
            }
        }, {
            new: true,
            rawResult: true
        });


    await pacient.findOneAndUpdate({ 
        identifier: data.identifier
    }, {
            $pull: {
                toPlay: {
                    idToPlay: data.gameid
                }
            }
        }, {
            new: true,
            rawResult: true
        });
}

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

exports.updatePacient = async (data) => {
    await user.findOneAndUpdate({ 'pacients.identifier': data.identifier }, 
    { $set: { 
        'pacients.$.name': data.name, 
        'pacients.$.active': data.active
    } }, {
        new: true,
        rawResult: true
    });

    await pacient.findOneAndUpdate({ 
        identifier: data.identifier
    }, {
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

exports.createUser = async (data) => {
    var tempUser = new user(data);
    await tempUser.save();
}

exports.get = async (data) => {
    const res = await user.findById(data);
    return res;
}

exports.getPacients = async (data) => {
    const res = await pacient.find({ 'medic.id': data });
    return res;
}

exports.getPacient = async (data) => {
    const res = await pacient.find({ 'medic.id': data.id, identifier: data.pacient_ident });
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