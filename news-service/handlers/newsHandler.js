const axios = require('axios');
const jwt = require('jsonwebtoken');

const fetchNews = async (params) => {
    try {
        const {country, token} = params;
        if (!token) {
            throw new Error({name: 'LogicError', message: 'Unauthorized', statusCode: 401});
        }

        const decoded = jwt.verify(token, 'your_jwt_secret');
        const preferencesResponse = await axios.get(`${STATE_URL}/preferences-${decoded.id}`);
        const preferences = preferencesResponse.data.value;

        const apiKey = process.env.NEWS_API_KEY;
        const response = await axios.get(`https://newsdata.io/api/1/latest?apikey=${apiKey}&category=${preferences}&country=${country}`);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching news:', error);
        throw new Error('Failed to fetch news');
    }
};

const summarizeNews = async (params) => {
    try {
        const articles = await fetchNews(params);

        return articles.map(article => ({
            title: article.title,
            summary: article.description,
            link: article.link
        }));
    } catch (error) {
        console.error('Error summarizing news:', error);
        throw new Error('Failed to summarize news');
    }
};

module.exports = { fetchNews, summarizeNews };
