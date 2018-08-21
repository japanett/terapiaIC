'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controller/user-controller');
const authService = require('../services/auth-service');

router.post('/create', controller.createUser);
router.delete('/delete', authService.authorize, controller.delete);
router.put('/', authService.authorize, controller.update);
router.get('/', authService.authorize, controller.get);

router.put('/pacients', authService.authorize, controller.createPacient);
router.get('/pacients', authService.authorize, controller.getPacients); //list of pacients
router.get('/pacients/:identifier', authService.authorize, controller.getPacient);//single pacient
router.get('/games', authService.authorize, controller.getGames);
router.get('/games/:id', authService.authorize, controller.getPacientGames);
router.put('/pacients/games/:identifier', authService.authorize, controller.setPacientGame);
router.put('/pacients/games/:pacientid/:gameid', authService.authorize, controller.deletePacientGame);
router.put('/pacients/:identifier', authService.authorize, controller.updatePacient);
router.delete('/pacients/:identifier', authService.authorize, controller.removePacient);

module.exports = router;