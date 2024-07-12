


const axios = require('axios');

const fetchNews = async (preferences) => {
    try {
        // Example using NewsData.io; replace with actual API and add your API key
        const response = await axios.get(`https://newsdata.io/api/1/news?apikey=pub_48471d08a5640c5dfc3c896b16dd21e2e27fb&category=${preferences.join(',')}`);
        return response.data.results; // Adjust depending on the structure of the API response
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
};

module.exports = fetchNews;
