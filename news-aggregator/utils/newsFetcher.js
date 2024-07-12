


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

module.exports = fetchNews;
