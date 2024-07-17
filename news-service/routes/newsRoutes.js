const express = require('express');
const { getNews, getSummarizedNews } = require('../controllers/newsController');
const router = express.Router();

router.get('/', getNews);
router.get('/summarized', getSummarizedNews);

module.exports = router;
