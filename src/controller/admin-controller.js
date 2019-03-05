'use strict';

const encService = require('../services/enc-service');
const repository = require('../repositories/admin-repository');

exports.resetAllPasswords = async (req, res) => {
  try {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await authService.decodeToken(token);

    const recoveredPassword = await repository.resetAllPasswords(data, global.KEY);

    res.status(200).send({ data: recoveredPassword, success: true });
  } catch (e) {
    res.status(500).send({
      message: 'Failed process request',
      success: false
    });
  }
}

exports.resetUserPassword = async (req, res) => {
  try {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await authService.decodeToken(token);

    const recoveredPassword = await repository.resetUserPassword(data, global.KEY);

    res.status(200).send({ data: recoveredPassword, success: true });
  } catch (e) {
    res.status(500).send({
      message: 'Failed process request',
      success: false
    });
  }
}