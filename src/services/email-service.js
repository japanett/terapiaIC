'use strict';

var config = require('../config');
// var sendgrid = require('sendgrid')(config.sendgridKey);
var sendgrid = require('@sendgrid/mail');//(config.sendgridKey);

sendgrid.setApiKey(config.sendgridKey);

exports.sendEMAIL = async (to, subject, body) => {
    const msg = {
        to: to.toString(),
        from: 'no.reply.app.terapia@gmail.com',
        subject: subject,
        text: 'APP Terapia',
        html: body
    };
    // console.log(msg);
    await sendgrid.send(msg);
}
