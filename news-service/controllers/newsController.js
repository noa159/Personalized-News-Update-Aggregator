const  baseController  = require('../utils/baseController');
const { fetchNews, summarizeNews } = require('../handlers/newsHandler');



const getNews = baseController(fetchNews, { query: true });

const getSummarizedNews = baseController(summarizeNews, { query: true });

module.exports = { getNews, getSummarizedNews };
