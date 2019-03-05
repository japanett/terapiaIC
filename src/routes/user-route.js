'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controller/user-controller');
const authService = require('../services/auth-service');

router.get('/report', authService.authorize, controller.generateReport);

router.post('/create', controller.createUser);
router.get('/:email/recover-password', controller.recoverPassword);

router.delete('/delete', authService.authorize, controller.delete);
router.put('/', authService.authorize, controller.update);
router.patch('/change-password', authService.authorize, controller.changePassword);
router.get('/', authService.authorize, controller.get);

router.post('/pacients', authService.authorize, controller.createPacient);
router.get('/pacients', authService.authorize, controller.getPacients);
router.get('/pacients/:identifier', authService.authorize, controller.getPacient);

router.get('/pacients/:id/games', authService.authorize, controller.getPacientGames);
router.get('/:id/games/:gameId', authService.authorize, controller.getPacientGame);
router.delete('/:id/games/:gameId', authService.authorize, controller.deletePacientGameReport);
router.patch('/:id/games/:gameId', authService.authorize, controller.setGameReportObservation);

router.put('/pacients/games/:identifier', authService.authorize, controller.setPacientGame);
router.put('/:pacientid/games/:gameid', authService.authorize, controller.deletePacientGame);
router.put('/games/:pacientId', authService.authorize, controller.updatePacientGame);
router.put('/pacients/:identifier', authService.authorize, controller.updatePacient);
router.delete('/pacients/:identifier', authService.authorize, controller.removePacient);

module.exports = router;