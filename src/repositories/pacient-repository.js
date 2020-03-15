
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
    await pacient.find({'identifier': {$in:["b1ce21","9dd230","9c38d4","ba9a0f","c97fe2","be51b6"]}}).then(function (pacs) {
        pacientes = pacs;
    });

    for (let paciente of pacientes) {

        let rel = {
            jogo:"",
            dados:[{}]
        };

        let jogoBloquinho = [];

        await gameRepository.filtrarPor('Bloquinho', paciente.identifier).then(function (jogosBLoquinhos) {
            jogoBloquinho = jogosBLoquinhos;
        });

        if (jogoBloquinho != null && jogoBloquinho.length >0) {

            let bloquinhoImersivo = jogoBloquinho.filter((jogo) => {return jogo.imersiveMode});
            rel.jogo = "Bloquinho Imersivo";
            let dado = {};
            dado.paciente = paciente.name;
            bloquinhoImersivo.forEach((bloqImer) => {
                dado[bloqImer.date] = bloqImer.score.esquerda + bloqImer.score.direita + bloqImer.score.cruzada;
                rel.dados.push(dado);
            });
            linhas.push(rel);

            let bloquinhoNaoImersivo = jogoBloquinho.filter((jogo) => {return !jogo.imersiveMode});
            rel.jogo = "Bloquinho Não Imersivo";
            dado = {};
            dado.paciente = paciente.name;
            bloquinhoNaoImersivo.forEach((bloqNImer) => {
                dado[bloqNImer.date] = bloqNImer.score.esquerda + bloqNImer.score.direita + bloqNImer.score.cruzada;
                rel.dados.push(dado);
            });
            linhas.push(rel);
        }


        let jogoApple = [];
        await gameRepository.filtrarPor('Jogo da Mercearia', paciente.identifier).then((apples) => jogoApple = apples);

        if (jogoApple != null && jogoApple.length >0) {

            let macaImersivo = jogoApple.filter((apple) => {
                return apple.imersiveMode
            });
            rel.jogo = "Maça Imersivo";
            let dado = {};
            dado.paciente = paciente.name;
            macaImersivo.forEach((macaImer) => {
                dado[macaImer.date] = macaImer.score.esquerda + macaImer.score.direita + macaImer.score.cruzada;
                rel.dados.push(dado);
            });
            linhas.push(rel);

            let macaNaoImersivo = jogoApple.filter((apple) => {
                return !apple.imersiveMode
            });
            rel.jogo = "Maça Não Imersivo";
            dado = {};
            dado.paciente = paciente.name;
            macaNaoImersivo.forEach((macaNImer) => {
                dado[macaNImer.date] = macaNImer.score.esquerda + macaNImer.score.direita + macaNImer.score.cruzada;
                rel.dados.push(dado);
            });
            linhas.push(rel);
        }

        let jogoInvasion = [];
        await gameRepository.filtrarPor('Invasão Espacial', paciente.identifier).then((invs) => jogoInvasion = invs);

        if (jogoInvasion != null && jogoInvasion.length >0) {

            let invasaoImersivo = jogoInvasion.filter((nave) => {
                return nave.imersiveMode
            });
            rel.jogo = "Nave Imersivo";
            let dado = {};
            dado.paciente = paciente.name;
            invasaoImersivo.forEach((naveImer) => {
                dado[naveImer.date] = naveImer.score.esquerda + naveImer.score.direita + naveImer.score.cruzada;
                rel.dados.push(dado);
            });
            linhas.push(rel);

            let invasaoNaoImersivo = jogoInvasion.filter((nave) => {
                return !nave.imersiveMode
            });
            rel.jogo = "Nave Não Imersivo";
            dado = {};
            dado.paciente = paciente.name;
            invasaoNaoImersivo.forEach((naveNImer) => {
                dado[naveNImer.date] = naveNImer.score.esquerda + naveNImer.score.direita + naveNImer.score.cruzada;
                rel.dados.push(dado);
            });
            linhas.push(rel);
        }


    }
    return linhas;
};

