const fs = require('fs');
const encService = require('../src/services/enc-service');
const logger = require('./winston');

global.KEY = 'gamesvr';
global.SALT_KEY = 'f5b99242-6504-4ca3-90f2-05e78e5761ef';
global.EMAIL_TMPL_CREATE_USER = 'Olá, <strong>name</strong><br>Você acabou de se cadastrar no <b>APP Games VR</b> !<br><br><strong>Usuário</strong>: login<br><strong>Senha</strong>: pwd';
global.EMAIL_TMPL_CREATE_PACIENT = '<h2>Olá, username</h2><br><h2>Você acabou de cadastrar um paciente !</h2><br>Seguem os dados do mesmo: <br><br><strong>Identificador</strong>: identifier<br><strong>Nome</strong>: namepaciente<br><strong>Sexo</strong>: sexopaciente<br><strong>Idade</strong>: idadepaciente<br><strong>Patologia</strong>: patologiapaciente<br><strong>Objetivo</strong>: objetivopaciente<br><br><h3><u style="color:blue;">Lembrando que o paciente irá utilizar o Identificador para se logar no jogo !</u></h3>';

const encPwd = '123G@bi123';
const isProd = true;
let prodData = {};

try {
    let encData = fs.readFileSync('./src/keys.enc', 'utf8');
    let decData = encService.decryptOld(encData, encPwd);
    prodData = JSON.parse(decData);
    if (isProd) {
        prodData.connectionString = 'mongodb://admin:admin123@ds223542.mlab.com:23542/terapiaic';
    } else {
        prodData.connectionString = 'mongodb://localhost:27017/gamesvr';
    }
    prodData.sendgridKey = "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";
    logger.info(JSON.stringify(prodData));
} catch (e) {
    logger.error('Missing encrypt password file, Is the crypto secret correct?');
}

module.exports = {
    connectionString: prodData.connectionString,
    sendgridKey: prodData.sendgridKey,
    containerConnectionString: prodData.containerConnectionString
};
