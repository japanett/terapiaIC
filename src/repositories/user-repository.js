'use strict';

const mongoose = require('mongoose');

const csvService = require('../services/csv-service');
const encService = require('../services/enc-service');
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


exports.recoverPassword = function (data, key) {
  return new Promise((resolve, reject) => {
    console.log(data);
    user.findOne({ email: data })
      .then((_user) => {
        let decPassword = encService.decrypt(_user.password, key);
        
        resolve(decPassword);
      })
      .catch(e => reject(e))
  })
}


exports.generateReport = function (data) {
  return new Promise((resolve, reject) => {
    let _user;
    user.findById(data)
      .then((__user) => {
        _user = __user;
        return pacient.find({ medic: _user._id })
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
      .catch(e => console.log(e));
  });
}

function _getGamesCSV(pacients) {
  return new Promise((resolve, reject) => {
    let promises = [];
    let _games = [];
    let _pacients = pacients;
    _pacients.forEach((pacient) => {
      let _pacient = pacient;
      promises.push(
        game.find({ pacient: _pacient.identifier })
          .then((games) => {
            games.forEach((game) => {
              let _filtered = _filterGameAndPacient(_pacient, game);
              _games.push(_filtered);
            });
          })
          .catch(e => reject(e))
      );
    });

    Promise.all(promises)
      .then(() => {
        resolve(_games);
      })
      .catch((e) => {
        reject(e);
      })
  });
}

var _filterGameAndPacient = function (pacient, game) {
  let _date = game.date;
  // let _dataSP = _date.setHours(_date.getHours() - 2);
  let _translateImserviseMode = game.imersiveMode ? 'Ativado' : 'Desativado';
  let _config = game.config
    .replace('2', 'Mão Direita')
    .replace('1', 'Mão Esquerda')
    .replace('3', 'Cruzado');

  let _filtered = {
    nome: pacient.name,
    sexo: pacient.sexo,
    idade: pacient.age,
    patologia: pacient.patologia,
    objetivo: pacient.objetivo,
    nome_jogo: game.title,
    observation: game.observation,
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
  return _filtered;
}

exports.setPacientGame = async (data) => {

  var title;
  if (data.gameID === 1) {
    title = 'Jogo da Mercearia'
  }
  else if (data.gameID === 2) {
    title = 'Invasão Espacial'
  }
  else if (data.gameID === 3) {
    title = 'Bola na Caixa'
  }
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
}

exports.removePacientGame = async (data) => {
  await pacient.update({ _id: data.pacient }, { "$pull": { "games": { "gameID": data.gameid } } }, { safe: true });
}

exports.updatePacientGame = async (data) => {
  await pacient.update({ _id: data.pacientId }, { "$pull": { "games": { "gameID": data.gameID } } }, { safe: true })
    .then(() => {
      var title;
      if (data.gameID === 1)
        title = 'Jogo da Mercearia';

      else if (data.gameID === 2)
        title = 'Invasão Espacial';

      else if (data.gameID === 3)
        title = 'Bola na Caixa';

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

exports.getPacientGames = async (data) => {
  const res = await game.find({ pacient: data.pacient });
  return res;
}

exports.getPacientGame = async (data) => {
  const res = await game.findOne({ _id: data.gameId, pacient: data.identifier });
  return res;
}


exports.deletePacientGameReport = function (gameId) {
  return new Promise((resolve, reject) => {
    game.findByIdAndRemove(gameId)
      .then((removedGame) => {
        return resolve(removedGame);
      })
      .catch((data) => {
        return reject(false);
      })
  })
}

exports.setGameReportObservation = async (data) => {
  await game.findByIdAndUpdate(data.id,
    {
      $set: {
        observation: data.observation
      }
    });
}