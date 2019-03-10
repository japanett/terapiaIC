#!/usr/bin/env node
'use strict';

const path = require('path');
const fs = require('fs');

const emailService = require('./email-service');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const filePath = path.normalize(__dirname + '/csv/report.csv');

exports.sendReport = function (user, csvJsonObjects) {
  return _generateCSV(user, csvJsonObjects);
};

function _generateCSV(user, csvJsonObjects) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(filePath))
      fs.unlinkSync(filePath);

    const csvWriter = createCsvWriter({
      path: filePath,
      header: [
        { id: 'nome', title: 'NOME' },
        { id: 'sexo', title: 'SEXO' },
        { id: 'idade', title: 'IDADE' },
        { id: 'patologia', title: 'PATOLOGIA' },
        { id: 'objetivo', title: 'OBJETIVO' },
        { id: 'mao_dominante', title: 'MAO DOMINANTE' },
        { id: 'gmfcs', title: 'NIVEL GMFCS' },
        { id: 'nome_jogo', title: 'NOME_JOGO' },
        { id: 'observation', title: 'OBSERVAÇÃO' },
        { id: 'config', title: 'CONFIGURACAO' },
        { id: 'imersiveMode', title: 'MODO IMERSIVO' },
        { id: 'data_jogo', title: 'DATA_JOGO' },
        { id: 'hora_jogo', title: 'HORA_JOGO' },
        { id: 'tempo', title: 'TEMPO_JOGO' },
        { id: 'score_mao_direita', title: 'SCORE_MAO_DIREITA' },
        { id: 'score_mao_esquerda', title: 'SCORE_MAO_ESQUERDA' },
        { id: 'score_mao_cruzada', title: 'SCORE_MAO_CRUZADA' },
        { id: 'erro_mao_direita', title: 'ERRO_MAO_DIREITA' },
        { id: 'erro_mao_esquerda', title: 'ERRO_MAO_ESQUERDA' },
        { id: 'erro_mao_cruzada', title: 'ERRO_MAO_CRUZADA' }
      ],
      fieldDelimiter: ';'
    });

    var _records = [];
    var _userEmail = user.email;


    csvJsonObjects.forEach(obj => {
      let _line = {};

      _line.nome = obj.nome;
      _line.sexo = obj.sexo;
      _line.idade = obj.idade;
      _line.patologia = obj.patologia;
      _line.objetivo = obj.objetivo;
      _line.mao_dominante = obj.mao_dominante;
      _line.gmfcs = obj.gmfcs;
      _line.nome_jogo = obj.nome_jogo;
      _line.observation = obj.observation;
      _line.config = obj.config;
      _line.imersiveMode = obj.imersiveMode;
      _line.data_jogo = obj.data_jogo;
      _line.hora_jogo = obj.hora_jogo;
      _line.tempo = obj.tempo;
      _line.score_mao_direita = obj.score_mao_direita;
      _line.score_mao_esquerda = obj.score_mao_esquerda;
      _line.score_mao_cruzada = obj.score_mao_cruzada;
      _line.erro_mao_direita = obj.erro_mao_direita;
      _line.erro_mao_esquerda = obj.erro_mao_esquerda;
      _line.erro_mao_cruzada = obj.erro_mao_cruzada;

      _records.push(_line);
    });
    csvWriter.writeRecords(_records)
      .then(() => {
        var data = fs.readFileSync(filePath, 'utf8')
        console.log('1');
        emailService.sendCSV(_userEmail, data);
        resolve('OK');
      })
      .catch((e) => {
        reject();
      })
  })

}
