const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
        });
        console.log('MongoDB connected...');
    } catch (error) {
        console.error('MongoDB connection error message:', error.message);
        console.error('MongoDB connection error stack:', error.stack);

        process.exit(1);
    }
};

module.exports = connectDB;
