
'use strict';

const mongoose = require('mongoose');
const pacient = mongoose.model('pacientSchema');
const game = mongoose.model('gameSchema');
const gameRepository = require('./game-repository');
const {findGameById} = require("../util/game-util");

exports.authenticate = async (data) => {
    return pacient.findOne({
        identifier: data
    });
};

exports.get = async (data) => {
    return pacient.findById(data);
};

exports.postGame = async (data) => {
    let title = findGameById(data.gameID);
    let __game = {
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
    let _game = new game(__game);
    await _game.save();
};

exports.relatorios = async () => {
    let linhas = [];
    let pacientes = [];
    await pacient.find({}).then(function (pacs) {
        pacientes = pacs;
    });
    for (let paciente of pacientes) {
        let linha = {
            nome_paciente: '',
            bloquinho_imersivo: 0,
            bloquinho_nao_Imersivo: 0,
            maca_imersivo: 0,
            maca_nao_imersivo: 0,
            invasao_imersivo: 0,
            invasao_nao_imersivo: 0
        };
        let jogoBloquinho = [];
        await gameRepository.filtrarPor('Bloquinho', paciente.identifier).then(function (jogosBLoquinhos) {
            jogoBloquinho = jogosBLoquinhos;
        });

        linha.nome_paciente = paciente.name;

        jogoBloquinho.forEach((bloq) => {
            if (bloq.imersiveMode) {
                linha.bloquinho_imersivo = bloq.score.cruzada + bloq.score.direita + bloq.score.esquerda;
            } else {
                linha.bloquinho_nao_Imersivo = bloq.score.cruzada + bloq.score.direita + bloq.score.esquerda;
            }
        });

        let jogoApple = [];
        await gameRepository.filtrarPor('Jogo da Mercearia', paciente.identifier).then((apples) => jogoApple = apples);
        jogoApple.forEach((apple) => {
            if (apple.imersiveMode) {
                linha.maca_imersivo = apple.score.cruzada + apple.score.direita + apple.score.esquerda;
            } else {
                linha.maca_nao_imersivo = apple.score.cruzada + apple.score.direita + apple.score.esquerda;
            }
        });


        let jogoInvasion = [];
        await gameRepository.filtrarPor('Invasão Espacial', paciente.identifier).then((invs) => jogoInvasion = invs);
        jogoInvasion.forEach((inv) => {
            if (inv.imersiveMode) {
                linha.invasao_imersivo = inv.score.cruzada + inv.score.direita + inv.score.esquerda;
            } else {
                linha.invasao_nao_imersivo = inv.score.cruzada + inv.score.direita + inv.score.esquerda;
            }
        });

        linhas.push(linha);

    }
    return linhas;
};

