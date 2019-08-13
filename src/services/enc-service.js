'use strict';

const algorithm = 'aes-128-cbc';
const algorithmOld = 'aes-256-ctr';

const crypto = require('crypto');

exports.encrypt = function (text, password) {
    let cipher = crypto.createCipher(algorithm, password);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
};

exports.decrypt = function (text, password) {
    let decipher = crypto.createDecipher(algorithm, password);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};

exports.decryptOld = function (text, password) {
    let decipher = crypto.createDecipher(algorithmOld, password);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};
