const config = require('../config.js');
const sendGrid = require('@sendgrid/mail');
sendGrid.setApiKey(config.sendgridKey);

exports.send = async (to, subject, body) => {
    try {
        await sendGrid.send({
            to,
            from: '',
            subject,
            html: body
        });
    } catch(erro) {
        console.error(erro);

        if (erro.response) console.error(erro.response.body);
    }
};
