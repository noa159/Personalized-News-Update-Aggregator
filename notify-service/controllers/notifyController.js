const baseController = require('../utils/baseController');
const {sendEmailHandler, sendTelegramHandler} = require('../handlers/notifyHandler');

const sendEmail = baseController(sendEmailHandler, {body: true});
const sendTelegram = baseController(sendTelegramHandler, {body: true});

module.exports = { sendEmail, sendTelegram };
