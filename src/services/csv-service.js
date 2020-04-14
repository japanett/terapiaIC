#!/usr/bin/env node
'use strict';

const path = require('path');
const fs = require('fs');
const emailService = require('./email-service');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const logger = require('../winston');

const filePath = path.normalize(__dirname + '/csv/report.csv');

exports.sendReport = function (user, csvJsonObjects) {
    return _generateCSV(user, csvJsonObjects);
};

let buildCSVObject = (obj) => {
    return {
        nome : obj.nome,
        sexo : obj.sexo,
        idade : obj.idade,
        patologia : obj.patologia,
        objetivo : obj.objetivo,
        mao_dominante : obj.mao_dominante,
        gmfcs : obj.gmfcs,
        nome_jogo : obj.nome_jogo,
        observation : obj.observation,
        config : obj.config,
        imersiveMode : obj.imersiveMode,
        data_jogo : obj.data_jogo,
        hora_jogo : obj.hora_jogo,
        tempo : obj.tempo,
        score_mao_direita : obj.score_mao_direita,
        score_mao_esquerda : obj.score_mao_esquerda,
        score_mao_cruzada : obj.score_mao_cruzada,
        erro_mao_direita : obj.erro_mao_direita,
        erro_mao_esquerda : obj.erro_mao_esquerda,
        erro_mao_cruzada : obj.erro_mao_cruzada
    }
};

function _generateCSV(user, csvJsonObjects) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        const csvWriter = createCsvWriter({
            path: filePath,
            header: [
                {id: 'nome', title: 'NOME'},
                {id: 'sexo', title: 'SEXO'},
                {id: 'idade', title: 'IDADE'},
                {id: 'patologia', title: 'PATOLOGIA'},
                {id: 'objetivo', title: 'OBJETIVO'},
                {id: 'mao_dominante', title: 'MAO DOMINANTE'},
                {id: 'gmfcs', title: 'NIVEL GMFCS'},
                {id: 'nome_jogo', title: 'NOME_JOGO'},
                {id: 'observation', title: 'OBSERVAÇÃO'},
                {id: 'config', title: 'CONFIGURACAO'},
                {id: 'imersiveMode', title: 'MODO IMERSIVO'},
                {id: 'data_jogo', title: 'DATA_JOGO'},
                {id: 'hora_jogo', title: 'HORA_JOGO'},
                {id: 'tempo', title: 'TEMPO_JOGO'},
                {id: 'score_mao_direita', title: 'SCORE_MAO_DIREITA'},
                {id: 'score_mao_esquerda', title: 'SCORE_MAO_ESQUERDA'},
                {id: 'score_mao_cruzada', title: 'SCORE_MAO_ALTERNADA'},
                {id: 'erro_mao_direita', title: 'ERRO_MAO_DIREITA'},
                {id: 'erro_mao_esquerda', title: 'ERRO_MAO_ESQUERDA'},
                {id: 'erro_mao_cruzada', title: 'ERRO_MAO_ALTERNADA'}
            ],
            fieldDelimiter: ';'
        });
        let _records = [];
        let _userEmail = user.email;
        csvJsonObjects.forEach(obj => {
            _records.push(buildCSVObject(obj));
        });
        csvWriter.writeRecords(_records)
            .then(() => {
                let data = fs.readFileSync(filePath, process.env.UNICODE);
                emailService.sendCSV(_userEmail, data);
                resolve('OK');
            })
            .catch((e) => {
                logger.error(e);
                logger.error(e.stack);
                reject();
            });


    });


}
