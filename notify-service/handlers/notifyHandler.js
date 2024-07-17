const nodeMailer = require('nodemailer');
const axios = require('axios');
let transporter;

const EMAIL_SERVICE = 'gmail';
const TELEGRAM_BASE_URL = 'https://api.telegram.org/bot';
const TELEGRAM_URL_PREFIX = '/sendMessage';
const EMAIL_SUBJECT = 'Daily news update'

const initTransporter = () => {
    transporter = nodeMailer.createTransport({
        service: EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASS
        }
    });
};

const sendEmailHandler = async (email, newsContent) => {
    if (!transporter) {
        initTransporter();
    }
    const mailOptions = {
        from: process.env.EMAIL_USER_NAME,
        to: email,
        subject: EMAIL_SUBJECT,
        html: `<h1>News update</h1><p>${newsContent}</p>`
    };
    await transporter.sendMail(mailOptions);
};

const sendTelegramHandler = async (chat_id, text) => {
    const url = `${TELEGRAM_BASE_URL}${process.env.TELEGRAM_BOT_TOKEN}${TELEGRAM_URL_PREFIX}`;
    await axios.post(url, { chat_id, text });
};

module.exports = {
    sendEmailHandler,
    sendTelegramHandler
};
