'use strict';

const repository = require('../repositories/game-repository');
const logger = require('../winston');

exports.findByGameId = async (req, res) => {
    try {
        logger.info("Find By GameID \n Params = "+JSON.stringify(req.params));
        let game = await repository.findByGameId(req.params.gameid);
        res.status(200).send({data: game, success: true});
    } catch (e) {
        logger.error(e);
        logger.error(e.stack);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
};

exports.listAllGames = async (req, res) => {
    try {
        logger.info("List All Games");
        let games = await repository.listAllGames();
        res.status(200).send({data: games, success: true});
    } catch (e) {
        logger.error(e);
        logger.error(e.stack);
        res.status(500).send({
            message: 'Failed process request',
            success: false
        });
    }
};
