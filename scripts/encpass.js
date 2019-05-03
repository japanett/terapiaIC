#!/usr/bin/env node

const fs = require('fs');
const encService = require('../src/services/enc-service');

var _fileToEnc = fs.readFileSync('./src/keys.json', 'utf8');

var _password = process.argv.slice(2)[0] || '123G@bi123';

var encData = fs.readFileSync('./src/keys.enc', 'utf8');
console.log(_fileToEnc.toString());
// var decData = encService.decrypt(encData, _password);

if (!_password) {

  console.log('Informe o parametro senha para criptografia!');
  console.log('encpass.js [password]');

} else {
  var cryptedInfo = encService.encrypt(_fileToEnc, _password);
  fs.writeFile('./src/keys.enc', cryptedInfo, function (err) {
    if (err)
      return console.log(err);

    console.log('Arquivo criptografado com sucesso!');
  });
}