'use strict';

const mongoose = require('mongoose');

exports.get = (req, res, next) => {
    res.status(200).send({
        title: "API Fisioterapeuta",
        version: "Versão: 1.2.0",
        author: 'Gabriel Kenzo Hirata Camargo'
    });
}