const mongoose = require('mongoose');
require('dotenv').config();


// Define the mongoDB connection URL

const mongoURL = 'mongodb://localhost:27017/hotels' //
// const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection

const db = mongoose.connection;

// use define listeners for database connection

db.on('connected', () => {
    console.log("connected to mongodb server!");
})

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Export the database connection
module.exports = db;