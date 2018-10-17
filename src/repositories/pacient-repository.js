'use strict';
const mongoose = require('mongoose');
const pacient = mongoose.model('pacientSchema');
const user = mongoose.model('userSchema');
const game = mongoose.model('gameSchema');
const uuidv1 = require('uuid/v1');

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
  const res = await pacient.findOne({
    identifier: data
  });
  return res;
};

exports.postGame = async (data) => {
  var title;
  if (data.gameID == 1) {
    title = 'Jogo da maca';
  }
  else if (data.gameID == 2) {
    title = 'Jogo do robo';
  }
  else if (data.gameID == 3) {
    title = 'Jogo do Alecsander';
  };
  var __game = {
    pacient: data.identifier,
    title: title,
    gameID: data.gameID,
    config: data.config,
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
  };
  var _game = new game(__game);

  await _game.save();
}
