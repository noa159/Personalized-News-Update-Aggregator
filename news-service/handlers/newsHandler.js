const axios = require('axios');

const fetchNews = async (params) => {
    try {
        const {preferences, country} = params;
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

        // todo: This is a mock implementation; replace with actual summary logic
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
