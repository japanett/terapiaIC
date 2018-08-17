'use strict';
const mongoose = require('mongoose');
const pacient = mongoose.model('pacientSchema');
const user = mongoose.model('userSchema');

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

exports.put = async (data) => {
    //Remove o jogo da lista toPlay
    // await user.findOneAndUpdate({
    //     'pacients.identifier': data.identifier
    // }, {
    //         $pull: {
    //             'pacients.$.toPlay': { gameID: data.gameID }
    //         }
    //     }, {
    //         new: true,
    //         rawResult: true
    //     });

    if (data.gameID === 1) {
        await pacient.findOneAndUpdate({
            identifier: data.identifier
        }, {
                $push: {
                    'games.gameMaca': data.game
                }
            }, {
                new: true,
                rawResult: true
            });
        //Remove o jogo da lista toPlay
        // await pacient.findByIdAndUpdate(data.pacient_id, {
        //     $pull: {
        //         'toPlay': {
        //             'gameID': data.gameID
        //         }
        //     }
        // }, {
        //         new: true,
        //         rawResult: true
        //     });

        return true
    } else {
        return false
    }

}
