'use strict';

exports.findGameById = function (gameId) {
    switch (gameId) {
        case 1:
            return 'Jogo da Mercearia';
        case 2:
            return 'Invasão Espacial';
        case 3:
            return 'Bola na Caixa';
        case 4:
            return 'Bloquinho';
        case 5:
            return 'Pontes';
        case 6:
            return 'Jogo do Labirinto';
        case 7:
            return 'Fruit Jump';
        default:
            throw Error('GameID not specified!!!!');
    }
};
