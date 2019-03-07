'use strict';
const mongoose = require('mongoose');
const pacient = mongoose.model('pacientSchema');
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

exports.postGame = async (data) => {
  let title;

  switch (data.gameID) {
    case 1:
      title = 'Jogo da Mercearia';
      break;

    case 2:
      title = 'Invasão Espacial';
      break;

    case 3:
      title = 'Bola na Caixa';
      break;

    case 4:
      title = 'Bloquinho';
      break;

    default:
      throw Error('GameID not specified!!!!');
      break;
  };
  
  var __game = {
    pacient: data.identifier,
    title: title,
    gameID: data.gameID,
    config: data.config,
    date: data.date,
    imersiveMode: data.imersiveMode,
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
  };
  var _game = new game(__game);

  await _game.save();
}
