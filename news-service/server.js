require('dotenv').config();
const express = require('express');
const newsRoutes = require('./routes/newsRoutes');

const app = express();
app.use(express.json());
app.use('/api/news', newsRoutes);
// todo: use jwt to validate news??


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`News Service running on port ${PORT}`));


