'use strict';

const sendgrid = require('@sendgrid/mail');
const logger = require('../winston');

sendgrid.setApiKey(process.env.SENDGRID_KEY);

exports.sendEMAIL = async (to, subject, body) => {
    const msg = {
        to: to.toString(),
        from: 'no.reply.app.terapia@gmail.com',
        subject: subject,
        text: 'APP Games VR',
        html: body
    };
    await sendgrid.send(msg);
};

exports.sendCSV = async (to, data) => {
    const msg = {
        to: to.toString(),
        from: 'no.reply.app.terapia@gmail.com',
        subject: 'Relatório das Sessões dos jogos',
        text: 'APP Games VR',
        html: 'Olá, segue em anexo o Relatório do APP Games VR',
        attachments: [
            {
                content: new Buffer(data).toString('base64'),
                filename: 'APP_Games_report.csv',
                type: 'plain/text',
                disposition: 'attachment'
            },
        ],
    };

    await sendgrid.send(msg, function (err) {
        if (err) {
            logger.error(err);
            logger.error(err.stack);
        }
    });
};
