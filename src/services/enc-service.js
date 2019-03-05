'use strict';

const algorithm = 'aes-128-cbc';
const algorithmOld = 'aes-256-ctr';

const crypto = require('crypto');

exports.encrypt = function (text, password){
  var cipher = crypto.createCipher(algorithm, password);
  var crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
};

exports.decrypt = function (text, password){
  var decipher = crypto.createDecipher(algorithm, password);
  var dec = decipher.update(text,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
};

exports.decryptOld = function (text, password){
  var decipher = crypto.createDecipher(algorithmOld, password);
  var dec = decipher.update(text,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
};
