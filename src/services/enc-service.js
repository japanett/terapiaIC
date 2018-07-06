'use strict';

var algorithm = 'aes-256-ctr';

var crypto = require('crypto');

exports.encrypt = function (text, password){
  var cipher = crypto.createCipher(algorithm, password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
};

exports.decrypt = function (text, password){
  var decipher = crypto.createDecipher(algorithm, password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
};
