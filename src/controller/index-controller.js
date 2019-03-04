'use strict';

exports.get = (req, res, next) => {
    res.status(200).send({
        title: "API Games VR",
        version: "Versão: 2.0.2",
        author: 'Gabriel Kenzo Hirata Camargo'
    });
}