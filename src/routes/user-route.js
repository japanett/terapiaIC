'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controller/user-controller');

const {authorize}=require('../services/auth-service');

router.get('/report', authorize, controller.generateReport);

router.post('/create', controller.createUser);
router.get('/:email/recover-password', controller.recoverPassword);

router.delete('/delete', authorize, controller.delete);
router.put('/', authorize, controller.update);
router.patch('/change-password', authorize, controller.changePassword);
router.get('/', authorize, controller.get);

router.post('/pacients', authorize, controller.createPacient);
router.get('/pacients', authorize, controller.getPacients);
router.get('/pacients/:identifier', authorize, controller.getPacient);

router.get('/pacients/:id/games', authorize, controller.getPacientGames);
router.get('/:id/games/:gameId', authorize, controller.getPacientGame);
router.delete('/:id/games/:gameId', authorize, controller.deletePacientGameReport);
router.patch('/:id/games/:gameId', authorize, controller.setGameReportObservation);

router.put('/pacients/games/:identifier', authorize, controller.setPacientGame);
router.put('/:pacientid/games/:gameid', authorize, controller.deletePacientGame);
router.put('/games/:pacientId', authorize, controller.updatePacientGame);
router.put('/pacients/:identifier', authorize, controller.updatePacient);
router.delete('/pacients/:identifier', authorize, controller.removePacient);

module.exports = router;