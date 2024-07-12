require('dotenv').config();
const express = require('express');
const connectDB = require('./db');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('News Aggregator API is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connectDB();
