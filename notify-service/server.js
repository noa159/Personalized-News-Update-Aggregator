require('dotenv').config();
const express = require('express');
const newsRoutes = require('./routes/notifyRoutes');

const app = express();
app.use(express.json());
app.use('/api/notify', newsRoutes);
//


const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Notify Service running on port ${PORT}`));


