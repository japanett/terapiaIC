'use strict';

const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');

const user = mongoose.model('userSchema');
const pacient = mongoose.model('pacientSchema');
const game = mongoose.model('gameSchema');


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


exports.setPacientGame = async (data) => {

  var id = uuidv1();

  var title;
  if (data.gameID === 1) {
    title = 'Jogo da maca'
  }
  else if (data.gameID === 2) {
    title = 'Jogo do robo'
  }
  else if (data.gameID === 3) {
    title = 'Jogo do Alecsander'
  }
  var __game = {
    pacient: data.identifier,
    title: title,
    gameID: data.gameID,
    config: data.config,
    medic: data.medic,
  };
  // var _game = new game(__game);

  // await _game.save();

  await pacient.findOneAndUpdate({
    identifier: data.identifier
  }, {
      $push: {
        games: {
          gameID: data.gameID,
          config: data.config
        }
      }
    }, {
      new: true,
      rawResult: true
    });
}

exports.removePacientGame = async (data) => {
  await pacient.update({ _id: data.pacient }, { "$pull": { "games": { "gameID": data.gameid } } }, { safe: true });
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

exports.createUser = async (data) => {
  var tempUser = new user(data);
  await tempUser.save();
}

exports.get = async (data) => {
  const res = await user.findById(data);
  return res;
}

exports.getPacients = async (data) => {
  const res = await pacient.find({ medic: data });
  return res;
}

exports.getPacient = async (data) => {
  const res = await pacient.find({ medic: data.id, identifier: data.pacient_ident });
  return res;
}

exports.delete = async (data) => {
  await user.findByIdAndRemove(data);
  await pacient.remove({ medic: data });
  await game.remove({ medic: data });
}

exports.removePacient = async (data) => {
  //tratar o erro caso o usuario n exista, exemplo no createPacient
  await user.findByIdAndUpdate(data.id, {
    $pull: { pacients: { 'identifier': data.identifier } }
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
}

exports.getGameId = async (data) => {
  const res = await game.findOne({ gameID: data.gameID, pacient: data.identifier });
  return res;
}

exports.getGames = async (data) => {
  const res = await game.find({ medic: data });
  return res;
}
exports.getPacientGames = async (data) => {
  const res = await game.find({ pacient: data.pacient});
  return res;
}