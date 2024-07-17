require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const User = require('./models/User');
const { fetchNews, summarizeNews } = require('./utils/newsFetcher');




const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('News Aggregator API is running!');
});


app.post('/register', async (req, res) => {
    const { email, preferences } = req.body;
    try {
        const user = new User({ email, preferences });
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});


app.get('/news', async (req, res) => {
    const { userId } = req.query;
    try {
        const user = await User.findById(userId);
        const news = await fetchNews(user.preferences);
        res.json(news);
    } catch ( error) {
        res.status(400).send(error.message);
    }
});

app.patch('/updatePreferences', async (req, res) => {
    const { userId, preferences } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        user.preferences = preferences;
        await user.save();
        res.send('User preferences updated successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/summarizedNews', async (req, res) => {
    const { userId } = req.query;
    try {
        const user = await User.findById(userId);
        const news = await fetchNews(user.preferences);
        const summarizedNews = await summarizeNews(news);
        res.json(summarizedNews);
    } catch ( error) {
        res.status(400).send(error.message);
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connectDB();
