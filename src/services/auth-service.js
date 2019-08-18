'use strict';

const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
    return jwt.sign(data, process.env.SALT_KEY, {expiresIn: '1d'});
};

exports.decodeToken = async (token) => {
    return jwt.verify(token, process.env.SALT_KEY);
};

exports.authorize = function (req, res, next) {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
        res.status(401).json({
            message: 'Access restricted'
        });
    } else {
        jwt.verify(token, process.env.SALT_KEY, function (error) {
            if (error) {
                res.status(401).json({
                    message: 'Invalid Token'
                });
            } else {
                next();
            }
        });
    }
};