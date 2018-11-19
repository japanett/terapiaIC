'use strict';

const mongoose = require('mongoose');

exports.get = (req, res, next) => {
    res.status(200).send({
        title: "API Lab Games VR",
        version: "Versão: 2.0.0",
        author: 'Gabriel Kenzo Hirata Camargo'
    });
}