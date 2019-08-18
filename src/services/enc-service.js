'use strict';

const algorithm = 'aes-128-cbc';
const algorithmOld = 'aes-256-ctr';

const crypto = require('crypto');

exports.encrypt = function (text, password) {
    let cipher = crypto.createCipher(algorithm, password);
    let crypted = cipher.update(text, process.env.UNICODE, 'hex');
    crypted += cipher.final('hex');
    return crypted;
};

exports.decrypt = function (text, password) {
    let decipher = crypto.createDecipher(algorithm, password);
    let dec = decipher.update(text, 'hex', process.env.UNICODE);
    dec += decipher.final(process.env.UNICODE);
    return dec;
};

exports.decryptOld = function (text, password) {
    let decipher = crypto.createDecipher(algorithmOld, password);
    let dec = decipher.update(text, 'hex', process.env.UNICODE);
    dec += decipher.final(process.env.UNICODE);
    return dec;
};
