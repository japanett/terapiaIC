const fs = require('fs');
const encService = require('../src/services/enc-service');

global.SALT_KEY = 'f5b99242-6504-4ca3-90f2-05e78e5761ef';
global.EMAIL_TMPL_CREATE_USER = 'Olá, <strong>name</strong><br>Você acabou de se cadastrar no <b>APP Games VR</b> !<br><br><strong>Usuário</strong>: login<br><strong>Senha</strong>: pwd';
global.EMAIL_TMPL_CREATE_PACIENT = '<h2>Olá, username</h2><br><h2>Você acabou de cadastrar um paciente !</h2><br>Seguem os dados do mesmo: <br><br><strong>Identificador</strong>: identifier<br><strong>Nome</strong>: namepaciente<br><strong>Sexo</strong>: sexopaciente<br><strong>Idade</strong>: idadepaciente<br><strong>Patologia</strong>: patologiapaciente<br><strong>Objetivo</strong>: objetivopaciente<br><br><h3><u style="color:blue;">Lembrando que o paciente irá utilizar o Identificador para se logar no jogo !</u></h3>';

var encPwd = '123G@bi123';

try {
  var encData = fs.readFileSync('./src/keys.enc', 'utf8');
  var decData = encService.decrypt(encData, encPwd);
  // var decData = fs.readFileSync('./src/keys.json', 'utf8');

  // var prodData = {
  //   connectionString: "mongodb://admin:admin123@ds223542.mlab.com:23542/terapiaic",
  //   sendgridKey: "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",
  //   containerConnectionString: "TBD"
  // };
  var prodData = JSON.parse(decData);
  console.log(prodData)
} catch (e) {
  console.error('Missing encrypt password file, Is the crypto secret correct?');
}

module.exports = {
  connectionString: prodData.connectionString,
  sendgridKey: prodData.sendgridKey,
  containerConnectionString: prodData.containerConnectionString
}