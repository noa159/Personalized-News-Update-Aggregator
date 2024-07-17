


const axios = require('axios');

const fetchNews = async (preferences) => {
    try {
        // Example using NewsData.io; replace with actual API and add your API key
        const response = await axios.get(`https://newsdata.io/api/1/latest?apikey=${process.env.NEWS_API_KEY}&category=${preferences.join(',')}`);
        console.log(`response data is ${response.data.results}`);
        return response.data.results; // Adjust depending on the structure of the API response
    } catch (error) {
        console.error('Error fetching news:', error.toJSON());
        return [];
    }
};

const summarizeNews = async (articles) => {
    try {
        // Mock implementation; replace with actual API calls
        return articles.map(article => ({
            title: article.title,
            summary: `Summarized version of ${article.title}`
        }));
    } catch (error) {
        console.error('Error summarizing news:', error);
        return articles; // Return original if summarization fails
    }
};

module.exports = {fetchNews, summarizeNews};
