'use strict';

const mongoose = require('mongoose');
const user = mongoose.model('userSchema');
const pacient = mongoose.model('PacientSchema');

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
  
    await user.findOneAndUpdate({
        'pacients.identifier': data.identifier
    }, {
            $push: {
                'pacients.$.toPlay': { gameID: data.toPlay }
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
                    gameID: data.toPlay
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
                'pacients.$.toPlay': { gameID: data.toPlay }
            }
        }, {
            new: true,
            rawResult: true
        });


    await pacient.findOneAndUpdate({ //WORKING
        identifier: data.identifier
    }, {
            $pull: {
                toPlay: {
                    gameID: data.toPlay
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
                'name.first': data.name.first,
                'name.last': data.name.last,
                password: data.password,
                email: data.email
            }
        }, {
            new: true,
            rawResult: true
        });
}

exports.updatePacient = async (data) => {
    await user.findOneAndUpdate({ 'pacients.identifier': data.identifier }, { $set: { 'pacients.$.name.first': data.name.first, 'pacients.$.name.last': data.name.last, 'pacients.$.active': data.active } }, {
        new: true,
        rawResult: true
    });

    await pacient.findOneAndUpdate({ //WORKING
        identifier: data.identifier
    }, {
            $set: {
                'name.first': data.name.first,
                'name.last': data.name.last,
                age: data.age
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