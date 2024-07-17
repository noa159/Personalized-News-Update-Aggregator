const express = require('express');
const { sendEmail, sendTelegram } = require('../controllers/notifyController');
const router = express.Router();

router.get('/email', sendEmail);
router.get('/telegram', sendTelegram);

module.exports = router;
