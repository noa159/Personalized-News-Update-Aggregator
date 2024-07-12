require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const User = require('./models/User');



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



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connectDB();
